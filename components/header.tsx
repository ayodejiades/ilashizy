import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="border-b border-border">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-primary">
          🏖️ Ilashizzy
        </Link>
        <div className="flex gap-4">
          <Link href="/auth/login">
            <Button variant="outline">Sign In</Button>
          </Link>
          <Link href="/auth/sign-up">
            <Button>Join Now</Button>
          </Link>
        </div>
      </div>
    </header>
  )
}
