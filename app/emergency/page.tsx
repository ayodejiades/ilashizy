import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface EmergencyContact {
  type: string
  icon: string
  name: string
  phone: string
  description: string
}

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    type: "ambulance",
    icon: "🚑",
    name: "Emergency Medical",
    phone: "+234 112",
    description: "Immediate medical assistance and ambulance services",
  },
  {
    type: "police",
    icon: "🚔",
    name: "Police Emergency",
    phone: "+234 911",
    description: "Police assistance and emergency response",
  },
  {
    type: "coast_guard",
    icon: "⛵",
    name: "Coast Guard",
    phone: "+234 800 0000 000",
    description: "Maritime emergencies and water rescue",
  },
  {
    type: "lifeguard",
    icon: "🏊",
    name: "Beach Lifeguard",
    phone: "+234 XXX XXXX",
    description: "Beach safety and water rescue support",
  },
  {
    type: "fire",
    icon: "🔥",
    name: "Fire Department",
    phone: "+234 112",
    description: "Fire emergencies and rescue operations",
  },
  {
    type: "hospital",
    icon: "🏥",
    name: "Nearest Hospital",
    phone: "+234 XXX XXXX",
    description: "Trauma center and emergency hospitalization",
  },
]

export default async function EmergencyPage() {
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

      {/* Emergency Contacts */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-12 p-6 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <h1 className="text-5xl font-bold text-red-900 dark:text-red-100 mb-4">Emergency Contacts</h1>
          <p className="text-lg text-red-800 dark:text-red-200">
            Save these numbers and reach out immediately in case of emergencies at Ilashe Beach
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {EMERGENCY_CONTACTS.map((contact) => (
            <Card
              key={contact.type}
              className="hover:shadow-lg transition-shadow border-l-4 border-l-red-400 dark:border-l-red-600"
            >
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-4xl mb-2">{contact.icon}</div>
                    <CardTitle className="text-2xl">{contact.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{contact.description}</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-block bg-red-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-red-600 transition-colors"
                >
                  {contact.phone}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Tips */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>⚠️</span> Beach Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-primary font-bold">1.</span>
                <span>Always swim in designated areas with lifeguards present</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">2.</span>
                <span>Check weather conditions before visiting</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">3.</span>
                <span>Wear appropriate sun protection (SPF 30+)</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">4.</span>
                <span>Never go to the beach alone or at night</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">5.</span>
                <span>Keep valuables secure and away from water</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">6.</span>
                <span>Inform someone of your beach plans and expected return time</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}
