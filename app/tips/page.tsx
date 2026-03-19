import { createClient } from "@/lib/supabase/server"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TipsClient } from "@/components/tips-client"

export const metadata = {
  title: 'Local Tips for Ilashe Beach',
  description: 'Read and share the best tips for enjoying Ilashe beach from the community.',
}

export default async function TipsPage() {
  const supabase = await createClient()

  const { data: tipsData } = await supabase
    .from("tips")
    .select(`
      *,
      profiles(display_name)
    `)
    .order("created_at", { ascending: false })

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      <Header />
      <TipsClient tips={tipsData || []} />
      <Footer />
    </main>
  )
}
