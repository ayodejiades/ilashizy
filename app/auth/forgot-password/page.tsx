"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useState } from "react"
import { toast } from "sonner"
import { ArrowLeft, Mail } from "lucide-react"

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const supabase = createClient()

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            })

            if (error) throw error

            setIsSubmitted(true)
            toast.success("Reset link sent! Please check your email.")
        } catch (error: any) {
            toast.error(error.message || "Failed to send reset link")
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

                    <div className="mb-8 items-center flex flex-col">
                        <Link href="/auth/login" className="flex items-center text-slate-500 hover:text-blue-600 self-start mb-4 transition-colors font-bold">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </Link>
                        <h1 className="text-3xl font-bold text-slate-900 font-aladin mb-2">Forgot Password</h1>
                        <p className="text-slate-500 text-center">Enter your email and we'll send you a link to reset your password.</p>
                    </div>

                    {!isSubmitted ? (
                        <form onSubmit={handleResetPassword}>
                            <div className="flex flex-col gap-5">
                                <div className="grid gap-2">
                                    <Label htmlFor="email" className="font-bold text-slate-700">Email Address</Label>
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
                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" disabled={isLoading}>
                                    {isLoading ? "Sending Link..." : "Send Reset Link"}
                                </Button>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center space-y-6">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                                <Mail className="w-10 h-10 text-green-500" />
                            </div>
                            <p className="text-slate-600 font-medium">
                                We've sent an email to <span className="font-bold text-slate-900">{email}</span>. Click the link in the email to reset your password.
                            </p>
                            <Button onClick={() => setIsSubmitted(false)} variant="outline" className="rounded-full py-6 px-8 border-slate-200 font-bold">
                                Resend link
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
