"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { places } from "@/lib/data"
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin, Users } from "lucide-react"
import { useTranslation } from "@/lib/use-translation"

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const PEAK_SEASONS = [
  { month: "December", reason: "Holiday season, perfect weather" },
  { month: "January", reason: "New Year festivities" },
  { month: "July", reason: "Summer vacation peak" },
  { month: "August", reason: "Extended summer period" },
]

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay()
}

export default function CalendarPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [bookings, setBookings] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  // Get current month/year
  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)

      const { data: bookingsData } = await supabase
        .from("place_bookings")
        .select("*")
        .eq("user_id", user.id)
        .gte("booking_date", `${currentYear}-01-01`)
        .order("booking_date", { ascending: true })

      setBookings(bookingsData || [])
      setLoading(false)
    }
    fetchData()
  }, [supabase, router, currentYear])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </main>
    )
  }

  // Create a map of bookings by date
  const bookingsByDate: Record<string, any[]> = {};
  (bookings || []).forEach((booking: any) => {
    const dateKey = booking.booking_date
    if (!bookingsByDate[dateKey]) {
      bookingsByDate[dateKey] = []
    }
    const place = places.find((p) => p.id === booking.place_id)
    bookingsByDate[dateKey].push({ ...booking, place })
  })

  // Generate calendar days
  const daysInMonth = getDaysInMonth(currentYear, currentMonth)
  const firstDay = getFirstDayOfMonth(currentYear, currentMonth)
  const days = []

  for (let i = 0; i < firstDay; i++) {
    days.push(null)
  }

  for (let i = 1; i <= daysInMonth; i++) {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`
    days.push({
      day: i,
      date: dateStr,
      isToday: i === today.getDate() && currentMonth === today.getMonth(),
      bookings: bookingsByDate[dateStr] || []
    })
  }

  const upcomingBookings = (bookings || [])
    .filter((b: any) => new Date(b.booking_date) >= today && b.status !== "cancelled")
    .slice(0, 5)
    .map((booking: any) => ({
      ...booking,
      place: places.find((p) => p.id === booking.place_id)
    }))

  const isPeakMonth = PEAK_SEASONS.some((s) => s.month === MONTHS[currentMonth])

  return (
    <main className="w-full bg-slate-50 min-h-screen flex flex-col selection:bg-cyan-300 selection:text-blue-900">
      <Header />

      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <CalendarIcon className="w-10 h-10 text-blue-600" />
            <h1 className="text-5xl md:text-6xl font-bold text-slate-900 font-aladin">{t("nav.calendar")}</h1>
          </div>
          <p className="text-slate-500 text-xl font-medium">
            View your bookings and plan your visits to Ilashe Beach
          </p>
          {isPeakMonth && (
            <div className="mt-6 inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-6 py-3 rounded-full font-bold">
              Peak Season - {MONTHS[currentMonth]}
            </div>
          )}
        </div>
      </section>

      {/* Calendar Section */}
      <section className="py-16 flex-1">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calendar */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-[2rem] p-6 md:p-8 shadow-xl border border-slate-100">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-slate-900 font-aladin">
                    {MONTHS[currentMonth]} {currentYear}
                  </h2>
                </div>

                {/* Day Headers */}
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-bold text-slate-400 py-2">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-2">
                  {days.map((day, index) => (
                    <div
                      key={index}
                      className={`min-h-[100px] p-3 rounded-xl border transition-all ${day === null
                        ? "bg-transparent border-transparent"
                        : day.isToday
                          ? "bg-blue-50 border-blue-200"
                          : day.bookings.length > 0
                            ? "bg-green-50 border-green-200"
                            : "bg-white border-slate-100 hover:border-slate-200"
                        }`}
                    >
                      {day !== null && (
                        <>
                          <span className={`text-sm font-bold ${day.isToday ? "text-blue-600" : "text-slate-700"}`}>
                            {day.day}
                          </span>
                          {day.bookings.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {day.bookings.map((booking: any, i: number) => (
                                <div
                                  key={i}
                                  className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded-full truncate font-bold"
                                >
                                  {booking.place?.name || "Booking"}
                                </div>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 font-aladin">Upcoming Bookings</h3>

                {upcomingBookings.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingBookings.map((booking: any) => (
                      <div
                        key={booking.id}
                        className="p-4 bg-slate-50 rounded-2xl border border-slate-100 group hover:border-blue-200 transition-colors"
                      >
                        <p className="font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {booking.place?.name || `Place #${booking.place_id}`}
                        </p>
                        <p className="text-sm text-slate-500 font-bold mb-3 uppercase tracking-wider">
                          {new Date(booking.booking_date).toLocaleDateString("en-US", {
                            weekday: "short",
                            month: "short",
                            day: "numeric"
                          })}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {booking.number_of_people}
                          </span>
                          {booking.place?.location && (
                            <span className="flex items-center gap-1 truncate">
                              <MapPin className="w-4 h-4" />
                              {booking.place.location}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-slate-500 mb-6">No upcoming plans yet.</p>
                    <Link href="/activities">
                      <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold rounded-full py-6">
                        Explore Activities
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
