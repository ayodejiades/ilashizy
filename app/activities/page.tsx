"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { activities as staticActivities } from "@/lib/data"
import { Aladin } from 'next/font/google'
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { Waves, Ship, Camera, Fish, Footprints, Utensils, Flower2, Anchor, LifeBuoy } from "lucide-react"
import { useTranslation } from "@/lib/use-translation"

const aladin = Aladin({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

const ICON_MAP: Record<string, any> = {
  Waves, Ship, Camera, Fish, Footprints, Utensils, Flower2, Anchor, LifeBuoy
}

export default function ActivitiesPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const supabase = createClient()
  const [displayActivities, setDisplayActivities] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: dbActivities } = await supabase
        .from("activities")
        .select("*")

      const mapped = dbActivities && dbActivities.length > 0
        ? dbActivities
        : staticActivities.map(a => ({ ...a, icon: a.icon.name || 'Waves' }))

      setDisplayActivities(mapped)
      setLoading(false)
    }
    fetchData()
  }, [supabase, router])

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900 relative">
      <Header />

      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-16 relative z-10">
        <div className="mb-16 text-center md:text-left">
          <h1 className={`text-5xl md:text-6xl font-bold text-slate-900 mb-4 ${aladin.className}`}>
            {t("activities.title")}
          </h1>
          <p className="text-xl text-slate-500 font-medium">
            {t("activities.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {displayActivities.map((activity: any) => {
            const IconComponent = ICON_MAP[activity.icon] || Waves

            return (
              <Link
                key={activity.id}
                href={`/activities/${activity.id}`}
                className="group relative block h-80"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${activity.color || 'from-blue-400 to-cyan-500'} rounded-[2rem] p-[2px] shadow-lg transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 group-hover:scale-[1.02]`}>
                  <div className="absolute inset-0 bg-white/90 backdrop-blur-xl rounded-[1.9rem] flex flex-col items-center justify-center p-6 transition-all duration-500 overflow-hidden">
                    <div className="transform transition-all duration-500 group-hover:-translate-y-8 group-hover:scale-90 relative z-10">
                      {activity.svg ? (
                        <img
                          src={activity.svg}
                          alt={activity.title}
                          className="w-28 h-28 object-contain drop-shadow-md"
                        />
                      ) : (
                        <IconComponent className="w-20 h-20 text-slate-400 group-hover:text-blue-600 transition-colors" strokeWidth={1.5} />
                      )}
                    </div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 bg-white/50 backdrop-blur-sm">
                      <span className={`text-slate-900 font-bold text-2xl tracking-wide block ${aladin.className}`}>
                        {t(`activity.${activity.id}` as any)}
                      </span>
                      <span className="text-blue-600 text-sm font-bold mt-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100 uppercase tracking-widest">
                        {t("activities.viewActivities")}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
      <Footer />
    </main>
  )
}
