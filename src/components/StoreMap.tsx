'use client'

import { useEffect, useRef, useCallback } from 'react'
import type { PhysicalStore } from '@/data/storeLocations'

interface StoreMapProps {
  stores: PhysicalStore[]
  selectedStoreId?: string | null
  onStoreSelect?: (id: string) => void
}

export default function StoreMap({ stores, onStoreSelect }: StoreMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMapRef = useRef<any>(null)

  const buildPopup = useCallback((store: PhysicalStore) => {
    const reviewLink = store.storePageSlug
      ? `<a href="/stores/${store.storePageSlug}" style="color:#2563eb;font-size:11px;text-decoration:underline;">Read Review →</a>`
      : ''
    const shopLink = store.shopUrl
      ? `<a href="${store.affiliateUrl || store.shopUrl}" target="_blank" rel="${store.affiliateUrl ? 'sponsored noopener' : 'noopener'}" style="color:#b45309;font-size:11px;font-weight:600;text-decoration:underline;">Shop Online →</a>`
      : ''
    const webLink = store.website
      ? `<a href="${store.website}" target="_blank" rel="noopener" style="color:#6b7280;font-size:11px;text-decoration:underline;">Website →</a>`
      : ''
    const comingSoon = store.status === 'coming-soon'
      ? '<span style="display:inline-block;font-size:10px;background:#fef9c3;color:#854d0e;padding:1px 6px;border-radius:4px;margin-bottom:4px;">Coming Soon</span><br/>'
      : ''

    return `
      <div style="min-width:200px;font-family:system-ui,sans-serif;">
        <strong style="font-size:13px;color:#111;">${store.name}</strong><br/>
        <span style="font-size:11px;color:#6b7280;">${store.address}</span><br/>
        <span style="font-size:11px;color:#9ca3af;">${store.hours}</span><br/>
        ${comingSoon}
        <div style="margin-top:6px;display:flex;gap:8px;flex-wrap:wrap;">
          ${reviewLink}${shopLink}${webLink}
        </div>
      </div>
    `
  }, [])

  useEffect(() => {
    if (!mapRef.current || leafletMapRef.current) return

    // Dynamic import of leaflet (vanilla, no react-leaflet needed)
    import('leaflet').then((L) => {
      const leaflet = L.default || L

      // Fix default marker icons
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (leaflet.Icon.Default.prototype as any)._getIconUrl
      leaflet.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      })

      // Create map centered on continental US
      const map = leaflet.map(mapRef.current!, {
        scrollWheelZoom: true,
      }).setView([39.5, -98.5], 4)

      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map)

      // Add markers
      stores.forEach((store) => {
        const marker = leaflet.marker([store.lat, store.lng], {
          opacity: store.status === 'coming-soon' ? 0.6 : 1,
        }).addTo(map)

        marker.bindPopup(buildPopup(store))

        marker.on('click', () => {
          onStoreSelect?.(store.id)
        })
      })

      leafletMapRef.current = map
    })

    return () => {
      if (leafletMapRef.current) {
        leafletMapRef.current.remove()
        leafletMapRef.current = null
      }
    }
  }, [stores, onStoreSelect, buildPopup])

  return (
    <div
      ref={mapRef}
      className="w-full rounded-xl z-0"
      style={{ height: '500px', width: '100%' }}
    />
  )
}
