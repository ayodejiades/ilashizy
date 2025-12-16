import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      {/* Header - Matching Landing Page */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-3xl brand-title text-blue-600 tracking-wider hover:opacity-80 transition-opacity font-aladin">ILASHIZY</Link>
          <div className="hidden md:flex gap-8">
            <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Home</Link>
            <Link href="/activities" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Activities</Link>
            <Link href="/about" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">About</Link>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/auth/sign-in">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 text-lg font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4 font-aladin">Get in Touch</h1>
          <p className="text-xl text-slate-500">Have questions or feedback? We'd love to hear from you!</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 font-aladin mb-2">Send us a Message</h2>
              <p className="text-slate-500">We'll respond as soon as possible</p>
            </div>
            <form className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-400 focus:ring-blue-400/20 outline-none transition-all"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-400 focus:ring-blue-400/20 outline-none transition-all"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Message</label>
                <textarea
                  className="w-full px-6 py-4 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:border-blue-400 focus:ring-blue-400/20 outline-none transition-all h-40 resize-none"
                  placeholder="Your message here..."
                />
              </div>
              <Button className="w-full bg-blue-600 text-white hover:bg-blue-700 font-bold py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                Send Message
              </Button>
            </form>
          </div>

          {/* FAQ & Info */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 font-aladin mb-6">Frequently Asked Questions</h2>
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">How do I book an activity?</h4>
                  <p className="text-slate-500 mt-1">
                    Browse the activities page and click on an activity to view details and book.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">Can I cancel my booking?</h4>
                  <p className="text-slate-500 mt-1">
                    Yes, you can cancel up to 24 hours before the activity starts.
                  </p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800 text-lg">How do I share photos?</h4>
                  <p className="text-slate-500 mt-1">
                    Visit the gallery page and click upload to share your beach photos.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-600 p-8 rounded-[2rem] shadow-xl text-white">
              <h2 className="text-2xl font-bold font-aladin mb-6">Direct Contact</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Email</p>
                  <p className="text-xl font-medium">support@ilashizzy.com</p>
                </div>
                <div>
                  <p className="text-sm font-bold opacity-80 uppercase tracking-wider">Response Time</p>
                  <p className="text-xl font-medium">Within 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
