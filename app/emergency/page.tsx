import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Ambulance, ShieldAlert, Ship, LifeBuoy, Flame, Hospital } from "lucide-react"

interface EmergencyContact {
  type: string
  icon: any
  name: string
  phone: string
  description: string
}

const EMERGENCY_CONTACTS: EmergencyContact[] = [
  {
    type: "ambulance",
    icon: Ambulance,
    name: "Emergency Medical",
    phone: "+234 112",
    description: "Immediate medical assistance and ambulance services",
  },
  {
    type: "police",
    icon: ShieldAlert,
    name: "Police Emergency",
    phone: "+234 911",
    description: "Police assistance and emergency response",
  },
  {
    type: "coast_guard",
    icon: Ship,
    name: "Coast Guard",
    phone: "+234 800 0000 000",
    description: "Maritime emergencies and water rescue",
  },
  {
    type: "lifeguard",
    icon: LifeBuoy,
    name: "Beach Lifeguard",
    phone: "+234 XXX XXXX",
    description: "Beach safety and water rescue support",
  },
  {
    type: "fire",
    icon: Flame,
    name: "Fire Department",
    phone: "+234 112",
    description: "Fire emergencies and rescue operations",
  },
  {
    type: "hospital",
    icon: Hospital,
    name: "Nearest Hospital",
    phone: "+234 XXX XXXX",
    description: "Trauma center and emergency hospitalization",
  },
]

export default function EmergencyPage() {
  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      <Header />

      {/* Emergency Contacts */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-40 pb-12">
        <div className="mb-12 p-6 bg-red-50 border border-red-100 rounded-[2rem] text-center">
          <h1 className="text-5xl font-bold text-red-900 mb-4 font-aladin">Emergency Contacts</h1>
          <p className="text-lg text-red-800">
            Save these numbers and reach out immediately in case of emergencies at Ilashe Beach
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {EMERGENCY_CONTACTS.map((contact) => (
            <Card
              key={contact.type}
              className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500 rounded-xl overflow-hidden"
            >
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <contact.icon className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold text-slate-900">{contact.name}</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 mb-4">{contact.description}</p>
                <a
                  href={`tel:${contact.phone}`}
                  className="inline-block bg-red-600 text-white px-6 py-3 rounded-full font-bold hover:bg-red-700 transition-colors shadow-md hover:shadow-lg"
                >
                  Call {contact.phone}
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Safety Tips */}
        <Card className="rounded-[2rem] border-slate-100 shadow-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-aladin">
              <ShieldAlert className="w-6 h-6 text-red-500" />
              Beach Safety Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold bg-red-50 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">1</span>
                <span className="text-slate-700">Always swim in designated areas with lifeguards present</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold bg-red-50 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">2</span>
                <span className="text-slate-700">Check weather conditions before visiting</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold bg-red-50 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">3</span>
                <span className="text-slate-700">Wear appropriate sun protection (SPF 30+)</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold bg-red-50 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">4</span>
                <span className="text-slate-700">Never go to the beach alone or at night</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold bg-red-50 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">5</span>
                <span className="text-slate-700">Keep valuables secure and away from water</span>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-red-500 font-bold bg-red-50 w-6 h-6 rounded-full flex items-center justify-center text-sm shrink-0">6</span>
                <span className="text-slate-700">Inform someone of your beach plans and expected return time</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </section>
      <Footer />
    </main>
  )
}
