import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
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
        <h1 className="text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2025</p>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Introduction</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                Ilashizzy ("we", "us", or "our") operates the Ilashizzy website and mobile application. This page
                informs you of our policies regarding the collection, use, and disclosure of personal data when you use
                our service.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Information Collection and Use</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>
                We collect several different types of information for various purposes to provide and improve our
                service to you.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Personal Data: Email address, name, profile information</li>
                <li>Usage Data: Browser type, IP address, pages visited, time spent</li>
                <li>Cookies: To enhance user experience and track preferences</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Use of Data</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground space-y-3">
              <p>We use the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our service</li>
                <li>To notify you about changes to our service</li>
                <li>To allow you to participate in interactive features</li>
                <li>To provide customer support</li>
                <li>To gather analysis and feedback to improve our service</li>
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Security of Data</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                The security of your data is important to us but remember that no method of transmission over the
                Internet or method of electronic storage is 100% secure. We strive to use commercially acceptable means
                to protect your personal data.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Changes to This Privacy Policy</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              <p>If you have any questions about this Privacy Policy, please contact us at privacy@ilashizzy.com</p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  )
}
