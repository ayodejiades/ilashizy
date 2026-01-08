import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/server"
import { Footer } from "@/components/footer"
import { LanguageSwitcher } from "@/components/language-switcher"
import { Calendar, User, ArrowLeft, Share2 } from "lucide-react"

// Sample blog posts content
const samplePostsContent: Record<string, any> = {
    "best-time-to-visit-ilashe": {
        title: "The Best Time to Visit Ilashe Beach",
        cover_image: "/images/ilashe.jpg",
        author_name: "Ilashizy Team",
        created_at: "2026-01-05T10:00:00Z",
        content: `
## When to Plan Your Visit

Ilashe Beach is beautiful year-round, but certain times offer unique experiences that can make your trip even more memorable.

### The Dry Season (November - March)

This is arguably the best time to visit Ilashe. The weather is warm and sunny with minimal rainfall, making it perfect for:

- **Beach activities** like surfing, swimming, and sunbathing
- **Photography** with crystal clear skies
- **Outdoor events** and beach parties

### The Shoulder Season (April - May, October)

These transitional months offer a balance between fewer crowds and decent weather. Expect occasional short showers, but also beautiful cloud formations for stunning sunset photos.

### The Rainy Season (June - September)

While the rainy season sees fewer visitors, it has its own charm:

- Lush green landscapes
- Dramatic skies and lightning shows
- Lower prices at resorts and activities
- Peaceful, uncrowded beaches

## Pro Tips

1. **Book accommodations early** during the December holiday season
2. **Check conditions** before water sports during rainy season
3. **Weekend crowds** peak on Saturdays - visit Sunday for a quieter experience

No matter when you visit, Ilashe Beach promises an unforgettable experience. Plan your trip today and discover why this hidden gem is beloved by locals and visitors alike.
    `,
    },
    "surfing-guide-beginners": {
        title: "A Beginner's Guide to Surfing at Ilashe",
        cover_image: "/images/beach-club.jpg",
        author_name: "Ilashizy Team",
        created_at: "2026-01-03T10:00:00Z",
        content: `
## Your First Wave Awaits

Ilashe Beach offers some of the best conditions for beginner surfers in the Lagos area. Here's everything you need to know to catch your first wave.

### Why Ilashe is Perfect for Beginners

- **Gentle wave breaks** suitable for learning
- **Sandy bottom** means safer wipeouts
- **Warm water** year-round (no wetsuit needed!)
- **Local instructors** available for lessons

### Essential Gear

1. **Surfboard** - Start with a soft-top longboard (8-9 feet)
2. **Leash** - Keeps your board attached to your ankle
3. **Rash guard** - Protects from sun and board rash
4. **Sunscreen** - Reef-safe, water-resistant SPF 50+

### Your First Lesson

Most beginners can stand up on a surfboard within their first 2-hour lesson. Here's what to expect:

1. **Beach basics** - Learn paddling and pop-up technique on sand
2. **Water practice** - Practice in shallow water
3. **Catching whitewater** - Ride the foam waves first
4. **Green waves** - Graduate to unbroken waves

### Top Surf Schools at Ilashe

- **Pop Ilashe** - Full-service beach club with certified instructors
- **Ilashe Surf Co.** - Local instructors with deep knowledge of the breaks

### Safety Tips

- Always surf with a buddy
- Know your limits
- Respect other surfers in the lineup
- Check conditions before entering the water

Ready to ride? Book your first lesson and join the vibrant surfing community at Ilashe Beach!
    `,
    },
    "hidden-gems-ilashe": {
        title: "5 Hidden Gems You Must Explore at Ilashe",
        cover_image: "/images/sunset.jpg",
        author_name: "Ilashizy Team",
        created_at: "2026-01-01T10:00:00Z",
        content: `
## Beyond the Beach

While the main beach at Ilashe draws visitors from across Lagos, the area holds secret spots that only locals know about. Here are five hidden gems worth exploring.

### 1. The Mangrove Trails

Just behind the beach, winding trails through mangrove forests offer a completely different experience. Perfect for:

- Bird watching (spot herons, kingfishers, and more)
- Peaceful morning walks
- Photography

### 2. Sunset Point

At the western end of the beach, a small rocky outcrop offers unobstructed sunset views. Arrive 30 minutes before sunset to secure the best spot.

### 3. The Local Fish Market

Wake up early (5-6 AM) and visit the fishing village as boats return with the night's catch. Experience authentic local life and buy the freshest seafood possible.

### 4. The Zen Garden

A secret meditation spot maintained by a local yoga instructor. Ask around for directions - locals are happy to share if you're genuinely interested in mindfulness.

### 5. Lagoon Kayaking Routes

Rent a kayak and explore the calm lagoon waters behind the beach. You'll discover:

- Hidden coves
- Bird nesting areas
- Local fishing techniques
- Stunning views of the coast

## How to Find These Spots

The best way to discover Ilashe's hidden gems is to befriend locals. Strike up conversations, show genuine interest in the community, and you'll be rewarded with insider knowledge that no guidebook contains.

Every visit to Ilashe can be a new adventure. Start exploring!
    `,
    },
}

