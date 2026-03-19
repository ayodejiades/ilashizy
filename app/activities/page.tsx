import { createClient } from "@/lib/supabase/server"
import { activities as staticActivities } from "@/lib/data"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ActivitiesClient } from "@/components/activities-client"

export const metadata = {
  title: 'Activities at Ilashe Beach',
  description: 'Explore the best activities available at Ilashe beach from surfing to dining.',
}

export default async function ActivitiesPage() {
  const supabase = await createClient()
  
  // Fetch activity options on the server
  const { data: dbActivities } = await supabase
    .from("activities")
    .select("*")

  const displayActivities = dbActivities && dbActivities.length > 0
    ? dbActivities
    : staticActivities.map(a => ({ ...a, icon: a.icon.name || 'Waves' }))

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900 relative">
      <Header />
      <ActivitiesClient displayActivities={displayActivities} />
      <Footer />
    </main>
  )
}
