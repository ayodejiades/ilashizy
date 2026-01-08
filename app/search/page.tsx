'use client'

import { useState, useMemo, useEffect, Suspense } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { useTranslation } from "@/lib/use-translation"
import { activities, places } from "@/lib/data"
import { Search, MapPin, Clock, Phone } from "lucide-react"

function SearchContent() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""
  const [searchQuery, setSearchQuery] = useState(initialQuery)
  const { t } = useTranslation()

  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery)
    }
  }, [initialQuery])

  const filteredActivities = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return activities.filter(
      (a) =>
        a.title.toLowerCase().includes(query) ||
        a.description.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const filteredPlaces = useMemo(() => {
    if (!searchQuery.trim()) return []
    const query = searchQuery.toLowerCase()
    return places.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.location.toLowerCase().includes(query)
    )
  }, [searchQuery])

  const hasResults = filteredActivities.length > 0 || filteredPlaces.length > 0
  const showEmptyState = searchQuery.trim() && !hasResults

  return (
    <main className="w-full bg-slate-50 min-h-screen flex flex-col selection:bg-cyan-300 selection:text-blue-900">
      <Header />

      {/* Hero Search Section */}
      <section className="pt-40 pb-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 section-heading">Search Ilashizy</h1>
            <p className="text-slate-500 text-xl font-medium">
              Find activities, places, and experiences at Ilashe Beach
            </p>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50 blur-md group-hover:opacity-100 transition duration-500"></div>
            <div className="relative bg-white rounded-full flex items-center shadow-xl">
              <Search className="absolute left-6 text-slate-400 w-6 h-6" />
              <Input
                type="text"
                placeholder="Search activities, places, tips..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-16 pr-6 py-8 border-none rounded-full text-xl text-slate-800 placeholder-slate-400 focus:ring-0 bg-transparent shadow-none"
              />
            </div>
          </div>

          {/* Popular Searches */}
          {!searchQuery && (
            <div className="mt-8 text-center">
              <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-4">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-3">
                {["Surfing", "Photography", "Fishing", "Beach Walks", "Diving"].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="bg-white/60 backdrop-blur-md px-6 py-3 rounded-full text-slate-700 font-bold border border-white/50 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          {/* Activities Results */}
          {filteredActivities.length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-8 section-heading">
                Activities ({filteredActivities.length})
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredActivities.map((activity) => (
                  <Link
                    key={activity.id}
                    href={`/activities/${activity.id}`}
                    className="group relative block h-64"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} rounded-[2rem] p-[2px] shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2`}>
                      <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-[1.9rem] flex flex-col items-center justify-center p-6 transition-all duration-500">
                        {activity.svg ? (
                          <img
                            src={activity.svg}
                            alt={activity.title}
                            className="w-20 h-20 object-contain drop-shadow-md mb-4"
                          />
                        ) : (
                          <activity.icon className="w-16 h-16 text-slate-400 group-hover:text-blue-600 transition-colors mb-4" strokeWidth={1.5} />
                        )}
                        <span className="text-slate-900 font-bold text-xl tracking-wide text-center font-aladin">
                          {activity.title}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Places Results */}
          {filteredPlaces.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-slate-900 mb-8 section-heading">
                Places ({filteredPlaces.length})
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPlaces.map((place) => (
                  <div
                    key={place.id}
                    className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <div className="relative w-full h-48 overflow-hidden bg-slate-100">
                      <img
                        src={place.image || "/placeholder.svg"}
                        alt={place.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {place.isFree && (
                        <span className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                          Free
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-900 mb-2 font-aladin">{place.name}</h3>
                      <p className="text-slate-600 mb-4 line-clamp-2">{place.description}</p>
                      <div className="space-y-2 text-sm text-slate-500">
                        <div className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          <span>{place.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          <span>{place.openingTime}</span>
                        </div>
                        {place.contact !== "N/A" && (
                          <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <span>{place.contact}</span>
                          </div>
                        )}
                      </div>
                      {!place.isFree && (
                        <p className="mt-4 text-blue-600 font-bold">{place.price}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Empty State */}
          {showEmptyState && (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-aladin">No results found</h3>
              <p className="text-slate-500 mb-8">Try a different search term or browse our activities</p>
              <Link href="/activities">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Browse Activities
                </Button>
              </Link>
            </div>
          )}

          {/* Initial State */}
          {!searchQuery && (
            <div className="text-center py-16">
              <p className="text-slate-500 text-lg">Start typing to search for activities and places</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  )
}
