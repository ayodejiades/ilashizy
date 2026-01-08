import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export default async function ProviderProfilePage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  const { data: profileData } = await supabase.from("profiles").select("*").eq("id", data.user.id).single()

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
            <Link href="/provider/bookings" className="text-foreground hover:text-primary">
              Bookings
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

      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-2">Service Provider Profile</h1>
          <p className="text-muted-foreground">Manage your business profile</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>Your service provider profile</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-foreground">Name</label>
                <p className="text-muted-foreground mt-1">{profileData?.display_name || "Not set"}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Email</label>
                <p className="text-muted-foreground mt-1">{data.user.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">Bio</label>
                <p className="text-muted-foreground mt-1">{profileData?.bio || "No bio added"}</p>
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Edit Profile</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-2xl font-bold text-primary">0</p>
                <p className="text-sm text-muted-foreground">Total Bookings</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-accent">0</p>
                <p className="text-sm text-muted-foreground">Completed</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">4.5</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
