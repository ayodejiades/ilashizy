import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export default async function ReviewsPage() {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch reviews with ratings
  const { data: reviews = [] } = await supabase
    .from("reviews")
    .select("*, reviewer_id, activity_id")
    .order("created_at", { ascending: false })

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : 0

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            🏖️ Ilashizzy
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/activities" className="text-foreground hover:text-primary">
              Activities
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </nav>

      {/* Reviews Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Community Reviews</h1>
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(Number(averageRating)) ? "text-2xl" : "text-2xl opacity-30"}>
                  ⭐
                </span>
              ))}
            </div>
            <p className="text-2xl font-bold text-foreground">{averageRating} / 5.0</p>
            <p className="text-muted-foreground">({reviews.length} reviews)</p>
          </div>
        </div>

        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < review.rating ? "text-lg" : "text-lg opacity-30"}>
                          ⭐
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <CardTitle className="text-lg">Visitor Experience</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground mb-2">{review.comment}</p>
                  <p className="text-sm text-muted-foreground">Activity ID: {review.activity_id}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-muted-foreground mb-4">No reviews yet.</p>
              <p className="text-sm text-muted-foreground">Be the first to share your experience!</p>
            </CardContent>
          </Card>
        )}
      </section>
    </main>
  )
}
