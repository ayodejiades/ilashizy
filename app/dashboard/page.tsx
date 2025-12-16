import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profileData } = await supabase.from("profiles").select("display_name").eq("id", data.user.id).single()

  const username = profileData?.display_name || data.user.user_metadata?.display_name || data.user.email?.split("@")[0] || "User"

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      {/* Header - Matching Landing Page */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl brand-title text-blue-600 tracking-wider hover:opacity-80 transition-opacity">ILASHIZY</Link>
          <div className="hidden md:flex gap-8">
            <Link href="/activities" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Activities</Link>
            <Link href="/info" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Information</Link>
            <Link href="/profile" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Profile</Link>
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

      {/* Dashboard Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-32">
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 section-heading font-aladin">Welcome back, {username}!</h1>
          <p className="text-xl text-slate-500 font-medium">Explore activities and join the Ilashizzy community</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <Link href="/activities" className="group">
            <div className="bg-white p-8 rounded-[2rem] relative hover:shadow-xl transition-all duration-300 border border-slate-100 h-full flex flex-col justify-between group-hover:-translate-y-1">
              <div>
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-100 transition-colors">
                  <span className="text-4xl">🏄</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-aladin">Browse Activities</h3>
                <p className="text-slate-600 leading-relaxed">Discover all activities happening at Ilashe Beach</p>
              </div>
              <div className="mt-6">
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm group-hover:underline">View Activities</span>
              </div>
            </div>
          </Link>

          {/* Card 2 */}
          <Link href="/gallery" className="group">
            <div className="bg-white p-8 rounded-[2rem] relative hover:shadow-xl transition-all duration-300 border border-slate-100 h-full flex flex-col justify-between group-hover:-translate-y-1">
              <div>
                <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-purple-100 transition-colors">
                  <span className="text-4xl">📸</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-aladin">Photo Gallery</h3>
                <p className="text-slate-600 leading-relaxed">Share your beach moments with the community</p>
              </div>
              <div className="mt-6">
                <span className="text-purple-600 font-bold uppercase tracking-wider text-sm group-hover:underline">View Gallery</span>
              </div>
            </div>
          </Link>

          {/* Card 3 */}
          <Link href="/tips" className="group">
            <div className="bg-white p-8 rounded-[2rem] relative hover:shadow-xl transition-all duration-300 border border-slate-100 h-full flex flex-col justify-between group-hover:-translate-y-1">
              <div>
                <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-amber-100 transition-colors">
                  <span className="text-4xl">💡</span>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 font-aladin">Local Tips</h3>
                <p className="text-slate-600 leading-relaxed">Share and discover insider tips from locals</p>
              </div>
              <div className="mt-6">
                <span className="text-amber-600 font-bold uppercase tracking-wider text-sm group-hover:underline">View Tips</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  )
}
