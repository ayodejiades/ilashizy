import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"

export default async function ProviderSettingsPage() {
  const supabase = await createClient()
  const { data, error } = await supabase.auth.getUser()

  if (error || !data?.user) {
    redirect("/auth/login")
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
      <nav className="border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            🏖️ Ilashizzy
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/provider/dashboard" className="text-foreground hover:text-primary">
              Dashboard
            </Link>
            <Link href="/provider/profile" className="text-foreground hover:text-primary">
              Profile
            </Link>
            <Link href="/provider/bookings" className="text-foreground hover:text-primary">
              Bookings
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
          <h1 className="text-4xl font-bold text-foreground mb-2">Provider Settings</h1>
          <p className="text-muted-foreground">Configure your service provider account</p>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground">Email Notifications</label>
                <p className="text-sm text-muted-foreground mt-1">Receive email for new bookings and messages</p>
                <input type="checkbox" className="mt-2" defaultChecked />
              </div>
              <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">Save Settings</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Manage payment methods and payouts</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">No payment method added</p>
              <Button variant="outline" className="w-full bg-transparent">
                Add Payment Method
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive" className="w-full">
                Deactivate Account
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
