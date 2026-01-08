"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Calendar, Users, MapPin, X, Check, AlertCircle } from "lucide-react"
import { places } from "@/lib/data"
import { useTranslation } from "@/lib/use-translation"

export default function BookingsPage() {
    const { t } = useTranslation()
    const router = useRouter()
    const [bookings, setBookings] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const fetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            if (!user) {
                router.push("/auth/login")
                return
            }

            const { data: bookingsData } = await supabase
                .from("place_bookings")
                .select("*")
                .eq("user_id", user.id)
                .order("booking_date", { ascending: true })

            setBookings(bookingsData || [])
            setLoading(false)
        }
        fetchData()
    }, [supabase, router])

    if (loading) {
        return (
            <main className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </main>
        )
    }

    // Enrich bookings with place data
    const enrichedBookings = bookings.map((booking: any) => {
        const place = places.find((p) => p.id === booking.place_id)
        return { ...booking, place }
    })

    const upcomingBookings = enrichedBookings.filter(
        (b: any) => new Date(b.booking_date) >= new Date() && b.status !== "cancelled"
    )
    const pastBookings = enrichedBookings.filter(
        (b: any) => new Date(b.booking_date) < new Date() || b.status === "cancelled"
    )

    const getStatusBadge = (status: string) => {
        switch (status) {
            case "confirmed":
                return (
                    <span className="inline-flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <Check className="w-3 h-3" />
                        {t("booking.confirmed" as any)}
                    </span>
                )
            case "cancelled":
                return (
                    <span className="inline-flex items-center gap-1 bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <X className="w-3 h-3" />
                        Cancelled
                    </span>
                )
            default:
                return (
                    <span className="inline-flex items-center gap-1 bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                        <AlertCircle className="w-3 h-3" />
                        Pending
                    </span>
                )
        }
    }

    return (
        <main className="w-full bg-slate-50 min-h-screen flex flex-col selection:bg-cyan-300 selection:text-blue-900">
            <Header />

            {/* Hero Section */}
            <section className="pt-40 pb-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
                <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 font-aladin">{t("nav.bookings")}</h1>
                    <p className="text-slate-500 text-xl font-medium">
                        Manage your upcoming activities at Ilashe Beach
                    </p>
                </div>
            </section>

            {/* Bookings List */}
            <section className="py-16 flex-1">
                <div className="max-w-4xl mx-auto px-6 md:px-12">
                    {/* Upcoming Bookings */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-bold text-slate-900 mb-8 font-aladin">Upcoming Plans</h2>
                        {upcomingBookings.length > 0 ? (
                            <div className="space-y-6">
                                {upcomingBookings.map((booking: any) => (
                                    <div
                                        key={booking.id}
                                        className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 group hover:-translate-y-1 transition-all duration-300"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                            <div className="flex-1">
                                                <div className="flex flex-wrap items-center gap-4 mb-4">
                                                    {getStatusBadge(booking.status)}
                                                    <h3 className="text-2xl font-bold text-slate-900 font-aladin">
                                                        {booking.place?.name || `Place #${booking.place_id}`}
                                                    </h3>
                                                </div>
                                                <div className="flex flex-wrap gap-6 text-slate-500 font-medium">
                                                    <span className="flex items-center gap-2">
                                                        <Calendar className="w-5 h-5 text-blue-500" />
                                                        {new Date(booking.booking_date).toLocaleDateString("en-US", {
                                                            weekday: "short",
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric"
                                                        })}
                                                    </span>
                                                    <span className="flex items-center gap-2">
                                                        <Users className="w-5 h-5 text-blue-500" />
                                                        {booking.number_of_people} {booking.number_of_people === 1 ? "person" : "people"}
                                                    </span>
                                                    {booking.place?.location && (
                                                        <span className="flex items-center gap-2">
                                                            <MapPin className="w-5 h-5 text-blue-500" />
                                                            {booking.place.location}
                                                        </span>
                                                    )}
                                                </div>
                                                {booking.notes && (
                                                    <div className="mt-6 bg-slate-50 p-4 rounded-2xl border border-slate-100 italic text-slate-600">
                                                        "{booking.notes}"
                                                    </div>
                                                )}
                                            </div>
                                            <Link href={`/activities/${booking.activity_id}`}>
                                                <Button variant="outline" className="rounded-full border-2 border-slate-200 px-8 py-6 font-bold hover:bg-slate-50 transition-colors">
                                                    View Activity
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
                                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <Calendar className="w-10 h-10 text-slate-300" />
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 mb-2 font-aladin">No upcoming bookings</h3>
                                <p className="text-slate-500 mb-8">Ready for your next adventure?</p>
                                <Link href="/activities">
                                    <Button className="bg-blue-600 text-white hover:bg-blue-700 px-10 py-6 text-lg font-bold rounded-full shadow-lg transition-all hover:-translate-y-0.5">
                                        Browse Activities
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Past Bookings */}
                    {pastBookings.length > 0 && (
                        <div className="pt-8 border-t border-slate-200">
                            <h2 className="text-2xl font-bold text-slate-400 mb-8 font-aladin">Past & Cancelled</h2>
                            <div className="space-y-4">
                                {pastBookings.map((booking: any) => (
                                    <div
                                        key={booking.id}
                                        className="bg-white/50 rounded-[2rem] p-6 border border-slate-100 opacity-60 grayscale-[0.5]"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div className="flex items-center gap-4">
                                                {getStatusBadge(booking.status)}
                                                <h3 className="text-xl font-bold text-slate-600 font-aladin">
                                                    {booking.place?.name || `Place #${booking.place_id}`}
                                                </h3>
                                            </div>
                                            <div className="text-slate-400 font-bold">
                                                {new Date(booking.booking_date).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    )
}
