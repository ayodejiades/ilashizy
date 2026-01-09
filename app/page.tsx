"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { WeatherWidget } from "@/components/weather-widget";
import { InteractiveMap } from "@/components/interactive-map";
import { LanguageSwitcher } from "@/components/language-switcher";
import { useTranslation } from "@/lib/use-translation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { getOrCreateAnonymousGuest } from "@/lib/anonymous-guest";
import {
  Search,
  Phone,
  LifeBuoy,
  Quote,
  Ship,
  Facebook,
  Instagram,
  Twitter,
  ArrowRight,
} from "lucide-react";

import { useRouter } from "next/navigation";
import { activities } from "@/lib/data";

const testimonials = [
  {
    id: 1,
    name: "Ayonifemi I.",
    role: "Photographer",
    text: "The lighting at Ilashe is unlike anywhere else. A true paradise for creatives.",
  },
  {
    id: 2,
    name: "Matilda B.",
    role: "Guest",
    text: "Best waves in Lagos. The community vibe is what keeps me coming back every weekend.",
  },
  {
    id: 3,
    name: "Rochelle A.",
    role: "Yoga Instructor",
    text: "Peaceful, serene, and clean. The perfect spot for morning meditation sessions.",
  },
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const { t } = useTranslation();
  const router = useRouter();

  // Initialize anonymous guest session on page load
  useEffect(() => {
    getOrCreateAnonymousGuest().catch(console.error);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <main className="w-full bg-slate-50 min-h-screen flex flex-col selection:bg-cyan-300 selection:text-blue-900">
      {/* Header */}
      <Header />

      {/* Asymmetrical Hero Section */}
      <section className="relative h-screen min-h-[800px] flex items-end pb-24 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/ilashe.jpg')" }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent"></div>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full">
          <div className="max-w-4xl">
            <p className="text-sand-300 text-lg md:text-xl font-bold tracking-[0.3em] uppercase mb-6 animate-fade-in-up">
              {t("home.title").split(" ").slice(0, 2).join(" ")}
            </p>
            <h1 className="text-8xl md:text-[10rem] leading-[0.8] font-bold text-white mb-8 tracking-tighter animate-fade-in-up delay-100 font-aladin">
              ILASHE
              <br />
              BEACH
            </h1>
            <p className="text-xl md:text-2xl text-slate-200 max-w-xl leading-relaxed font-light mb-12 animate-fade-in-up delay-200 border-l-4 border-blue-500 pl-6">
              {t("home.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Plan Your Visit (Weather) */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-5xl font-bold text-blue-900 mb-6 section-heading">
                {t("home.planYourDay")}
              </h2>
              <p className="text-slate-600 text-xl leading-relaxed mb-8 font-medium">
                {t("home.planDesc")}
              </p>
              <div className="flex gap-6">
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
                  <p className="text-sm text-blue-500 uppercase tracking-wider font-bold mb-1">
                    {t("home.bestTime")}
                  </p>
                  <p className="text-2xl font-bold text-slate-800">
                    {t("home.bestTimeValue")}
                  </p>
                </div>
                <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white/50 shadow-sm">
                  <p className="text-sm text-orange-500 uppercase tracking-wider font-bold mb-1">
                    {t("home.avgTemp")}
                  </p>
                  <p className="text-2xl font-bold text-slate-800">
                    {t("home.avgTempValue")}
                  </p>
                </div>
              </div>
            </div>
            <div className="relative transform hover:scale-[1.02] transition-transform duration-500">
              <div className="relative">
                <WeatherWidget />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section - Masonry Grid */}
      <section id="activities" className="py-32 relative bg-adire">
        <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 font-aladin">
                {t("home.discoverActivities")}
              </h2>
              <p className="text-slate-500 text-xl font-light">
                {t("home.activitiesDesc")}
              </p>
            </div>
            <Link href="/activities">
              <Button
                variant="outline"
                className="rounded-full px-8 py-6 text-lg hover:bg-slate-900 hover:text-white transition-all"
              >
                {t("home.exploreActivities")}
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {activities.map((activity) => (
              <Link
                key={activity.id}
                href={`/activities/${activity.id}`}
                className="group relative block aspect-[4/5] rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${activity.color} p-[2px]`}
                >
                  <div className="absolute inset-0 bg-white flex flex-col items-center justify-center p-6 text-center group-hover:bg-white/95 transition-colors">
                    <div className="w-3/5 h-3/5 mb-4 transform group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
                      {activity.svg ? (
                        <img
                          src={activity.svg}
                          alt={activity.title}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <activity.icon
                          className="w-full h-full text-slate-800"
                          strokeWidth={1}
                        />
                      )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out z-20 bg-white/50 backdrop-blur-sm">
                      <span className="text-slate-900 font-bold text-2xl tracking-wide block">
                        {t(`activity.${activity.id}` as any)}
                      </span>
                      <span className="text-blue-600 text-sm font-bold mt-2 block opacity-0 group-hover:opacity-100 transition-opacity delay-100 uppercase tracking-widest">
                        {t("activities.viewActivities")}
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
            <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 section-heading">
              {t("home.findProviders")}
            </h2>
            <p className="text-slate-500 text-xl font-medium">
              {t("home.findProvidersDesc")}
            </p>
          </div>
          <div className="max-w-2xl mx-auto relative">
            <form onSubmit={handleSearch} className="relative group">
              <div className="relative bg-white rounded-full flex items-center border border-slate-200 shadow-sm focus-within:shadow-md transition-shadow">
                <Search className="absolute left-6 text-slate-400 w-6 h-6" />
                <Input
                  type="text"
                  placeholder={t("home.searchPlaceholder")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-16 pr-6 py-8 border-none rounded-full text-xl text-slate-800 placeholder-slate-400 focus:ring-0 bg-transparent shadow-none"
                />
              </div>
              <button type="submit" className="sr-only">
                Search
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 relative bg-adire border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 section-heading">
              {t("home.communityStories")}
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((t, index) => (
              <div
                key={t.id}
                className={`bg-white p-8 rounded-[2rem] relative hover:shadow-xl transition-all duration-300 border border-slate-100 group ${
                  index === 1
                    ? "md:-translate-y-12"
                    : index === 2
                    ? "md:translate-y-12"
                    : ""
                }`}
              >
                <p className="text-slate-600 text-lg leading-relaxed mb-8 relative z-10 pt-6 font-medium">
                  "{t.text}"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-md">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 text-lg">{t.name}</p>
                    <p className="text-sm text-blue-500 font-bold uppercase tracking-wider">
                      {t.role}
                    </p>
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
              <h2 className="text-5xl font-bold mb-8 section-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                {t("home.findYourWay")}
              </h2>
              <p className="text-slate-300 text-xl mb-10 leading-relaxed">
                {t("home.locationDesc")}
              </p>
              <div className="space-y-8">
                <div className="flex items-start gap-6">
                  <div className="p-2">
                    <Ship className="w-10 h-10 text-white" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2">
                      {t("home.boatAccess")}
                    </h3>
                    <p className="text-slate-400 text-lg">
                      {t("home.boatAccessDesc")}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-6">
                  <div className="p-2">
                    <LifeBuoy
                      className="w-10 h-10 text-white"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl mb-2">
                      {t("home.safeSecure")}
                    </h3>
                    <p className="text-slate-400 text-lg">
                      {t("home.safeSecureDesc")}
                    </p>
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

        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 section-heading drop-shadow-lg">
            Start Exploring
          </h2>
          <p className="text-blue-100 text-2xl mb-12 leading-relaxed font-medium max-w-3xl mx-auto">
            No account needed! Browse activities, make bookings, and discover
            everything Ilashe Beach has to offer.
          </p>
          <Link href="/activities">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:-translate-y-1 transition-all border-4 border-transparent hover:border-blue-200">
              Explore Activities
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
