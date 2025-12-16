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

export default function UploadPhotoPage() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
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

      const { error: insertError } = await supabase.from("gallery").insert({
        author_id: user.user.id,
        title,
        description,
        image_url: imageUrl,
      })

      if (insertError) throw insertError

      router.push("/gallery")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to upload photo")
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
            <Link href="/gallery" className="text-foreground hover:text-primary">
              Gallery
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </nav>

      {/* Upload Form */}
      <section className="max-w-2xl mx-auto px-6 md:px-12 py-12">
        <Link href="/gallery" className="text-primary hover:underline mb-6 inline-block">
          ← Back to Gallery
        </Link>

        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Share Your Beach Moment</CardTitle>
            <CardDescription>
              Upload a photo from your visit to Ilashe Beach and share it with our community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="title">Photo Title</Label>
                <Input
                  id="title"
                  type="text"
                  placeholder="e.g., Golden Hour Sunset at Ilashe"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={100}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <textarea
                  id="description"
                  placeholder="Tell the story behind this photo..."
                  className="flex min-h-24 w-full rounded-md border border-border bg-background px-3 py-2 text-base text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  maxLength={500}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="image-url">Photo URL</Label>
                <Input
                  id="image-url"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                {imageUrl && (
                  <div className="rounded-md overflow-hidden h-48 bg-muted">
                    <img
                      src={imageUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={() => setError("Invalid image URL")}
                    />
                  </div>
                )}
              </div>

              {error && <p className="text-sm text-destructive">{error}</p>}

              <div className="flex gap-4">
                <Button type="submit" className="flex-1" disabled={isLoading}>
                  {isLoading ? "Uploading..." : "Upload Photo"}
                </Button>
                <Link href="/gallery" className="flex-1">
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
