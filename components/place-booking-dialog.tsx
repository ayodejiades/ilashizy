"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import type { Place } from "@/lib/data"

interface PlaceBookingDialogProps {
    place: Place
    activityId: string
    activityTitle: string
}

export function PlaceBookingDialog({ place, activityId, activityTitle }: PlaceBookingDialogProps) {
    const [open, setOpen] = useState(false)
    const [date, setDate] = useState<Date>()
    const [numberOfPeople, setNumberOfPeople] = useState(1)
    const [notes, setNotes] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!date) {
            setError("Please select a date")
            return
        }

        setIsSubmitting(true)
        setError(null)

        try {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()

            if (!user) {
                setError("You must be logged in to make a booking")
                setIsSubmitting(false)
                return
            }

            const { error: insertError } = await supabase
                .from("place_bookings")
                .insert({
                    user_id: user.id,
                    place_id: place.id,
                    activity_id: activityId,
                    booking_date: format(date, "yyyy-MM-dd"),
                    number_of_people: numberOfPeople,
                    notes: notes || null,
                    status: "pending",
                })

            if (insertError) {
                console.error("Booking error:", insertError)
                throw insertError
            }

            setSuccess(true)
            setTimeout(() => {
                setOpen(false)
                setSuccess(false)
                setDate(undefined)
                setNumberOfPeople(1)
                setNotes("")
            }, 2000)
        } catch (err) {
            console.error("Full error:", err)
            const errorMessage = err instanceof Error ? err.message : "Failed to create booking"
            setError(`Error: ${errorMessage}. Please check the browser console for details.`)
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="w-full rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors font-bold py-6">
                    {place.isFree ? "Reserve Spot" : "Book Now"}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">Book {place.name}</DialogTitle>
                    <DialogDescription>
                        Reserve your spot for {activityTitle} at {place.name}
                    </DialogDescription>
                </DialogHeader>

                {success ? (
                    <div className="py-8 text-center">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-3xl">✓</span>
                        </div>
                        <h3 className="text-xl font-bold text-green-600 mb-2">Booking Confirmed!</h3>
                        <p className="text-slate-600">Check your dashboard to view your booking details.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="date">Booking Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !date && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={date}
                                        onSelect={setDate}
                                        disabled={(date) => date < new Date()}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="people">Number of People *</Label>
                            <Input
                                id="people"
                                type="number"
                                min="1"
                                max="20"
                                value={numberOfPeople}
                                onChange={(e) => setNumberOfPeople(parseInt(e.target.value) || 1)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="notes">Special Requests (Optional)</Label>
                            <Textarea
                                id="notes"
                                placeholder="Any special requirements or notes..."
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                rows={3}
                            />
                        </div>

                        <div className="bg-slate-50 p-4 rounded-lg space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Location:</span>
                                <span className="font-medium">{place.location}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Opening Hours:</span>
                                <span className="font-medium">{place.openingTime}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Price:</span>
                                <span className="font-bold text-blue-600">
                                    {place.isFree ? "Free" : place.price}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-slate-600">Contact:</span>
                                <span className="font-medium">{place.contact}</span>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? "Creating Booking..." : "Confirm Booking"}
                        </Button>
                    </form>
                )}
            </DialogContent>
        </Dialog>
    )
}
