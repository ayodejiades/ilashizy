'use client'

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Calendar, Users, X, Check } from "lucide-react"
import type { Place } from "@/lib/data"

import { toast } from "sonner"
import { useTranslation } from "@/lib/use-translation"

interface BookingDialogProps {
    place: Place
    isOpen: boolean
    onClose: () => void
}

export function BookingDialog({ place, isOpen, onClose }: BookingDialogProps) {
    const { t } = useTranslation()
    const [bookingDate, setBookingDate] = useState("")
    const [numberOfPeople, setNumberOfPeople] = useState(1)
    const [notes, setNotes] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const router = useRouter()
    const supabase = createClient()

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)

        try {
            const { data: userData } = await supabase.auth.getUser()
            if (!userData.user) {
                toast.error("Please sign in to book")
                router.push("/auth/login")
                return
            }

            const { error: insertError } = await supabase.from("place_bookings").insert({
                user_id: userData.user.id,
                place_id: place.id,
                activity_id: place.activityId,
                booking_date: bookingDate,
                number_of_people: numberOfPeople,
                notes: notes || null,
            })

            if (insertError) throw insertError

            toast.success(t("booking.confirmed") || "Booking confirmed!")
            onClose()
            router.push("/dashboard") // Updated: Guests have /dashboard not /bookings
        } catch (err) {
            const msg = err instanceof Error ? err.message : "Failed to create booking"
            setError(msg)
            toast.error(msg)
        } finally {
            setIsLoading(false)
        }
    }

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    const minDate = tomorrow.toISOString().split("T")[0]

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Dialog */}
            <div className="relative bg-white rounded-[2rem] p-8 max-w-lg w-full mx-4 shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>

                <h2 className="text-3xl font-bold text-slate-900 mb-2 font-aladin">{t("booking.book")}</h2>
                <p className="text-slate-500 mb-8">{place.name}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date */}
                    <div>
                        <Label htmlFor="date" className="text-lg font-bold text-slate-900 mb-3 block">
                            <Calendar className="w-5 h-5 inline mr-2" />
                            {t("booking.date")}
                        </Label>
                        <Input
                            id="date"
                            type="date"
                            min={minDate}
                            value={bookingDate}
                            onChange={(e) => setBookingDate(e.target.value)}
                            required
                            className="w-full px-4 py-4 rounded-xl border-slate-200 text-lg"
                        />
                    </div>

                    {/* Number of People */}
                    <div>
                        <Label htmlFor="people" className="text-lg font-bold text-slate-900 mb-3 block">
                            <Users className="w-5 h-5 inline mr-2" />
                            {t("booking.participants")}
                        </Label>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setNumberOfPeople(Math.max(1, numberOfPeople - 1))}
                                className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-xl font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                            >
                                -
                            </button>
                            <span className="text-2xl font-bold text-slate-900 w-12 text-center">
                                {numberOfPeople}
                            </span>
                            <button
                                type="button"
                                onClick={() => setNumberOfPeople(Math.min(20, numberOfPeople + 1))}
                                className="w-12 h-12 rounded-full border-2 border-slate-200 flex items-center justify-center text-xl font-bold text-slate-600 hover:border-blue-500 hover:text-blue-600 transition-colors"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <Label htmlFor="notes" className="text-lg font-bold text-slate-900 mb-3 block">
                            {t("gallery.description")}
                        </Label>
                        <textarea
                            id="notes"
                            value={notes}
                            onChange={(e) => setNotes(e.target.value)}
                            placeholder="..."
                            rows={3}
                            className="w-full px-4 py-4 rounded-xl border border-slate-200 text-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                    </div>

                    {/* Price Summary */}
                    {!place.isFree && (
                        <div className="bg-blue-50 rounded-xl p-4">
                            <div className="flex justify-between items-center">
                                <span className="text-slate-600 font-medium">Price</span>
                                <span className="text-xl font-bold text-blue-600">{place.price}</span>
                            </div>
                        </div>
                    )}

                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                    >
                        {isLoading ? (t("booking.booking") || "Booking...") : (t("booking.book") || "Confirm Booking")}
                    </Button>
                </form>
            </div>
        </div>
    )
}
