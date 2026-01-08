import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { TrendingUp, Users, Sparkles } from "lucide-react"

export default function PartnersPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      {/* Navigation */}
      <Header />

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">Partner With Us</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Grow your business by partnering with Ilashizzy and reaching our community of beach enthusiasts
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-card py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Why Partner With Ilashizzy?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><TrendingUp className="w-6 h-6 text-green-500" /> Grow Your Business</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Reach thousands of potential customers actively seeking beach activities and services.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><Users className="w-6 h-6 text-blue-500" /> Community Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Join a supportive network of local businesses and service providers serving the beach community.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-2xl flex items-center gap-2"><Sparkles className="w-6 h-6 text-yellow-500" /> Visibility</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get featured on our platform with opportunities to showcase your services and build reviews.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">How It Works</h2>
        <div className="space-y-6">
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground text-lg font-bold">
                1
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Sign Up</h3>
              <p className="text-muted-foreground">Create a business account on Ilashizzy</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground text-lg font-bold">
                2
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">List Your Services</h3>
              <p className="text-muted-foreground">Add your activities, rates, and availability</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-primary text-primary-foreground text-lg font-bold">
                3
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Connect With Customers</h3>
              <p className="text-muted-foreground">Receive bookings and manage your calendar</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 to-accent/10 py-24">
        <div className="max-w-4xl mx-auto px-6 md:px-12 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-6">Ready to Get Started?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Join the Ilashizzy community and grow your business today
          </p>
          <Link href="/provider/dashboard">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-6 text-lg">
              Become a Partner
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center text-muted-foreground">
          <p>&copy; 2025 Ilashizzy. Partnership opportunities for your beach business.</p>
        </div>
      </footer>
    </main>
  )
}
