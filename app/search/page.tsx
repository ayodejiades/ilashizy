import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function SearchPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-border bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            🏖️ Ilashizzy
          </Link>
          <Link href="/" className="text-foreground hover:text-primary">
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Search Content */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-24">
        <h1 className="text-4xl font-bold text-foreground mb-8">Search Ilashizzy</h1>

        <div className="mb-12">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Search activities, tips, photos, and more..."
              className="flex-1 px-6 py-3 rounded-lg border border-input bg-background text-foreground placeholder-muted-foreground"
            />
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-8">Search</Button>
          </div>
        </div>

        {/* Popular Searches */}
        <Card>
          <CardContent className="pt-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Popular Searches</h2>
            <div className="flex flex-wrap gap-2">
              {["Surfing", "Photography", "Sunset", "Water Sports", "Beach Safety", "Picnic", "Local Tips"].map(
                (term) => (
                  <Button
                    key={term}
                    variant="outline"
                    className="bg-transparent border-primary/30 text-foreground hover:bg-primary/10"
                  >
                    {term}
                  </Button>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-muted-foreground mt-12">
          No search results yet. Try a different search term or browse our categories.
        </p>
      </section>
    </main>
  )
}
