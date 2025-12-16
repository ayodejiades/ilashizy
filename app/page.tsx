'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import { WeatherWidget } from "@/components/weather-widget"
import { InteractiveMap } from "@/components/interactive-map"
import { LanguageSwitcher } from "@/components/language-switcher"
import { useTranslation } from "@/lib/use-translation"
import { Footer } from "@/components/footer"
import {
  Search,
  Phone,
  LifeBuoy,
  Quote,
  Ship,
  Facebook,
  Instagram,
  Twitter
} from "lucide-react"

import { activities } from "@/lib/data"

const testimonials = [
  { id: 1, name: "Ayonifemi I.", role: "Photographer", text: "The lighting at Ilashe is unlike anywhere else. A true paradise for creatives." },
  { id: 2, name: "Matilda B.", role: "Guest", text: "Best waves in Lagos. The community vibe is what keeps me coming back every weekend." },
  { id: 3, name: "Rochelle A.", role: "Yoga Instructor", text: "Peaceful, serene, and clean. The perfect spot for morning meditation sessions." },
]

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("")
  const { t } = useTranslation()

  return (
    <main className="w-full bg-slate-50 min-h-screen flex flex-col selection:bg-cyan-300 selection:text-blue-900">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 transition-all duration-300 shadow-lg ring-1 ring-black/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <div className="text-3xl brand-title text-blue-600 tracking-wider">ILASHIZY</div>
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Home</Link>
            <Link href="/about" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">About</Link>
            <Link href="/blog" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Blog</Link>
            <Link href="/contact" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Contact</Link>
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

      {/* Hero Section */}
      <section className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/ilashe.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 via-black/20 to-blue-900/60 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-20">
          <p className="text-cyan-300 text-xl md:text-2xl font-bold tracking-[0.2em] uppercase mb-4 animate-fade-in-up drop-shadow-md">{t("home.title").split(" ").slice(0, 2).join(" ")} </p>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight drop-shadow-2xl animate-fade-in-up delay-100 section-heading">
            ILASHE BEACH
          </h1>
          <p className="text-2xl md:text-3xl text-white max-w-3xl mx-auto leading-relaxed font-semibold mb-12 animate-fade-in-up delay-200 drop-shadow-lg">
            {t("home.subtitle")}
          </p>
        </div>
      </section>

      {/* Plan Your Visit (Weather) */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        {/* Mesh Gradient Blobs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-blue-900 mb-6 section-heading">{t("home.planYourDay")}</h2>
              <p className="text-slate-600 text-xl leading-relaxed mb-8 font-medium">
                {t("home.planDesc")}
              </p>
              <div className="flex gap-6">
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
                  <p className="text-sm text-blue-500 uppercase tracking-wider font-bold mb-1">{t("home.bestTime")}</p>
                  <p className="text-2xl font-bold text-slate-800">{t("home.bestTimeValue")}</p>
                </div>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
                  <p className="text-sm text-orange-500 uppercase tracking-wider font-bold mb-1">{t("home.avgTemp")}</p>
                  <p className="text-2xl font-bold text-slate-800">{t("home.avgTempValue")}</p>
                </div>
              </div>
            </div>
            <div className="relative transform hover:scale-[1.02] transition-transform duration-500">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-[2rem] opacity-30 blur-2xl animate-pulse"></div>
              <div className="relative">
                <WeatherWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-32 bg-slate-50 relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 section-heading">{t("home.discoverActivities")}</h2>
            <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">
              {t("home.activitiesDesc")}
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
                      <span className="text-slate-900 font-bold text-2xl tracking-wide block font-aladin">
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
        </div>
      </section>

      {/* Service Provider Search Section */}
      <section className="bg-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 section-heading">{t("home.findProviders")}</h2>
            <p className="text-slate-500 text-xl font-medium">{t("home.findProvidersDesc")}</p>
          </div>
          <div className="max-w-2xl mx-auto relative">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full opacity-50 blur-md group-hover:opacity-100 transition duration-500"></div>
              <div className="relative bg-white rounded-full flex items-center">
                <Search className="absolute left-6 text-slate-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder={t("home.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-8 border-none rounded-full text-xl text-slate-800 placeholder-slate-400 focus:ring-0 bg-transparent shadow-none"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 section-heading">{t("home.communityStories")}</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <div key={t.id} className="bg-white p-8 rounded-[2rem] relative hover:shadow-xl transition-all duration-300 border border-slate-100 group">
                <Quote className="w-12 h-12 text-blue-100 absolute top-6 left-6 group-hover:text-blue-200 transition-colors" />
                <p className="text-slate-600 text-lg leading-relaxed mb-8 relative z-10 pt-6 font-medium">"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{t.name}</p>
                    <p className="text-sm text-blue-500 font-bold uppercase tracking-wider">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location / Map */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/noise.png')] opacity-5"></div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-8 section-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">{t("home.findYourWay")}</h2>
              <p className="text-slate-300 text-xl mb-10 leading-relaxed">
                {t("home.locationDesc")}
              </p>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-2">
                    <Ship className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2">{t("home.boatAccess")}</h3>
                    <p className="text-slate-400 text-lg">{t("home.boatAccessDesc")}</p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-2">
                    <LifeBuoy className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2">{t("home.safeSecure")}</h3>
                    <p className="text-slate-400 text-lg">{t("home.safeSecureDesc")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-slate-800 transform rotate-2 hover:rotate-0 transition-transform duration-500">
              <InteractiveMap />
            </div>
          </div>
        </div>
      </section>

      {/* Community Join Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 py-32 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-cyan-400 rounded-full blur-[128px] opacity-50"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-400 rounded-full blur-[128px] opacity-50"></div>

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 section-heading drop-shadow-lg">{t("home.joinOurCommunity")}</h2>
          <p className="text-blue-100 text-2xl mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            {t("home.communityDesc")}
          </p>
          <Link href="/auth/sign-up">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 text-xl font-bold rounded-full shadow-[0_0_40px_rgba(255,255,255,0.4)] hover:shadow-[0_0_60px_rgba(255,255,255,0.6)] hover:-translate-y-1 transition-all border-4 border-transparent hover:border-blue-200">
              {t("home.getStarted")}
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  )
}
