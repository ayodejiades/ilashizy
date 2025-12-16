import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { activities, places } from "@/lib/data"
import { Aladin } from 'next/font/google'
import { MapPin, Clock, Phone, ArrowLeft } from "lucide-react"
import { Footer } from "@/components/footer"
import { PlaceBookingDialog } from "@/components/place-booking-dialog"

const aladin = Aladin({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default async function ActivityDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { id } = await params
  const activity = activities.find((a) => a.id === id)

  if (!activity) {
    redirect("/activities")
  }

  const activityPlaces = places.filter((p) => p.activityId === id)

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      {/* Header - Matching Landing Page */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className={`text-3xl brand-title text-blue-600 tracking-wider hover:opacity-80 transition-opacity ${aladin.className}`}>ILASHIZY</Link>
          <div className="hidden md:flex gap-8">
            <Link href="/dashboard" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Dashboard</Link>
            <Link href="/activities" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Activities</Link>
            <Link href="/profile" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Profile</Link>
          </div>
          <div className="flex items-center gap-3">
            <form action="/api/auth/logout" method="POST">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 text-lg font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      <section className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <Link href="/activities" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Activities
        </Link>

        <div className={`bg-gradient-to-br ${activity.color} rounded-[3rem] p-1 shadow-xl mb-16`}>
          <div className="bg-white/90 backdrop-blur-xl rounded-[2.9rem] p-8 md:p-12 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-5 pointer-events-none"></div>
            <div className="relative z-10">
              <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-md mb-6">
                {activity.svg ? (
                  <img src={activity.svg} alt={activity.title} className="w-16 h-16 object-contain" />
                ) : (
                  <activity.icon className="w-12 h-12 text-blue-600" />
                )}
              </div>
              <h1 className={`text-5xl md:text-7xl font-bold text-slate-900 mb-6 ${aladin.className}`}>{activity.title}</h1>
              <p className="text-xl md:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                {activity.description}
              </p>
            </div>
          </div>
        </div>

        <h2 className={`text-4xl font-bold text-slate-900 mb-8 ${aladin.className}`}>Available Places</h2>

        {activityPlaces.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activityPlaces.map((place) => (
              <div key={place.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  {/* Placeholder for place image - using gradient for now if image fails */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} opacity-20`}></div>
                  <img
                    src={place.image}
                    alt={place.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 right-4">
                    <span className={`px-4 py-1 rounded-full text-sm font-bold shadow-sm ${place.isFree ? 'bg-green-100 text-green-700' : 'bg-white text-slate-900'}`}>
                      {place.isFree ? 'Free Entry' : place.price}
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
                      {place.openingTime}
                    </div>
                    <div className="flex items-center text-slate-600 text-sm">
                      <Phone className="w-4 h-4 mr-3 text-blue-500" />
                      {place.contact}
                    </div>
                  </div>

                  <PlaceBookingDialog
                    place={place}
                    activityId={id}
                    activityTitle={activity.title}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-10 h-10 text-slate-300" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No places listed yet</h3>
            <p className="text-slate-500">Check back soon for updates on {activity.title} locations.</p>
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
