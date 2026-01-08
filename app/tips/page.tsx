"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useTranslation } from "@/lib/use-translation"

export default function TipsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [tips, setTips] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) {
        router.push("/auth/login")
        return
      }

      const { data: tipsData } = await supabase
        .from("tips")
        .select(`
          *,
          profiles(display_name)
        `)
        .order("created_at", { ascending: false })

      setTips(tipsData || [])
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
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      <Header />

      {/* Tips Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pt-40 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4 font-aladin">{t("tips.title")}</h1>
            <p className="text-xl text-slate-500 font-medium">{t("tips.subtitle")}</p>
          </div>
          <Link href="/tips/new">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              {t("tips.shareTip")}
            </Button>
          </Link>
        </div>

        {tips.length > 0 ? (
          <div className="space-y-6">
            {tips.map((tip: any) => (
              <div key={tip.id} className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 hover:-translate-y-1 transition-all duration-300">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-slate-900 mb-2 font-aladin">{tip.title}</h2>
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
                    <span className="text-blue-500">Helpful:</span> {tip.likes_count || 0} people found this helpful
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
              <span className="text-3xl text-slate-400">📝</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-aladin">{t("tips.noTips")}</h3>
            <p className="text-slate-500 mb-8">{t("tips.shareFirst")}</p>
            <Link href="/tips/new">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                {t("tips.shareTip")}
              </Button>
            </Link>
          </div>
        )}
      </section>

      <Footer />
    </main>
  )
}
