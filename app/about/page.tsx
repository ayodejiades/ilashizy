import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-24 text-center">
        <div className="mb-16">
          <h1 className="text-6xl md:text-7xl font-bold text-slate-900 mb-6 font-aladin">About Ilashe Beach</h1>
          <p className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
            A vibrant community dedicated to celebrating and preserving the natural beauty of Ilashe Beach
          </p>
        </div>
      </section>

      {/* History Section */}
      <section className="bg-white py-24 border-y border-slate-100">
        <div className="max-w-4xl mx-auto px-6 md:px-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 font-aladin text-center">Our History</h2>
          <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
            <p>
              Ilashe Beach has been a cherished destination for locals and tourists for generations. Its pristine white
              sands, clear waters, and breathtaking sunsets make it one of the most beautiful beaches in the region.
            </p>
            <p>
              Ilashizzy was created to celebrate this natural wonder and connect a community of beach lovers. We believe
              in the power of shared experiences and local knowledge to enhance everyone's beach experience.
            </p>
            <p>
              Through Ilashizzy, we're building a platform where visitors and locals can discover activities, share
              moments, exchange tips, and create lasting memories together.
            </p>
          </div>
        </div>
      </section>

      {/* Why Visit Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center font-aladin">Why Visit Ilashe Beach?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-4xl text-orange-500">Sunset</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-aladin">Natural Beauty</h3>
            <p className="text-slate-600 leading-relaxed">
              Experience pristine sandy shores, crystal clear waters, and stunning sunsets that paint the sky in
              golden hues.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-4xl text-blue-500">Community</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-aladin">Vibrant Community</h3>
            <p className="text-slate-600 leading-relaxed">
              Meet locals and visitors from around the world who share a passion for beach life and outdoor
              adventures.
            </p>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 hover:-translate-y-1 transition-transform duration-300">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mb-6">
              <span className="text-4xl text-green-500">Activities</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-aladin">Diverse Activities</h3>
            <p className="text-slate-600 leading-relaxed">
              From water sports to peaceful walks, photography to picnics, there's something for everyone at Ilashe.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-24 text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-4xl font-bold mb-6 font-aladin">Ready to Explore?</h2>
          <p className="text-xl mb-10 opacity-90">
            Join our community and discover the magic of Ilashe Beach
          </p>
          <Link href="/auth/sign-up">
            <Button className="bg-white text-blue-600 hover:bg-blue-50 px-10 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 border-none">
              Join Now
            </Button>
          </Link>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </main>
  )
}
