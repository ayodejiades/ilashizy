import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { activities } from "@/lib/data"
import { Aladin } from 'next/font/google'
import { Footer } from "@/components/footer"

const aladin = Aladin({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default async function ActivitiesPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900 relative">


      {/* Header - Matching Landing Page */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className={`text-3xl brand-title text-blue-600 tracking-wider hover:opacity-80 transition-opacity ${aladin.className}`}>ILASHIZY</Link>
          <div className="hidden md:flex gap-8">
            <Link href="/dashboard" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Dashboard</Link>
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

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-16 relative z-10">
        <div className="mb-16 text-center md:text-left">
          <h1 className={`text-5xl md:text-6xl font-bold text-slate-900 mb-4 ${aladin.className}`}>Discover Activities</h1>
          <p className="text-xl text-slate-500 font-medium">
            Choose from our selection of curated beach experiences
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {activities.map((activity) => (
            <Link
              key={activity.id}
              href={`/activities/${activity.id}`}
              className="group relative block h-80"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${activity.color} rounded-[2rem] p-[2px] shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:scale-[1.02]`}>
                <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-[1.9rem] flex flex-col items-center justify-center p-6 transition-all duration-500 overflow-hidden">

                  {/* Icon Container - Slides up on hover */}
                  <div className="transform transition-all duration-500 group-hover:-translate-y-8 group-hover:scale-90 relative z-10">
                    {activity.svg ? (
                      <img
                        src={activity.svg}
                        alt={activity.title}
                        className="w-28 h-28 object-contain drop-shadow-md"
                      />
                    ) : (
                      <activity.icon className="w-20 h-20 text-slate-400 group-hover:text-blue-600 transition-colors" strokeWidth={1.5} />
                    )}
                  </div>

                  {/* Title - Slides in from bottom on hover */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 bg-white/50 backdrop-blur-sm">
                    <span className={`text-slate-900 font-bold text-2xl tracking-wide block ${aladin.className}`}>
                      {activity.title}
                    </span>
                    <span className="text-blue-600 text-sm font-bold mt-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100 uppercase tracking-widest">
                      Explore
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  )
}
