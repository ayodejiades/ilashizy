"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { activities as staticActivities, places as staticPlaces } from "@/lib/data"
import { Aladin } from 'next/font/google'
import { MapPin, Clock, Phone, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { BookingDialog } from "@/components/booking-dialog"
import { useTranslation } from "@/lib/use-translation"

const aladin = Aladin({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const ICON_MAP: Record<string, any> = {
  // Add mapping if needed, but here we can just fallback to activity colors
}

export default function ActivityDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { t } = useTranslation()
  const [activity, setActivity] = useState<any>(null)
  const [activityPlaces, setActivityPlaces] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPlace, setSelectedPlace] = useState<any>(null)
  const supabase = createClient()

  const id = params?.id as string

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      // Fetch activity from DB
      const { data: activityData } = await supabase
        .from("activities")
        .select("*")
        .eq("id", id)
        .single()

      const currentActivity = activityData || staticActivities.find(a => a.id === id)

      if (!currentActivity) {
        router.push("/activities")
        return
      }
      setActivity(currentActivity)

      // Fetch places for this activity
      const { data: placesData } = await supabase
        .from("places")
        .select("*")
        .eq("activity_id", id)

      setActivityPlaces(placesData || staticPlaces.filter(p => p.activityId === id))
      setLoading(false)
    }
    fetchData()
  }, [id, supabase, router])

  if (loading || !activity) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      <Header />

      <section className="pt-40 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/activities" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors font-bold">
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t("activities.backToActivities")}
        </Link>

        <div className={`bg-gradient-to-br ${activity.color || 'from-blue-400 to-cyan-500'} rounded-[3rem] p-1 shadow-xl mb-16`}>
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.9rem] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                {activity.svg ? (
                  <img src={activity.svg} alt={activity.title} className="w-16 h-16 object-contain" />
                ) : (
                  <span className="text-4xl">{activity.icon}</span>
                )}
              </div>
              <h1 className={`text-5xl md:text-7xl font-bold text-slate-900 mb-6 ${aladin.className}`}>
                {t(`activity.${activity.id}` as any) || activity.title}
              </h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
        </div>

        <h2 className={`text-4xl font-bold text-slate-900 mb-8 ${aladin.className}`}>{t("activities.availablePlaces")}</h2>

        {activityPlaces.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activityPlaces.map((place) => (
              <div key={place.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.color || 'from-blue-400 to-cyan-500'} opacity-20`}></div>
                  <img
                    src={place.image || "/placeholder.svg"}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm ${place.is_available === false ? 'bg-red-100 text-red-700' : place.is_free ? 'bg-green-100 text-green-700' : 'bg-white text-slate-900'}`}>
                      {place.is_available === false ? t("activity.unavailable" as any) : place.is_free ? t("activities.freeEntry") : place.price}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className={`text-2xl font-bold text-slate-900 mb-2 ${aladin.className}`}>{place.name}</h3>
                  <div className="flex items-center text-slate-500 text-sm mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {place.location}
                  </div>

                  <p className="text-slate-600 mb-6 line-clamp-2">{place.description}</p>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-slate-600 text-sm">
                      <Clock className="w-4 h-4 mr-3 text-blue-500" />
                      {place.opening_time || place.openingTime}
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <Phone className="w-4 h-4 mr-3 text-blue-500" />
                      {place.contact}
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedPlace(place)}
                    disabled={place.is_available === false}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 rounded-full py-6 font-bold"
                  >
                    {t("booking.book")}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">{t("activities.noPlaces")}</h3>
            <p className="text-slate-500">{t("activities.checkBackPlaces").replace("{activity}", t(`activity.${id}` as any))}</p>
          </div>
        )}
      </section>

      {selectedPlace && (
        <BookingDialog
          place={selectedPlace}
          isOpen={!!selectedPlace}
          onClose={() => setSelectedPlace(null)}
        />
      )}

      <Footer />
    </main>
  )
}
