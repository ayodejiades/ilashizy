import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GuidelinesPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-border bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ILASHIZY
          </Link>
          <Link href="/" className="text-foreground hover:text-primary">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <h1 className="text-4xl font-bold text-foreground mb-8">Community Guidelines</h1>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Be Respectful</CardTitle>
              <CardDescription>Treat everyone with kindness and respect</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Our community is diverse, with people from different backgrounds and experiences. We value inclusivity
                and mutual respect.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Treat others as you would like to be treated</li>
                <li>Respect different opinions and perspectives</li>
                <li>Avoid harassment or discrimination</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Keep Content Authentic</CardTitle>
              <CardDescription>Share genuine experiences and accurate information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>
                Authenticity is at the heart of Ilashizzy. We value honest experiences and real insights from our
                community.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Share genuine reviews and experiences</li>
                <li>Don't post misleading or false information</li>
                <li>Give credit when sharing photos or content</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Follow Beach Safety Rules</CardTitle>
              <CardDescription>Prioritize safety for yourself and others</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>Everyone's safety is our priority. Follow local beach safety guidelines and regulations.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Follow lifeguard instructions</li>
                <li>Respect beach closure signs and warnings</li>
                <li>Report unsafe conditions to authorities</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Protect the Environment</CardTitle>
              <CardDescription>Help preserve Ilashe Beach for future generations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>Environmental conservation is crucial. Help us keep Ilashe Beach clean and beautiful.</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Take your trash with you</li>
                <li>Don't disturb wildlife or marine life</li>
                <li>Use eco-friendly products</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>No Prohibited Content</CardTitle>
              <CardDescription>Certain content is not allowed on our platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 text-muted-foreground">
              <p>To maintain a safe and welcoming community, we prohibit:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Hate speech or discrimination</li>
                <li>Sexual or explicit content</li>
                <li>Spam or promotional spam</li>
                <li>Threats or harassment</li>
                <li>Illegal activities</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <div className="mt-12 p-6 bg-accent/10 rounded-lg">
          <p className="text-muted-foreground">
            Violations of these guidelines may result in content removal or account suspension. Questions? Contact us at
            support@ilashizzy.com
          </p>
        </div>
      </section>
    </main>
  )
}
