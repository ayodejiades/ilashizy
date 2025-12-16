"use client"

import { useState, useEffect } from "react"
import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { ActivityCard } from "@/components/activity-card"

const ACTIVITIES_WITH_ICONS = [
  {
    id: "beach-lounging",
    title: "Beach Lounging",
    icon: "🏖️",
    description: "Relax on pristine white sands",
  },
  {
    id: "boat-tours",
    title: "Boat Tours",
    icon: "🚤",
    description: "Explore coastal waters",
  },
  {
    id: "photography-tours",
    title: "Photography Tours",
    icon: "📸",
    description: "Golden hour photography sessions",
  },
  {
    id: "fishing-experience",
    title: "Fishing Experience",
    icon: "🎣",
    description: "Traditional fishing experience",
  },
  {
    id: "group-activities",
    title: "Group Activities",
    icon: "👥",
    description: "Beach games and events",
  },
  {
    id: "accommodation",
    title: "Accommodation",
    icon: "🛏️",
    description: "Beachside lodging",
  },
]

export default function ProviderDashboard() {
  const [user, setUser] = useState<any>(null)
  const [availability, setAvailability] = useState<Record<string, boolean>>({})
  const [bookings, setBookings] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()
      if (!user) {
        redirect("/auth/login")
      }
      setUser(user)

      // Fetch bookings for this provider
      const { data: bookingsData } = await supabase.from("bookings").select("*").eq("status", "pending").limit(10)

      setBookings(bookingsData || [])

      // Fetch notifications
      const { data: notificationsData } = await supabase
        .from("notifications")
        .select("*")
        .eq("recipient_id", user.id)
        .eq("read", false)

      setNotifications(notificationsData || [])

      // Initialize availability
      const initialAvailability: Record<string, boolean> = {}
      ACTIVITIES_WITH_ICONS.forEach((activity) => {
        initialAvailability[activity.id] = activity.id !== "fishing-experience"
      })
      setAvailability(initialAvailability)
    }

    fetchData()
  }, [supabase])

  const handleToggleAvailability = (activityId: string, newStatus: boolean) => {
    setAvailability((prev) => ({
      ...prev,
      [activityId]: newStatus,
    }))
  }

  const handleMarkNotificationRead = async (notificationId: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", notificationId)

    setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
  }

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      {/* Header - Matching Landing Page */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl brand-title text-blue-600 tracking-wider hover:opacity-80 transition-opacity font-aladin">ILASHIZY</Link>
          <div className="flex items-center gap-6">
            <Link href="/profile" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">
              Profile
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 text-lg font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Provider Dashboard */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-slate-900 mb-4 font-aladin">Service Provider Dashboard</h1>
          <p className="text-xl text-slate-500 font-medium">Manage your activities and bookings</p>
        </div>

        {/* Notifications */}
        {notifications.length > 0 && (
          <div className="mb-8 bg-blue-50 border border-blue-100 rounded-[2rem] p-8 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-blue-900 font-aladin">Notifications</h2>
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

        {/* Pending Bookings */}
        <div className="mb-12 bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-slate-900 font-aladin mb-2">Pending Bookings</h2>
            <p className="text-slate-500">{bookings.length} bookings awaiting confirmation</p>
          </div>

          {bookings.length > 0 ? (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex items-center justify-between p-6 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors"
                >
                  <div>
                    <p className="font-bold text-lg text-slate-900">Booking for {booking.participants} participants</p>
                    <p className="text-slate-500">Date: {booking.date}</p>
                  </div>
                  <div className="flex gap-3">
                    <Button variant="outline" className="rounded-full border-slate-200 hover:bg-slate-100">
                      Decline
                    </Button>
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-md">Confirm</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-slate-400 font-medium">No pending bookings at the moment</p>
            </div>
          )}
        </div>

        {/* Manage Activities Availability */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 font-aladin">Manage Activity Availability</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ACTIVITIES_WITH_ICONS.map((activity) => (
              <ActivityCard
                key={activity.id}
                id={activity.id}
                title={activity.title}
                icon={activity.icon}
                description={activity.description}
                available={availability[activity.id] || false}
                userRole="service_provider"
                onToggleAvailability={handleToggleAvailability}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
