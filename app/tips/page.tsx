import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export default async function TipsPage() {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch tips
  const { data: tips = [] } = await supabase
    .from("tips")
    .select(`
      *,
      profiles(display_name)
    `)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      {/* Header - Matching Landing Page */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl brand-title text-blue-600 tracking-wider hover:opacity-80 transition-opacity font-aladin">ILASHIZY</Link>
          <div className="hidden md:flex gap-8">
            <Link href="/activities" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Activities</Link>
            <Link href="/gallery" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Gallery</Link>
            <Link href="/dashboard" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Dashboard</Link>
          </div>
          <div className="flex items-center gap-3">
            <form action="/api/auth/logout" method="POST">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 text-lg font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Tips Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pt-40 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4 font-aladin">Local Tips & Advice</h1>
            <p className="text-xl text-slate-500 font-medium">Insider knowledge from our community about Ilashe Beach</p>
          </div>
          <Link href="/tips/new">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Share a Tip</Button>
          </Link>
        </div>

        {tips.length > 0 ? (
          <div className="space-y-6">
            {tips.map((tip: any) => (
              <div key={tip.id} className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-slate-900 mb-2 font-aladin">{tip.title}</h3>
                    <p className="text-slate-500 font-medium">
                      Shared by {tip.profiles?.display_name || "Anonymous"}
                    </p>
                  </div>
                  {tip.category && (
                    <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap ml-4 border border-blue-100">
                      {tip.category}
                    </span>
                  )}
                </div>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">{tip.content}</p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                  <span className="text-sm font-bold text-slate-400 flex items-center gap-1">
                    <span className="text-red-500">❤️</span> {tip.likes_count || 0} people found this helpful
                  </span>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-bold">
                    Helpful
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">💡</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-aladin">No tips yet</h3>
            <p className="text-slate-500 mb-8">Share your local knowledge with the community!</p>
            <Link href="/tips/new">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Share Your First Tip</Button>
            </Link>
          </div>
        )}
      </section>
    </main>
  )
}
