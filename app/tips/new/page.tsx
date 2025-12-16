"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"

const CATEGORIES = [
  "Safety",
  "Best Time to Visit",
  "Photography",
  "Food & Dining",
  "Parking",
  "Weather",
  "Hidden Gems",
  "Activities",
  "Wildlife",
  "Other",
]

export default function NewTipPage() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [category, setCategory] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClient()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data: user } = await supabase.auth.getUser()
      if (!user.user) throw new Error("Not authenticated")

      const { error: insertError } = await supabase.from("tips").insert({
        author_id: user.user.id,
        title,
        content,
        category,
      })

      if (insertError) throw insertError

      router.push("/tips")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to share tip")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            🏖️ Ilashizzy
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/tips" className="text-foreground hover:text-primary">
              Tips
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </nav>

      {/* New Tip Form */}
      <section className="max-w-2xl mx-auto px-6 md:px-12 py-12">
        <Link href="/tips" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Tips
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Share Local Knowledge</CardTitle>
            <CardDescription>Help the community by sharing your insider tips about Ilashe Beach</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Tip Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Best Time to Avoid Crowds"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category">Category</Label>
                <select
                  id="category"
                  className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category...</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="content">Your Tip</Label>
                <textarea
                  id="content"
                  placeholder="Share your helpful tip or advice..."
                  className="flex min-h-32 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={1000}
                />
                <p className="text-sm text-muted-foreground text-right">{content.length}/1000</p>
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Sharing..." : "Share Tip"}
                </Button>
                <Link href="/tips" className="flex-1">
                  <Button type="button" variant="outline" className="w-full bg-transparent">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
