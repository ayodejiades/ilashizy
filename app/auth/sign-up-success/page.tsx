"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function SignUpSuccessPage() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center p-6 md:p-10 bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      <div className="w-full max-w-md">
        <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-green-400 to-emerald-500"></div>
          <div className="mb-6 flex justify-center">
            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
              <span className="text-4xl">✨</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 font-aladin mb-4">Welcome to Ilashizzy!</h1>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Account created successfully! We've sent a confirmation email to your inbox. Please click the link to verify your account.
          </p>
          <Link href="/">
            <Button className="w-full bg-slate-900 text-white hover:bg-slate-800 font-bold py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
