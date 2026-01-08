import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { Star, Plus } from "lucide-react"

export default async function ReviewsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch reviews with ratings
  const { data: reviews = [] } = await supabase
    .from("reviews")
    .select("*, reviewer_id, activity_id")
    .order("created_at", { ascending: false })

  const averageRating =
    reviews.length > 0 ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1) : "0"

  return (
    <main className="w-full bg-slate-50 min-h-screen flex flex-col selection:bg-cyan-300 selection:text-blue-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 transition-all duration-300 shadow-lg ring-1 ring-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl brand-title text-blue-600 tracking-wider">ILASHIZY</Link>
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Home</Link>
            <Link href="/activities" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Activities</Link>
            <Link href="/dashboard" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Dashboard</Link>
          </div>
          <div className="flex items-center gap-3">
            <form action="/api/auth/logout" method="POST">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-2 text-lg font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-40 pb-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 font-aladin">Community Reviews</h1>
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-8 h-8 ${star <= Math.floor(Number(averageRating))
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-slate-300"
                        }`}
                    />
                  ))}
                </div>
                <p className="text-3xl font-bold text-slate-900">{averageRating}</p>
                <p className="text-slate-500 font-medium">({reviews.length} reviews)</p>
              </div>
            </div>
            <Link href="/reviews/new">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 flex items-center gap-2">
                <Plus className="w-5 h-5" />
                Write a Review
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Reviews List */}
      <section className="py-16 flex-1">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          {reviews.length > 0 ? (
            <div className="space-y-6">
              {reviews.map((review: any) => (
                <div
                  key={review.id}
                  className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-6 h-6 ${star <= review.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-slate-300"
                            }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-slate-500 font-medium">
                      {new Date(review.created_at).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                    </span>
                  </div>
                  <p className="text-lg text-slate-700 leading-relaxed mb-4">{review.comment}</p>
                  {review.activity_id && (
                    <Link
                      href={`/activities/${review.activity_id}`}
                      className="inline-block bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold hover:bg-blue-100 transition-colors"
                    >
                      {review.activity_id}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
              <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="w-12 h-12 text-slate-300" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2 font-aladin">No reviews yet</h3>
              <p className="text-slate-500 mb-8">Be the first to share your experience!</p>
              <Link href="/reviews/new">
                <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Write the First Review
                </Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  )
}
