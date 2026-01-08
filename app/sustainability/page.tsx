"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Leaf, Droplets, Banknote, ArrowRight } from "lucide-react"

export default function SustainabilityPage() {
    return (
        <main className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
            <Header />

            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-900 via-emerald-900 to-teal-900"></div>
                <div className="absolute inset-0 opacity-20 bg-[url('/noise.png')]"></div>
                <div className="absolute inset-0 bg-adire opacity-10 mix-blend-overlay"></div>

                <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
                    <span className="text-emerald-300 font-bold tracking-[0.2em] uppercase mb-4 block animate-fade-in-up">Eco-Conscious Tourism</span>
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-8 font-aladin animate-fade-in-up delay-100">
                        PROTECTING<br />PARADISE
                    </h1>
                    <p className="text-xl md:text-2xl text-emerald-100 font-light max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200">
                        We are committed to preserving the natural beauty of Ilashe Beach for generations to come.
                    </p>
                </div>
            </section>

            {/* Introduction */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 opacity-50"></div>
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div>
                            <h2 className="text-5xl font-bold text-slate-900 mb-8 font-aladin">Our Pledge</h2>
                            <div className="space-y-6 text-lg text-slate-600 leading-relaxed font-medium">
                                <p>
                                    As a non-profit, community-driven platform, Ilashizzy isn't just about tourism—it's about stewardship.
                                </p>
                                <p>
                                    Every activity we promote and every partner we work with agrees to our eco-friendly guidelines.
                                    We believe that the magic of Ilashe lies in its pristine waters, golden sands, and vibrant local culture.
                                </p>
                            </div>
                        </div>
                        <div className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-emerald-100 relative">
                            <div className="absolute inset-0 bg-ankara opacity-5 pointer-events-none rounded-[2.5rem]"></div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-emerald-50 p-6 rounded-2xl text-center">
                                    <div className="text-4xl font-bold text-emerald-600 mb-2">500+</div>
                                    <div className="text-sm text-emerald-800 font-bold uppercase">Bags Collected</div>
                                </div>
                                <div className="bg-teal-50 p-6 rounded-2xl text-center">
                                    <div className="text-4xl font-bold text-teal-600 mb-2">100%</div>
                                    <div className="text-sm text-teal-800 font-bold uppercase">Local Guides</div>
                                </div>
                                <div className="bg-blue-50 p-6 rounded-2xl text-center col-span-2">
                                    <div className="text-4xl font-bold text-blue-600 mb-2">Zero</div>
                                    <div className="text-sm text-blue-800 font-bold uppercase">Single-use Plastic Policy</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pillars */}
            <section className="py-24 bg-adire relative">
                <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl font-bold text-slate-900 mb-4 font-aladin">Core Initiatives</h2>
                        <p className="text-xl text-slate-500">How we make a difference together</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:-translate-y-2 transition-transform duration-500 border border-slate-100">
                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-8">
                                <Leaf className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-aladin">Beach Cleanups</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Monthly community-led cleanup drives involving tourists, locals, and students to keep our coastline pristine.
                            </p>
                            <Button variant="link" className="text-green-600 font-bold p-0 h-auto hover:text-green-700">
                                View Schedule <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:-translate-y-2 transition-transform duration-500 border border-slate-100">
                            <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-8">
                                <Droplets className="w-8 h-8 text-teal-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-aladin">Wildlife Protection</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Strict guidelines to protect sea turtle nesting grounds and maintain the delicate balance of the lagoon ecosystem.
                            </p>
                            <Button variant="link" className="text-teal-600 font-bold p-0 h-auto hover:text-teal-700">
                                Learn Rules <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-[2rem] p-8 shadow-lg hover:-translate-y-2 transition-transform duration-500 border border-slate-100">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-8">
                                <Banknote className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-aladin">Local Empowerment</h3>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                We prioritize Ilashe natives for all guiding, boat, and hospitality services to ensure economic benefits stay local.
                            </p>
                            <Button variant="link" className="text-blue-600 font-bold p-0 h-auto hover:text-blue-700">
                                Meet Partners <ArrowRight className="w-4 h-4 ml-2" />
                            </Button>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 bg-slate-900 text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-emerald-900/50 to-blue-900/50"></div>

                <div className="max-w-4xl mx-auto px-6 md:px-12 text-center relative z-10">
                    <h2 className="text-5xl font-bold mb-8 font-aladin">Join The Movement</h2>
                    <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
                        Every visit counts. Choose eco-friendly activities and help us keep Ilashe beautiful.
                    </p>
                    <Button className="bg-emerald-500 hover:bg-emerald-600 text-white px-12 py-6 text-xl font-bold rounded-full shadow-lg hover:translate-y-[-2px] transition-all">
                        Support Our Cause
                    </Button>
                </div>
            </section>

            <Footer />
        </main>
    )
}
