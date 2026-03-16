'use client'

import { useEffect, useState } from 'react'
import type { PhysicalStore } from '@/data/storeLocations'

// Leaflet CSS is loaded via <link> in the page head (avoids SSR issues)
// We dynamically import Leaflet + react-leaflet to avoid window reference on server

interface StoreMapProps {
  stores: PhysicalStore[]
  selectedStoreId?: string | null
  onStoreSelect?: (id: string) => void
}

export default function StoreMap({ stores, onStoreSelect }: StoreMapProps) {
  const [MapComponents, setMapComponents] = useState<{
    MapContainer: typeof import('react-leaflet')['MapContainer']
    TileLayer: typeof import('react-leaflet')['TileLayer']
    Marker: typeof import('react-leaflet')['Marker']
    Popup: typeof import('react-leaflet')['Popup']
    L: typeof import('leaflet')
  } | null>(null)

  useEffect(() => {
    // Dynamic import to avoid SSR window reference
    Promise.all([
      import('react-leaflet'),
      import('leaflet'),
    ]).then(([rl, L]) => {
      // Fix default marker icons (Leaflet + webpack issue)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })
      setMapComponents({
        MapContainer: rl.MapContainer,
        TileLayer: rl.TileLayer,
        Marker: rl.Marker,
        Popup: rl.Popup,
        L: L.default || L,
      })
    })
  }, [])

  if (!MapComponents) {
    return (
      <div className="w-full h-[500px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-500">
        Loading map…
      </div>
    )
  }

  const { MapContainer, TileLayer, Marker, Popup, L } = MapComponents

  // Create custom icons
  const defaultIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  })

  const comingSoonIcon = new L.Icon({
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    iconSize: [20, 33],
    iconAnchor: [10, 33],
    popupAnchor: [1, -28],
    shadowSize: [33, 33],
    className: 'opacity-60',
  })

  // Center of continental US
  const center: [number, number] = [39.5, -98.5]

  return (
    <MapContainer
      center={center}
      zoom={4}
      scrollWheelZoom={true}
      className="w-full h-[500px] rounded-xl z-0"
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {stores.map((store) => (
        <Marker
          key={store.id}
          position={[store.lat, store.lng]}
          icon={store.status === 'coming-soon' ? comingSoonIcon : defaultIcon}
          eventHandlers={{
            click: () => onStoreSelect?.(store.id),
          }}
        >
          <Popup>
            <div className="min-w-[220px]">
              <h3 className="font-bold text-sm text-gray-900 mb-1">{store.name}</h3>
              <p className="text-xs text-gray-600 mb-1">{store.address}</p>
              <p className="text-xs text-gray-500 mb-2">{store.hours}</p>
              {store.status === 'coming-soon' && (
                <span className="inline-block text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded mb-2">
                  Coming Soon
                </span>
              )}
              <div className="flex gap-2 flex-wrap">
                {store.storePageSlug && (
                  <a
                    href={`/stores/${store.storePageSlug}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Read Review →
                  </a>
                )}
                {store.shopUrl && (
                  <a
                    href={store.affiliateUrl || store.shopUrl}
                    target="_blank"
                    rel={store.affiliateUrl ? 'sponsored noopener' : 'noopener'}
                    className="text-xs text-amber-700 hover:underline font-medium"
                  >
                    Shop Online →
                  </a>
                )}
                {store.website && (
                  <a
                    href={store.website}
                    target="_blank"
                    rel="noopener"
                    className="text-xs text-gray-500 hover:underline"
                  >
                    Website →
                  </a>
                )}
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
