import Link from "next/link"
import { Button } from "@/components/ui/button"

export function PageLayout({ children, title, description }: { children: React.ReactNode; title: string; description?: string }) {
  return (
    <main className="min-h-screen bg-white">
      {/* Header with Wave */}
      <div className="bg-sky-300 relative">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none" className="w-full h-auto absolute bottom-0" style={{ marginBottom: "-1px" }}>
          <path fill="white" d="M0,20 Q300,0 600,20 T1200,20 L1200,60 L0,60 Z" />
        </svg>
        <nav className="relative z-10 bg-sky-300">
          <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-blue-600">ILASHIZY</Link>
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className="text-gray-700 hover:text-blue-600 text-sm">Dashboard</Link>
              <Link href="/profile" className="text-gray-700 hover:text-blue-600 text-sm">Profile</Link>
              <form action="/api/auth/logout" method="POST">
                <Button variant="outline" type="submit" size="sm">Sign Out</Button>
              </form>
            </div>
          </div>
        </nav>
      </div>

      {/* Page Content */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">{title}</h1>
          {description && <p className="text-lg md:text-xl text-gray-600">{description}</p>}
        </div>
        {children}
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-24">
        <div className="max-w-7xl mx-auto px-6 md:px-12 text-center text-gray-400 text-sm">
          <p>&copy; 2025 Ilashizy. Community-driven tourism guide.</p>
        </div>
      </footer>
    </main>
  )
}
