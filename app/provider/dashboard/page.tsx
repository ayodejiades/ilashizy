"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { ActivityCard } from "@/components/activity-card"
import { Header } from "@/components/header"
import { useTranslation } from "@/lib/use-translation"
import { toast } from "sonner"

export default function ProviderDashboard() {
  const { t } = useTranslation()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [providerPlaces, setProviderPlaces] = useState<any[]>([])
  const [bookings, setBookings] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }
      setUser(user)

      // 1. Fetch places owned by this provider
      const { data: placesData } = await supabase
        .from("places")
        .select("*")
        .eq("provider_id", user.id)

      setProviderPlaces(placesData || [])

      // 2. Fetch bookings for these places
      if (placesData && placesData.length > 0) {
        const placeIds = placesData.map(p => p.id)
        const { data: bookingsData } = await supabase
          .from("place_bookings")
          .select("*, profiles(display_name)") // Join with profiles to see who booked
          .in("place_id", placeIds)
          .eq("status", "pending")
          .order("booking_date", { ascending: true })

        setBookings(bookingsData || [])
      }

      // 3. Fetch notifications
      const { data: notificationsData } = await supabase
        .from("notifications")
        .select("*")
        .eq("recipient_id", user.id)
        .eq("read", false)
        .order("created_at", { ascending: false })

      setNotifications(notificationsData || [])
      setLoading(false)
    }

    fetchData()
  }, [supabase, router])

  const handleToggleAvailability = async (placeId: string, newStatus: boolean) => {
    const { error } = await supabase
      .from("places")
      .update({ is_available: newStatus })
      .eq("id", placeId)

    if (error) {
      toast.error("Failed to update availability")
      return
    }

    setProviderPlaces((prev) =>
      prev.map(p => p.id === placeId ? { ...p, is_available: newStatus } : p)
    )
    toast.success("Availability updated")
  }

  const handleUpdateBookingStatus = async (bookingId: string, status: "confirmed" | "cancelled") => {
    const { error } = await supabase
      .from("place_bookings")
      .update({ status })
      .eq("id", bookingId)

    if (error) {
      toast.error(`Failed to ${status} booking`)
      return
    }

    setBookings((prev) => prev.filter((b) => b.id !== bookingId))
    toast.success(`Booking ${status}`)
  }

  const handleMarkNotificationRead = async (notificationId: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", notificationId)
    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      <Header />

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4 font-aladin">{t("nav.dashboard")}</h1>
          <p className="text-xl text-slate-500 font-medium">Welcome back, {user?.user_metadata?.display_name || 'Provider'}</p>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-12 bg-blue-50 border border-blue-100 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-900 font-aladin">Recent Notifications</h2>
              <span className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm font-bold">{notifications.length} New</span>
            </div>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-blue-100 shadow-sm"
                >
                  <p className="text-slate-700 font-medium">{notification.message}</p>
                  <Button variant="ghost" size="sm" onClick={() => handleMarkNotificationRead(notification.id)} className="text-blue-600 hover:text-blue-800 hover:bg-blue-50">
                    Dismiss
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Main Content: Bookings */}
          <div className="lg:col-span-2 space-y-12">
            <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 font-aladin mb-2">Pending Bookings</h2>
                  <p className="text-slate-500">{bookings.length} requests awaiting your action</p>
                </div>
              </div>

              {bookings.length > 0 ? (
                <div className="space-y-4">
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="p-6 border border-slate-100 rounded-3xl hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                          <p className="font-bold text-xl text-slate-900 mb-1">
                            {booking.profiles?.display_name || 'Guest'}
                          </p>
                          <p className="text-slate-500 font-medium">
                            {booking.number_of_people} {booking.number_of_people === 1 ? 'Person' : 'People'} • {new Date(booking.booking_date).toLocaleDateString()}
                          </p>
                          {booking.notes && (
                            <p className="mt-3 text-slate-600 text-sm bg-slate-100 p-3 rounded-xl italic">"{booking.notes}"</p>
                          )}
                        </div>
                        <div className="flex gap-3">
                          <Button
                            variant="outline"
                            className="rounded-full border-slate-200 hover:bg-red-50 hover:text-red-600 hover:border-red-200"
                            onClick={() => handleUpdateBookingStatus(booking.id, "cancelled")}
                          >
                            Decline
                          </Button>
                          <Button
                            className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md"
                            onClick={() => handleUpdateBookingStatus(booking.id, "confirmed")}
                          >
                            Confirm
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-[2rem] border border-dashed border-slate-200">
                  <p className="text-slate-400 font-bold text-lg">No pending bookings</p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar: Manage My Places */}
          <div>
            <div className="sticky top-32 space-y-8">
              <h2 className="text-4xl font-bold text-slate-900 font-aladin">Your Places</h2>
              {providerPlaces.length > 0 ? (
                <div className="space-y-6">
                  {providerPlaces.map((place) => (
                    <ActivityCard
                      key={place.id}
                      id={place.activity_id} // Show activity info
                      title={place.name}
                      icon={place.activity_id} // Re-using activity_id as icon key works if mapped
                      description={place.description}
                      available={place.is_available}
                      userRole="service_provider"
                      onToggleAvailability={() => handleToggleAvailability(place.id, !place.is_available)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 bg-white rounded-[2rem] border border-dashed border-slate-200 text-center">
                  <p className="text-slate-500 mb-6 font-medium">You haven't added any places yet.</p>
                  <Button className="w-full rounded-full bg-blue-600 font-bold py-6">Add Your First Place</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
