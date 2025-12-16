import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]
const PEAK_SEASONS = [
  { month: "December", reason: "Holiday season, perfect weather" },
  { month: "January", reason: "New Year festivities" },
  { month: "July", reason: "Summer vacation peak" },
  { month: "August", reason: "Extended summer period" },
]

export default async function CalendarPage() {
  const supabase = await createClient()

  // Fetch calendar events
  const { data: events = [] } = await supabase
    .from("activity_calendar")
    .select("*")
    .order("event_date", { ascending: true })

  const currentDate = new Date()

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
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </nav>

      {/* Calendar Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">Activity Calendar</h1>
          <p className="text-xl text-muted-foreground">Seasonal events and peak times at Ilashe Beach</p>
        </div>

        {/* Peak Seasons */}
        <Card className="mb-12 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-950 dark:to-orange-950 border-yellow-200 dark:border-yellow-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span className="text-2xl">🏆</span> Peak Seasons
            </CardTitle>
            <CardDescription>Best times to visit Ilashe Beach</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {PEAK_SEASONS.map((season) => (
                <div key={season.month} className="p-4 bg-white dark:bg-slate-900 rounded-lg border border-border">
                  <h4 className="font-bold text-foreground mb-1">{season.month}</h4>
                  <p className="text-sm text-muted-foreground">{season.reason}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>{events.length} events scheduled</CardDescription>
          </CardHeader>
          <CardContent>
            {events.length > 0 ? (
              <div className="space-y-4">
                {events.map((event) => (
                  <div key={event.id} className="flex items-start justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-bold text-foreground mb-1">{event.event_name}</h4>
                      <p className="text-sm text-muted-foreground mb-2">{event.event_description}</p>
                      <div className="flex gap-3 text-sm">
                        <span className="text-primary font-semibold">
                          📅 {new Date(event.event_date).toLocaleDateString()}
                        </span>
                        {event.peak_season && (
                          <span className="bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-100 px-2 py-1 rounded text-xs font-semibold">
                            Peak Season
                          </span>
                        )}
                        {event.capacity_limit && (
                          <span className="text-muted-foreground">Capacity: {event.capacity_limit}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-muted-foreground py-8">No events scheduled yet</p>
            )}
          </CardContent>
        </Card>

        {/* Month Overview */}
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Seasonal Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
              {MONTHS.map((month) => {
                const isPeak = PEAK_SEASONS.some((s) => s.month === month)
                return (
                  <div
                    key={month}
                    className={`p-4 rounded-lg border text-center ${
                      isPeak
                        ? "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800"
                        : "bg-card border-border"
                    }`}
                  >
                    <p className="font-semibold text-foreground">{month}</p>
                    <p className="text-sm text-muted-foreground mt-1">{isPeak ? "Peak Season" : "Regular Season"}</p>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
