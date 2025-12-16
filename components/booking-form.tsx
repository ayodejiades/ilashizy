"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

export default function BookingForm({ activityId }: { activityId: string }) {
  const [date, setDate] = useState("")
  const [participants, setParticipants] = useState("1")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error("Not authenticated")

      const { error: insertError } = await supabase.from("bookings").insert({
        activity_id: activityId,
        user_id: user.user.id,
        date,
        participants: Number.parseInt(participants),
        status: "pending",
      })

      if (insertError) throw insertError

      setSuccess(true)
      setTimeout(() => {
        router.refresh()
      }, 2000)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to book activity")
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg text-center">
        <p className="text-green-700 dark:text-green-400 font-semibold">Booking confirmed! ✓</p>
        <p className="text-sm text-green-600 dark:text-green-500 mt-1">Check your dashboard for details</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid gap-2">
        <Label htmlFor="date">Activity Date</Label>
        <Input
          id="date"
          type="date"
          required
          value={date}
          onChange={(e) => setDate(e.target.value)}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="participants">Number of Participants</Label>
        <Input
          id="participants"
          type="number"
          min="1"
          max="10"
          required
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
      </div>
      {error && <p className="text-sm text-destructive">{error}</p>}
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Booking..." : "Book Activity"}
      </Button>
    </form>
  )
}
