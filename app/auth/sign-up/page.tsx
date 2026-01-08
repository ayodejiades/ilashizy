"use client"

import type React from "react"

import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRouter } from 'next/navigation'
import { useState } from "react"
import { toast } from "sonner"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeatPassword, setRepeatPassword] = useState("")
  const [displayName, setDisplayName] = useState("")
  const [role, setRole] = useState<"guest" | "service_provider">("guest")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)

    if (password !== repeatPassword) {
      toast.error("Passwords do not match")
      setIsLoading(false)
      return
    }

    try {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
          data: {
            display_name: displayName,
            role: role,
          },
        },
      })

      if (signUpError) throw signUpError

      if (data.user) {
        toast.success("Account created! Please check your email for verification.")
        router.push(`/auth/sign-up-success?role=${role}`)
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create account")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="text-4xl font-bold text-blue-600 tracking-wider font-aladin hover:opacity-80 transition-opacity inline-block">
            ILASHIZY
          </Link>
        </div>
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-slate-900 font-aladin mb-2">Join the Community</h1>
            <p className="text-slate-500">Create your account to start exploring</p>
          </div>
          <form onSubmit={handleSignUp}>
            <div className="flex flex-col gap-5">
              <div className="grid gap-2">
                <Label htmlFor="display-name" className="font-bold text-slate-700">Display Name</Label>
                <Input
                  id="display-name"
                  type="text"
                  placeholder="Your name"
                  required
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 py-6"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="font-bold text-slate-700">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 py-6"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="font-bold text-slate-700">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 py-6"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="repeat-password" className="font-bold text-slate-700">Repeat Password</Label>
                <Input
                  id="repeat-password"
                  type="password"
                  required
                  value={repeatPassword}
                  onChange={(e) => setRepeatPassword(e.target.value)}
                  className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 py-6"
                />
              </div>
              <div className="grid gap-3">
                <Label className="font-bold text-slate-700">Account Type</Label>
                <div className="flex gap-3">
                  <label className="flex items-center gap-3 cursor-pointer flex-1 p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all">
                    <input
                      type="radio"
                      value="guest"
                      checked={role === "guest"}
                      onChange={(e) => setRole(e.target.value as "guest")}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-400"
                    />
                    <span className="font-medium text-slate-700">Guest Visitor</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer flex-1 p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all">
                    <input
                      type="radio"
                      value="service_provider"
                      checked={role === "service_provider"}
                      onChange={(e) => setRole(e.target.value as "service_provider")}
                      className="w-5 h-5 text-blue-600 focus:ring-blue-400"
                    />
                    <span className="font-medium text-slate-700">Service Provider</span>
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Sign Up"}
              </Button>
            </div>
            <div className="mt-6 text-center text-slate-500">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 font-bold hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
