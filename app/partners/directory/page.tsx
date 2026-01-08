"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Star, BadgeCheck } from "lucide-react"
import { partners, Partner } from "@/lib/partners-data"
import Link from "next/link"

export default function PartnershipDirectory() {
    const [filter, setFilter] = useState<"All" | "Accommodation" | "Transport" | "Tours">("All")
    const [search, setSearch] = useState("")

    const filteredPartners = partners.filter(p => {
        const matchesCategory = filter === "All" || p.category === filter
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.location.toLowerCase().includes(search.toLowerCase())
        return matchesCategory && matchesSearch
    })

    return (
        <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
            <Header />

            {/* Hero */}
            <section className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-adire opacity-5 mix-blend-overlay"></div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold font-aladin mb-6">Verified Partners</h1>
                    <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12">
                        Find trusted local businesses for a safe and authentic Ilashe experience.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <Input
                            placeholder="Search hotels, boats, or guides..."
                            className="pl-12 py-6 rounded-full bg-white/10 border-white/20 text-white placeholder:text-slate-400 focus:bg-white/20 transition-all font-bold"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-12 bg-slate-50 relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12">

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 justify-center mb-12">
                        {["All", "Accommodation", "Transport", "Tours"].map((cat) => (
                            <Button
                                key={cat}
                                variant={filter === cat ? "default" : "outline"}
                                onClick={() => setFilter(cat as any)}
                                className={`rounded-full px-6 ${filter === cat ? 'bg-blue-600 hover:bg-blue-700' : 'bg-white hover:bg-slate-50'}`}
                            >
                                {cat}
                            </Button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredPartners.map(partner => (
                            <div key={partner.id} className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
                                <div className="h-48 bg-slate-200 relative">
                                    {/* Valid Image Logic needed here, using placeholder color for now */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 opacity-50"></div>
                                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-slate-900 uppercase tracking-wider">
                                        {partner.category}
                                    </div>
                                </div>
                                <div className="p-8">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-900 mb-1 flex items-center gap-2">
                                                {partner.name}
                                                {partner.verified && <BadgeCheck className="w-5 h-5 text-blue-500" />}
                                            </h3>
                                            <div className="flex items-center text-sm text-slate-500">
                                                <MapPin className="w-4 h-4 mr-1" />
                                                {partner.location}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-lg">
                                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                                            <span className="font-bold text-slate-900">{partner.rating}</span>
                                        </div>
                                    </div>
                                    <p className="text-slate-600 text-sm mb-6 line-clamp-2">
                                        {partner.description}
                                    </p>
                                    <Button className="w-full rounded-full bg-slate-900 text-white hover:bg-blue-600 transition-colors font-bold">
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredPartners.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-xl text-slate-500 font-aladin">No partners found matching your search.</p>
                        </div>
                    )}
                </div>
            </section>

            <Footer />
        </main>
    )
}
