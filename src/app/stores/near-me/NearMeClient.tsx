'use client'

import { useState, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { MapPin, Clock, ExternalLink, ShoppingBag, Star, Filter } from 'lucide-react'
import { physicalStores, getStoreStates } from '@/data/storeLocations'
import type { PhysicalStore } from '@/data/storeLocations'

// Dynamic import StoreMap to avoid SSR issues with Leaflet
const StoreMap = dynamic(() => import('@/components/StoreMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[500px] bg-gray-100 rounded-xl flex items-center justify-center text-gray-500 animate-pulse">
      Loading map…
    </div>
  ),
})

const stateNames: Record<string, string> = {
  NY: 'New York',
  CA: 'California',
  FL: 'Florida',
  MA: 'Massachusetts',
  PA: 'Pennsylvania',
  TX: 'Texas',
}

export default function NearMeClient() {
  const [selectedState, setSelectedState] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedStoreId, setSelectedStoreId] = useState<string | null>(null)
  const states = getStoreStates()

  const filteredStores = useMemo(() => {
    return physicalStores.filter((s) => {
      if (selectedState !== 'all' && s.state !== selectedState) return false
      if (selectedType !== 'all' && s.type !== selectedType) return false
      return true
    })
  }, [selectedState, selectedType])

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <Filter className="w-4 h-4 text-gray-400" />
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
        >
          <option value="all">All States</option>
          {states.map((s) => (
            <option key={s} value={s}>
              {stateNames[s] || s}
            </option>
          ))}
        </select>

        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 focus:ring-2 focus:ring-amber-300 focus:border-amber-400"
        >
          <option value="all">All Types</option>
          <option value="pick-and-mix">Pick &amp; Mix</option>
          <option value="dedicated">Dedicated Store</option>
          <option value="specialty">Specialty / Section</option>
        </select>

        <span className="text-sm text-gray-400 ml-auto">
          {filteredStores.length} {filteredStores.length === 1 ? 'location' : 'locations'}
        </span>
      </div>

      {/* Map */}
      <StoreMap
        stores={filteredStores}
        selectedStoreId={selectedStoreId}
        onStoreSelect={setSelectedStoreId}
      />

      {/* Quick-list below map */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">
          {selectedState === 'all'
            ? 'All Locations'
            : `Stores in ${stateNames[selectedState] || selectedState}`}
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              isSelected={store.id === selectedStoreId}
              onClick={() => setSelectedStoreId(store.id)}
            />
          ))}
        </div>

        {filteredStores.length === 0 && (
          <p className="text-gray-500 text-center py-12">
            No stores found with the current filters. Try adjusting your selection.
          </p>
        )}
      </div>
    </div>
  )
}

function StoreCard({
  store,
  isSelected,
  onClick,
}: {
  store: PhysicalStore
  isSelected: boolean
  onClick: () => void
}) {
  return (
    <div
      className={`border rounded-lg p-4 cursor-pointer transition-all hover:shadow-md ${
        isSelected
          ? 'border-amber-400 bg-amber-50 shadow-md'
          : store.status === 'coming-soon'
            ? 'border-yellow-200 bg-yellow-50/30'
            : 'border-gray-200 bg-white'
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-1">
        <h3 className="font-semibold text-gray-900 text-sm leading-tight">{store.name}</h3>
        {store.status === 'coming-soon' ? (
          <span className="text-[10px] bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded-full ml-2 flex-shrink-0">
            Soon
          </span>
        ) : store.type === 'pick-and-mix' ? (
          <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full ml-2 flex-shrink-0">
            P&amp;M
          </span>
        ) : null}
      </div>

      <p className="text-xs text-gray-500 flex items-center gap-1 mb-0.5">
        <MapPin className="w-3 h-3 flex-shrink-0" />
        {store.city}, {store.state}
      </p>
      <p className="text-xs text-gray-400 flex items-center gap-1 mb-2">
        <Clock className="w-3 h-3 flex-shrink-0" />
        {store.hours}
      </p>

      <div className="flex flex-wrap gap-2 mt-auto pt-2 border-t border-gray-100">
        {store.storePageSlug && (
          <a
            href={`/stores/${store.storePageSlug}`}
            className="text-xs text-blue-600 hover:underline flex items-center gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <Star className="w-3 h-3" /> Review
          </a>
        )}
        {store.shopUrl && (
          <a
            href={store.affiliateUrl || store.shopUrl}
            target="_blank"
            rel={store.affiliateUrl ? 'sponsored noopener' : 'noopener'}
            className="text-xs text-amber-700 hover:underline font-medium flex items-center gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingBag className="w-3 h-3" /> Shop
          </a>
        )}
        {store.website && (
          <a
            href={store.website}
            target="_blank"
            rel="noopener"
            className="text-xs text-gray-400 hover:underline flex items-center gap-0.5"
            onClick={(e) => e.stopPropagation()}
          >
            <ExternalLink className="w-3 h-3" /> Web
          </a>
        )}
      </div>
    </div>
  )
}
