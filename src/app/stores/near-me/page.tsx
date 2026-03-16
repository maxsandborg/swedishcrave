import { Metadata } from 'next'
import Link from 'next/link'
import { MapPin, Clock, ExternalLink, ShoppingBag, Star } from 'lucide-react'
import Breadcrumbs from '@/components/Breadcrumbs'
import { physicalStores, getStoreStates, getStoresByState, getUniqueBrandCount } from '@/data/storeLocations'
import NearMeClient from './NearMeClient'

export const metadata: Metadata = {
  title: 'Swedish Candy Stores Near Me — Interactive US Map',
  description:
    'Find Swedish candy stores near you with our interactive map. Browse 20+ physical locations across NYC, LA, Florida, Massachusetts and more. Pick-and-mix, reviews, and shop online.',
  openGraph: {
    title: 'Swedish Candy Stores Near Me — Interactive US Map',
    description:
      'Find Swedish candy stores near you. 20+ locations across the US with pick-and-mix, reviews, and online shop links.',
    url: 'https://www.swedishcrave.com/stores/near-me',
  },
  alternates: {
    canonical: 'https://www.swedishcrave.com/stores/near-me',
  },
}

export default function NearMePage() {
  const states = getStoreStates()
  const totalLocations = physicalStores.length
  const openLocations = physicalStores.filter((s) => s.status === 'open').length
  const comingSoon = physicalStores.filter((s) => s.status === 'coming-soon').length
  const uniqueBrands = getUniqueBrandCount()
  const statesWithStores = states.length
  const pickAndMixCount = physicalStores.filter((s) => s.type === 'pick-and-mix').length

  return (
    <>
      {/* Leaflet CSS — loaded here to avoid SSR issues */}
      {/* eslint-disable-next-line @next/next/no-css-tags */}
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css"
        integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
        crossOrigin=""
      />

      <main className="min-h-screen bg-white">
        {/* Hero */}
        <section className="bg-gradient-to-br from-amber-50 to-orange-50 border-b border-amber-100">
          <div className="max-w-6xl mx-auto px-4 pt-8 pb-12">
            <Breadcrumbs
              items={[
                { label: 'Home', href: '/' },
                { label: 'Stores', href: '/where-to-buy' },
                { label: 'Near Me' },
              ]}
            />

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 mb-4">
              Swedish Candy Stores Near Me
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mb-8">
              Find Swedish candy stores across the United States. Browse our interactive map
              of {totalLocations} locations — from NYC pick-and-mix walls to West Coast
              candy shops.
            </p>

            {/* Stats row */}
            <div className="flex flex-wrap gap-4 md:gap-8">
              <div className="bg-white rounded-lg px-5 py-3 shadow-sm border border-amber-100">
                <div className="text-2xl font-bold text-amber-700">{openLocations}</div>
                <div className="text-xs text-gray-500">Open locations</div>
              </div>
              <div className="bg-white rounded-lg px-5 py-3 shadow-sm border border-amber-100">
                <div className="text-2xl font-bold text-amber-700">{uniqueBrands}</div>
                <div className="text-xs text-gray-500">Unique brands</div>
              </div>
              <div className="bg-white rounded-lg px-5 py-3 shadow-sm border border-amber-100">
                <div className="text-2xl font-bold text-amber-700">{statesWithStores}</div>
                <div className="text-xs text-gray-500">States</div>
              </div>
              <div className="bg-white rounded-lg px-5 py-3 shadow-sm border border-amber-100">
                <div className="text-2xl font-bold text-amber-700">{pickAndMixCount}</div>
                <div className="text-xs text-gray-500">Pick-and-mix stores</div>
              </div>
              {comingSoon > 0 && (
                <div className="bg-white rounded-lg px-5 py-3 shadow-sm border border-yellow-200">
                  <div className="text-2xl font-bold text-yellow-600">{comingSoon}</div>
                  <div className="text-xs text-gray-500">Coming soon</div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Map + Store List (client component) */}
        <section className="max-w-6xl mx-auto px-4 py-10">
          <NearMeClient />
        </section>

        {/* State-by-state listing (for SEO — fully rendered server-side) */}
        <section className="max-w-6xl mx-auto px-4 pb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            All Swedish Candy Stores by State
          </h2>

          {states.map((state) => {
            const stateStores = getStoresByState(state)
            const stateNames: Record<string, string> = {
              NY: 'New York',
              CA: 'California',
              FL: 'Florida',
              MA: 'Massachusetts',
              PA: 'Pennsylvania',
              TX: 'Texas',
            }

            return (
              <div key={state} className="mb-10" id={`state-${state.toLowerCase()}`}>
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-amber-600" />
                  {stateNames[state] || state} ({stateStores.length}{' '}
                  {stateStores.length === 1 ? 'location' : 'locations'})
                </h3>

                <div className="grid md:grid-cols-2 gap-4">
                  {stateStores.map((store) => (
                    <div
                      key={store.id}
                      className={`border rounded-xl p-5 transition-all hover:shadow-md ${
                        store.status === 'coming-soon'
                          ? 'border-yellow-200 bg-yellow-50/50'
                          : 'border-gray-200 bg-white'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{store.name}</h4>
                        {store.status === 'coming-soon' && (
                          <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full">
                            Coming Soon
                          </span>
                        )}
                        {store.type === 'pick-and-mix' && store.status === 'open' && (
                          <span className="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                            Pick &amp; Mix
                          </span>
                        )}
                      </div>

                      <p className="text-sm text-gray-500 mb-1 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                        {store.address}
                      </p>
                      <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                        {store.hours}
                      </p>

                      <p className="text-sm text-gray-600 mb-3">{store.description}</p>

                      {/* Highlights */}
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {store.highlights.slice(0, 4).map((h) => (
                          <span
                            key={h}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded"
                          >
                            {h}
                          </span>
                        ))}
                      </div>

                      {/* Actions */}
                      <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-100">
                        {store.storePageSlug && (
                          <Link
                            href={`/stores/${store.storePageSlug}`}
                            className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                          >
                            <Star className="w-3.5 h-3.5" />
                            Read Review
                          </Link>
                        )}
                        {store.shopUrl && (
                          <a
                            href={store.affiliateUrl || store.shopUrl}
                            target="_blank"
                            rel={store.affiliateUrl ? 'sponsored noopener' : 'noopener'}
                            className="text-sm text-amber-700 hover:underline font-medium flex items-center gap-1"
                          >
                            <ShoppingBag className="w-3.5 h-3.5" />
                            Shop Online
                          </a>
                        )}
                        {store.website && (
                          <a
                            href={store.website}
                            target="_blank"
                            rel="noopener"
                            className="text-sm text-gray-500 hover:underline flex items-center gap-1"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </section>

        {/* CTA — Can't visit? Shop online */}
        <section className="bg-gradient-to-r from-amber-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto px-4 py-12 text-center">
            <h2 className="text-2xl font-bold mb-3">
              No Swedish Candy Store Near You?
            </h2>
            <p className="text-amber-100 mb-6 max-w-xl mx-auto">
              Many of these stores ship nationwide. Or check our curated list of the best
              online Swedish candy retailers — all tested and reviewed.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/where-to-buy"
                className="bg-white text-amber-700 font-semibold px-6 py-3 rounded-lg hover:bg-amber-50 transition-colors"
              >
                Browse Online Stores
              </Link>
              <Link
                href="/blog/best-swedish-candy-subscription-boxes"
                className="bg-amber-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-amber-800 transition-colors border border-amber-500"
              >
                Subscription Boxes Guide
              </Link>
            </div>
          </div>
        </section>

        {/* FAQ — structured for SEO */}
        <section className="max-w-3xl mx-auto px-4 py-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Where can I buy Swedish candy in the US?
              </h3>
              <p className="text-gray-600">
                There are {openLocations} dedicated Swedish candy stores across {statesWithStores} US
                states, with the highest concentration in New York City (10+ locations) and
                Los Angeles. Most stores offer pick-and-mix walls where you fill your own bag
                by weight. If there&apos;s no store near you, many retailers also ship nationwide
                — check our{' '}
                <Link href="/where-to-buy" className="text-amber-700 hover:underline">
                  online store guide
                </Link>{' '}
                for options.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                What is pick-and-mix candy?
              </h3>
              <p className="text-gray-600">
                Pick-and-mix (called &quot;lösgodis&quot; in Swedish) is the Scandinavian tradition of
                choosing your own candy from bulk bins and paying by weight. It&apos;s standard in
                Sweden but relatively new in America. Stores like CandyKing, BonBon, and
                Sockerbit all offer this experience with 70–200+ candy varieties.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                How much does Swedish candy cost in stores?
              </h3>
              <p className="text-gray-600">
                Pick-and-mix pricing varies by store but typically ranges from $12–25 per
                pound. A small tasting bag runs $8–12, a medium bag $15–20, and a large
                family haul $25–50+. Pre-packaged items vary by brand and store.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Can I order Swedish candy online if there&apos;s no store near me?
              </h3>
              <p className="text-gray-600">
                Yes. Most Swedish candy stores on this map also have online shops with
                nationwide shipping. For a full comparison of online options, see our{' '}
                <Link href="/where-to-buy" className="text-amber-700 hover:underline">
                  where to buy Swedish candy guide
                </Link>{' '}
                or our{' '}
                <Link
                  href="/blog/best-swedish-candy-subscription-boxes"
                  className="text-amber-700 hover:underline"
                >
                  subscription box comparison
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Are new Swedish candy stores opening in the US?
              </h3>
              <p className="text-gray-600">
                Yes — the Swedish candy trend is growing fast. As of March 2026, Kändi is
                opening a second location in Santa Monica and Swedish Candy Culture is
                launching in Fort Worth, TX. CandyKing has also hinted at expansion beyond
                their NYC flagship. We update this map as new stores are announced.
              </p>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
