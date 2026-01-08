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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (loginError) throw loginError

      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user?.id)
        .single()

      const userRole = profile?.role || "guest"

      toast.success("Signed in successfully!")

      if (userRole === "service_provider") {
        router.push("/provider/dashboard")
      } else {
        router.push("/dashboard")
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    const supabase = createClient()
    setIsLoading(true)

    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })
      if (error) throw error
      toast.success("Magic link sent! Check your email.")
    } catch (error: any) {
      toast.error(error.message || "Failed to send magic link")
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
        <div className="bg-white p-2 rounded-[2.5rem] shadow-xl border border-slate-100 overflow-hidden">
          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid grid-cols-2 rounded-[2rem] p-1 bg-slate-50 mb-4 h-14">
              <TabsTrigger value="password" className="rounded-[1.75rem] font-bold text-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Password</TabsTrigger>
              <TabsTrigger value="magic" className="rounded-[1.75rem] font-bold text-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">Magic Link</TabsTrigger>
            </TabsList>

            <div className="p-6">
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-slate-900 font-aladin mb-2">Welcome Back</h1>
                <p className="text-slate-500">Sign in to continue your journey</p>
              </div>

              <TabsContent value="password">
                <form onSubmit={handleLogin}>
                  <div className="flex flex-col gap-5">
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
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="font-bold text-slate-700">Password</Label>
                        <Link href="/auth/forgot-password" weights="bold" className="text-sm text-blue-600 font-bold hover:underline">
                          Forgot?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 py-6"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" disabled={isLoading}>
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </div>
                </form>
              </TabsContent>

              <TabsContent value="magic">
                <form onSubmit={handleMagicLink}>
                  <div className="flex flex-col gap-5">
                    <div className="grid gap-2">
                      <Label htmlFor="magic-email" className="font-bold text-slate-700">Email</Label>
                      <Input
                        id="magic-email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 py-6"
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" disabled={isLoading}>
                      {isLoading ? "Sending Magic Link..." : "Send Magic Link"}
                    </Button>
                    <p className="text-center text-sm text-slate-500 px-4 italic">
                      No password needed—we'll send a secure login link to your inbox.
                    </p>
                  </div>
                </form>
              </TabsContent>
            </div>
          </Tabs>

          <div className="p-6 bg-slate-50/50 border-t border-slate-100 text-center text-slate-500">
            Don&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="text-blue-600 font-bold hover:underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
