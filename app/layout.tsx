import type React from "react"
import type { Metadata } from "next"
import { Aladin, Lato } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const aladin = Aladin({
  subsets: ["latin"],
  weight: "400", 
  variable: "--font-aladin",
})

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
})

export const metadata: Metadata = {
  title: "Ilashizy - Ilashe made easy",
  description:
    "Community-driven tourism guide for Ilashe Beach. Explore activities, local tips, photos, and more from our vibrant community.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${aladin.variable} ${lato.variable}`}>
      <body className="font-lato antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  )
}