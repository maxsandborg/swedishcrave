'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronDown, ChevronUp } from 'lucide-react'

type StoreItem = {
  slug: string
  name: string
  shipsTo: string[]
}

export default function ExpandableStoreList({
  stores,
  initialCount = 6,
}: {
  stores: StoreItem[]
  initialCount?: number
}) {
  const [expanded, setExpanded] = useState(false)

  const visibleStores = expanded ? stores : stores.slice(0, initialCount)
  const hasMore = stores.length > initialCount

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {visibleStores.map((store) => (
          <Link
            key={store.slug}
            href={`/stores/${store.slug}`}
            className="bg-white/70 rounded-sc-sm p-4 text-center border border-sc-border/50 hover:border-sc-border hover:bg-white transition-all"
          >
            <h4 className="text-[13px] font-semibold text-sc-text mb-0.5">{store.name}</h4>
            <p className="text-[11px] text-sc-text-muted/60">{store.shipsTo.join(', ')}</p>
          </Link>
        ))}
      </div>
      {hasMore && (
        <div className="text-center mt-4">
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1.5 text-sc-primary font-semibold text-sm hover:underline transition-all cursor-pointer"
          >
            {expanded ? (
              <>
                Show less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                View {stores.length - initialCount} more stores <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </>
  )
}
