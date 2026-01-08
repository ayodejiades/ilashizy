"use client"

import type React from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"
import { Lock } from "lucide-react"

export default function ResetPasswordPage() {
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords do not match")
            return
        }

        setIsLoading(true)

        try {
            const { error } = await supabase.auth.updateUser({
                password: password,
            })

            if (error) throw error

            toast.success("Password updated successfully!")
            router.push("/auth/login")
        } catch (error: any) {
            toast.error(error.message || "Failed to update password")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
            <div className="w-full max-w-md">
                <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-400 to-cyan-400"></div>

                    <div className="mb-8 text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 font-aladin mb-2">Create New Password</h1>
                        <p className="text-slate-500">Your password should be at least 6 characters long.</p>
                    </div>

                    <form onSubmit={handleUpdatePassword}>
                        <div className="flex flex-col gap-5">
                            <div className="grid gap-2">
                                <Label htmlFor="password" className="font-bold text-slate-700">New Password</Label>
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
                                <Label htmlFor="confirm-password" className="font-bold text-slate-700">Confirm Password</Label>
                                <Input
                                    id="confirm-password"
                                    type="password"
                                    required
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="rounded-xl border-slate-200 focus:border-blue-400 focus:ring-blue-400/20 py-6"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5" disabled={isLoading}>
                                {isLoading ? "Updating..." : "Reset Password"}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