interface BlogPostPageProps {
    params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const supabase = await createClient()

    // Try to fetch from database first
    const { data: dbPost } = await supabase
        .from("posts")
        .select("*, profiles(display_name)")
        .eq("slug", slug)
        .single()

    // Fall back to sample posts
    const post = dbPost || samplePostsContent[slug]

    if (!post) {
        notFound()
    }

    return (
        <main className="w-full bg-slate-50 min-h-screen flex flex-col selection:bg-cyan-300 selection:text-blue-900">
            {/* Header */}
            <header className="fixed top-0 w-full z-50 bg-white/10 backdrop-blur-xl border-b border-white/20 transition-all duration-300 shadow-lg ring-1 ring-black/5">
                <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
                    <Link href="/" className="text-3xl brand-title text-blue-600 tracking-wider">ILASHIZY</Link>
                    <div className="hidden md:flex gap-8">
                        <Link href="/" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Home</Link>
                        <Link href="/blog" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Blog</Link>
                        <Link href="/activities" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Activities</Link>
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

            {/* Hero Image */}
            <section className="pt-24 relative">
                <div className="w-full h-[50vh] relative">
                    <img
                        src={post.cover_image || "/images/ilashe.jpg"}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent"></div>
                </div>
            </section>

            {/* Article Content */}
            <section className="relative -mt-32 pb-16 flex-1">
                <div className="max-w-3xl mx-auto px-6 md:px-12">
                    <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-2xl border border-slate-100">
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-bold mb-8 transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back to Blog
                        </Link>

                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 font-aladin leading-tight">
                            {post.title}
                        </h1>

                        <div className="flex items-center justify-between pb-8 mb-8 border-b border-slate-100">
                            <div className="flex items-center gap-6 text-slate-500">
                                <span className="flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    {post.author_name || post.profiles?.display_name || "Ilashizy Team"}
                                </span>
                                <span className="flex items-center gap-2">
                                    <Calendar className="w-5 h-5" />
                                    {new Date(post.created_at).toLocaleDateString("en-US", {
                                        month: "long",
                                        day: "numeric",
                                        year: "numeric"
                                    })}
                                </span>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-full border-slate-200">
                                <Share2 className="w-4 h-4 mr-2" />
                                Share
                            </Button>
                        </div>

                        <article className="prose prose-lg prose-slate max-w-none prose-headings:font-aladin prose-headings:text-slate-900 prose-a:text-blue-600 prose-strong:text-slate-900">
                            <div dangerouslySetInnerHTML={{ __html: formatMarkdown(post.content) }} />
                        </article>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    )
}

// Simple markdown to HTML converter for basic formatting
function formatMarkdown(content: string): string {
    if (!content) return ""

    return content
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/^- (.*$)/gm, '<li>$1</li>')
        .replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>')
        .replace(/^(\d+)\. (.*$)/gm, '<li>$2</li>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(.+)$/gm, (match) => {
            if (match.startsWith('<')) return match
            return `<p>${match}</p>`
        })
}
