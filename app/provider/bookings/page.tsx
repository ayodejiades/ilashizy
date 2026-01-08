import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export default async function ProviderBookingsPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: bookingsData } = await supabase.from("bookings").select("*").order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
      <nav className="border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ILASHIZY
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/provider/dashboard" className="text-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link href="/provider/profile" className="text-foreground hover:text-primary">
              Profile
            </Link>
            <Link href="/provider/settings" className="text-foreground hover:text-primary">
              Settings
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </nav>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Bookings</h1>
          <p className="text-muted-foreground">View and manage all bookings for your activities</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>All Bookings</CardTitle>
            <CardDescription>{bookingsData?.length || 0} total bookings</CardDescription>
          </CardHeader>
          <CardContent>
            {bookingsData && bookingsData.length > 0 ? (
              <div className="space-y-4">
                {bookingsData.map((booking) => (
                  <div
                    key={booking.id}
                    className="border border-border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-foreground">Booking #{booking.id.slice(0, 8)}</p>
                      <p className="text-sm text-muted-foreground">
                        {booking.participants} participants • {booking.date}
                      </p>
                      <p className="text-sm text-muted-foreground capitalize">Status: {booking.status}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                      {booking.status === "pending" && (
                        <>
                          <Button variant="destructive" size="sm">
                            Decline
                          </Button>
                          <Button size="sm">Confirm</Button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-center py-8">No bookings yet</p>
            )}
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
