import { redirect } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export default async function GalleryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Fetch gallery photos
  const { data: photosData } = await supabase
    .from("gallery")
    .select(`
  *,
  profiles(display_name)
    `)
    .order("created_at", { ascending: false })

  const photos = photosData || []

  return (
    <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      {/* Header - Matching Landing Page */}
      {/* Header - Matching Landing Page */}
      <Header />

      {/* Gallery Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 pt-40 pb-12">
        <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-6 text-center md:text-left">
          <div>
            <h1 className="text-5xl font-bold text-slate-900 mb-4 font-aladin">Community Photo Gallery</h1>
            <p className="text-xl text-slate-500 font-medium">Beautiful moments captured by our community at Ilashe Beach</p>
          </div>
          <Link href="/gallery/upload">
            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-6 text-lg font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Upload Photo</Button>
          </Link>
        </div>

        {photos.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {photos.map((photo: any) => (
              <div key={photo.id} className="bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 hover:-translate-y-1 transition-all duration-300 group">
                <div className="relative w-full h-72 overflow-hidden bg-slate-100">
                  <img
                    src={photo.image_url || "/placeholder.svg"}
                    alt={photo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold text-slate-900 line-clamp-1 font-aladin">{photo.title}</h3>
                  </div>
                  <p className="text-sm text-slate-500 mb-4 font-medium">
                    by {photo.profiles?.display_name || "Anonymous"}
                  </p>
                  <p className="text-slate-600 line-clamp-2 mb-6 leading-relaxed">{photo.description}</p>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-sm font-bold text-slate-400 flex items-center gap-1">
                      <span className="text-red-500">Likes:</span> {photo.likes_count || 0} likes
                    </span>
                    <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 font-bold">
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-24 bg-white rounded-[3rem] border border-dashed border-slate-200 shadow-sm">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl text-slate-400">Gallery</span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-2 font-aladin">No photos yet</h3>
            <p className="text-slate-500 mb-8">Be the first to share your beach moments!</p>
            <Link href="/gallery/upload">
              <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 font-bold rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">Upload Your First Photo</Button>
            </Link>
          </div>
        )}
      </section>
      <Footer />
    </main>
  )
}
