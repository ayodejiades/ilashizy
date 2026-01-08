'use client'

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/lib/use-translation"
import { createClient } from "@/lib/supabase/client"
import { activities } from "@/lib/data"
import { Star, ArrowLeft } from "lucide-react"

export default function NewReviewPage() {
    const [rating, setRating] = useState(0)
    const [hoveredRating, setHoveredRating] = useState(0)
    const [comment, setComment] = useState("")
    const [activityId, setActivityId] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const { t } = useTranslation()
    const router = useRouter()
    const supabase = createClient()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (rating === 0) {
            setError("Please select a rating")
            return
        }

        setIsLoading(true)
        setError(null)

        try {
            const { data: user } = await supabase.auth.getUser()
            if (!user.user) {
                router.push("/auth/login")
                return
            }

            const { error: insertError } = await supabase.from("reviews").insert({
                reviewer_id: user.user.id,
                activity_id: activityId || null,
                rating,
                comment,
            })

            if (insertError) throw insertError

            router.push("/reviews")
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to submit review")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <main className="w-full bg-slate-50 min-h-screen flex flex-col selection:bg-cyan-300 selection:text-blue-900">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 transition-all duration-300 shadow-lg ring-1 ring-black/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
                    <Link href="/" className="text-3xl brand-title text-blue-600 tracking-wider">ILASHIZY</Link>
                    <div className="hidden md:flex gap-8">
                        <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Home</Link>
                        <Link href="/activities" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Activities</Link>
                        <Link href="/reviews" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Reviews</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        <Link href="/auth/login">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-2 text-lg font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none">
                                {t("nav.signIn")}
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Form Section */}
            <section className="pt-40 pb-16 flex-1">
                <div className="max-w-2xl mx-auto px-6 md:px-12">
                    <Link
                        href="/reviews"
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold mb-8 transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back to Reviews
                    </Link>

                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-xl border border-slate-100">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4 font-aladin">Share Your Experience</h1>
                        <p className="text-slate-500 text-lg mb-8">
                            Help others discover the best of Ilashe Beach
                        </p>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            {/* Rating */}
                            <div>
                                <Label className="text-lg font-bold text-slate-900 mb-4 block">Your Rating</Label>
                                <div className="flex gap-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoveredRating(star)}
                                            onMouseLeave={() => setHoveredRating(0)}
                                            className="p-1 transition-transform hover:scale-110"
                                        >
                                            <Star
                                                className={`w-10 h-10 transition-colors ${star <= (hoveredRating || rating)
                                                        ? "fill-yellow-400 text-yellow-400"
                                                        : "text-slate-300"
                                                    }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Activity Selection */}
                            <div>
                                <Label htmlFor="activity" className="text-lg font-bold text-slate-900 mb-4 block">
                                    Activity (Optional)
                                </Label>
                                <select
                                    id="activity"
                                    value={activityId}
                                    onChange={(e) => setActivityId(e.target.value)}
                                    className="w-full px-4 py-4 rounded-2xl border border-slate-200 text-slate-800 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50"
                                >
                                    <option value="">Select an activity...</option>
                                    {activities.map((activity) => (
                                        <option key={activity.id} value={activity.id}>
                                            {activity.title}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Comment */}
                            <div>
                                <Label htmlFor="comment" className="text-lg font-bold text-slate-900 mb-4 block">
                                    Your Review
                                </Label>
                                <textarea
                                    id="comment"
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    placeholder="Tell us about your experience at Ilashe Beach..."
                                    required
                                    rows={5}
                                    className="w-full px-4 py-4 rounded-2xl border border-slate-200 text-slate-800 text-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-slate-50 resize-none"
                                />
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 px-4 py-3 rounded-xl font-medium">
                                    {error}
                                </div>
                            )}

                            <div className="flex gap-4 pt-4">
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="flex-1 bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
                                >
                                    {isLoading ? "Submitting..." : "Submit Review"}
                                </Button>
                                <Link href="/reviews" className="flex-1">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="w-full py-6 text-lg font-bold rounded-full border-2 border-slate-200 text-slate-700 hover:bg-slate-50"
                                    >
                                        Cancel
                                    </Button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
