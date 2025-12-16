import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { WeatherWidget } from "@/components/weather-widget"
import { InteractiveMap } from "@/components/interactive-map"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function InfoPage() {
  const supabase = await createClient()
  const { data: user } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            🏖️ Ilashizzy
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/activities" className="text-foreground hover:text-primary">
              Activities
            </Link>
            <Link href="/gallery" className="text-foreground hover:text-primary">
              Gallery
            </Link>
            <Link href="/dashboard" className="text-foreground hover:text-primary">
              Dashboard
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </nav>

      {/* Info Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Ilashe Beach Information</h1>
          <p className="text-xl text-muted-foreground">Everything you need to know about visiting Ilashe Beach</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">About Ilashe Beach</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-base text-muted-foreground leading-relaxed">
                  Ilashe Beach is a vibrant coastal destination located in Lagos, Nigeria. Known for its pristine sandy
                  shores, consistent waves, and welcoming community, it's the perfect spot for surfers, photographers,
                  and beach enthusiasts of all levels.
                </p>
                <p className="text-base text-muted-foreground leading-relaxed">
                  Whether you're looking for water sports, relaxation, or cultural experiences, Ilashe offers something
                  for everyone. Our community is dedicated to preserving the beach's natural beauty while sharing the
                  best it has to offer.
                </p>
              </CardContent>
            </Card>

            {/* Getting There */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Getting There</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">By Car</h3>
                  <p className="text-muted-foreground">
                    Ilashe Beach is accessible by road from Lagos mainland. Ample parking is available near the beach
                    entrance. Drive time from Lekki is approximately 30-45 minutes depending on traffic.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">By Taxi/Ride-Share</h3>
                  <p className="text-muted-foreground">
                    Use ride-sharing apps to reach the beach. Share your destination as "Ilashe Beach" for easy
                    navigation.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Public Transportation</h3>
                  <p className="text-muted-foreground">
                    Local buses serve the Ilashe area. Check with locals for the most convenient routes and stops.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Best Time to Visit */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Best Time to Visit</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Dry Season (October - March)</h3>
                  <p className="text-muted-foreground">
                    The ideal time for beach activities with sunny skies and calm weather. Perfect for photography and
                    water sports.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Wet Season (April - September)</h3>
                  <p className="text-muted-foreground">
                    Expect occasional rain but fewer crowds. Great waves for experienced surfers. Bring rain gear and
                    plan accordingly.
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Safety Tips</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span>Always swim in designated areas and respect lifeguard instructions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span>Apply sunscreen regularly and wear protective clothing</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span>Stay hydrated throughout your beach visit</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span>Keep your belongings secure and avoid leaving valuables unattended</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-primary">✓</span>
                    <span>Be aware of weather conditions and strong currents</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <WeatherWidget />
            <InteractiveMap />
          </div>
        </div>
      </section>
    </main>
  )
}
