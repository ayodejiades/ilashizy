import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Calendar, User, ArrowRight } from "lucide-react"

// Sample blog posts for initial display (before database is populated)
const samplePosts = [
    {
        id: "1",
        slug: "best-time-to-visit-ilashe",
        title: "The Best Time to Visit Ilashe Beach",
        excerpt: "Discover the perfect months for your Ilashe beach getaway, from weather patterns to crowd levels and special events.",
        cover_image: "/images/ilashe.jpg",
        author_name: "Ilashizy Team",
        created_at: "2026-01-05T10:00:00Z",
    },
    {
        id: "2",
        slug: "surfing-guide-beginners",
        title: "A Beginner's Guide to Surfing at Ilashe",
        excerpt: "Everything you need to know about catching your first wave at one of Lagos' most beautiful beaches.",
        cover_image: "/images/beach-club.jpg",
        author_name: "Ilashizy Team",
        created_at: "2026-01-03T10:00:00Z",
    },
    {
        id: "3",
        slug: "hidden-gems-ilashe",
        title: "5 Hidden Gems You Must Explore at Ilashe",
        excerpt: "Beyond the main beach, discover secret spots that locals love but tourists often miss.",
        cover_image: "/images/sunset.jpg",
        author_name: "Ilashizy Team",
        created_at: "2026-01-01T10:00:00Z",
    },
]

export default async function BlogPage() {
    const supabase = await createClient()

    // Try to fetch posts from database, fall back to sample posts
    const { data: dbPosts } = await supabase
        .from("posts")
        .select("*, profiles(display_name)")
        .order("created_at", { ascending: false })

    const posts = dbPosts && dbPosts.length > 0 ? dbPosts : samplePosts

    return (
        <main className="w-full bg-slate-50 min-h-screen flex flex-col selection:bg-cyan-300 selection:text-blue-900">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 transition-all duration-300 shadow-lg ring-1 ring-black/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
                    <Link href="/" className="text-3xl brand-title text-blue-600 tracking-wider">ILASHIZY</Link>
                    <div className="hidden md:flex gap-8">
                        <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Home</Link>
                        <Link href="/activities" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Activities</Link>
                        <Link href="/about" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">About</Link>
                        <Link href="/contact" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Contact</Link>
                    </div>
                    <div className="flex items-center gap-3">
                        <LanguageSwitcher />
                        <Link href="/auth/login">
                            <Button className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-2 text-lg font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none">
                                Sign In
                            </Button>
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="pt-40 pb-16 bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-200/30 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-200/30 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 font-aladin">Ilashizy Blog</h1>
                    <p className="text-slate-500 text-xl font-medium max-w-2xl mx-auto">
                        Stories, tips, and insights from the Ilashe Beach community
                    </p>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 flex-1">
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {posts.map((post: any) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group bg-white rounded-[2rem] overflow-hidden shadow-xl border border-slate-100 hover:-translate-y-2 transition-all duration-300"
                            >
                                <div className="relative w-full h-56 overflow-hidden bg-slate-100">
                                    <img
                                        src={post.cover_image || "/images/ilashe.jpg"}
                                        alt={post.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                                <div className="p-6">
                                    <h2 className="text-2xl font-bold text-slate-900 mb-3 font-aladin group-hover:text-blue-600 transition-colors line-clamp-2">
                                        {post.title}
                                    </h2>
                                    <p className="text-slate-600 mb-6 line-clamp-3 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <div className="flex items-center gap-4 text-sm text-slate-500">
                                            <span className="flex items-center gap-1">
                                                <User className="w-4 h-4" />
                                                {post.author_name || post.profiles?.display_name || "Ilashizy Team"}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {new Date(post.created_at).toLocaleDateString("en-US", {
                                                    month: "short",
                                                    day: "numeric",
                                                    year: "numeric"
                                                })}
                                            </span>
                                        </div>
                                        <ArrowRight className="w-5 h-5 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}
