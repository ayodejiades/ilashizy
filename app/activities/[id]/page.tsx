import { createClient } from "@/lib/supabase/server"
import { activities as staticActivities, places as staticPlaces } from "@/lib/data"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ActivityPlacesClient } from "@/components/activity-places-client"
import { redirect } from "next/navigation"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  const supabase = await createClient()
  const { data: activityData } = await supabase
    .from("activities")
    .select("title, description")
    .eq("id", id)
    .single()

  const activity = activityData || staticActivities.find(a => a.id === id)

  return {
    title: activity ? `${activity.title} at Ilashe Beach` : 'Activity',
    description: activity?.description || 'Explore the best activities at Ilashe beach.',
  }
}

export default async function ActivityDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch activity from DB
  const { data: activityData } = await supabase
    .from("activities")
    .select("*")
    .eq("id", id)
    .single()

  const currentActivity = activityData || staticActivities.find(a => a.id === id)

  if (!currentActivity) {
    redirect("/activities")
  }

  // Fetch places for this activity
  const { data: placesData } = await supabase
    .from("places")
    .select("*")
    .eq("activity_id", id)

  const activityPlaces = placesData || staticPlaces.filter(p => p.activityId === id)

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      <Header />
      <ActivityPlacesClient activity={currentActivity} activityPlaces={activityPlaces} />
      <Footer />
    </main>
  )
}
