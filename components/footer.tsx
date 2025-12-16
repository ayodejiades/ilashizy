"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { useTranslation } from "@/lib/use-translation"

export function Footer() {
    const { t } = useTranslation()

    return (
        <footer className="bg-black text-white border-t border-slate-900">
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-20">
                <div className="grid md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-3xl font-bold text-white mb-6 tracking-wider brand-title">ILASHIZY</h3>
                        <p className="text-slate-400 text-lg max-w-sm leading-relaxed">
                            {t("footer.tagline")}
                        </p>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-8 text-xl">{t("footer.explore")}</h4>
                        <ul className="space-y-4 text-slate-400 text-lg">
                            <li><Link href="/activities" className="hover:text-blue-400 transition-colors">{t("nav.activities")}</Link></li>
                            <li><Link href="/gallery" className="hover:text-blue-400 transition-colors">{t("nav.gallery")}</Link></li>
                            <li><Link href="/guidelines" className="hover:text-blue-400 transition-colors">{t("nav.guidelines")}</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold text-white mb-8 text-xl">{t("footer.connect")}</h4>
                        <div className="flex gap-4">
                            <Link href="#" className="bg-slate-900 p-4 rounded-full hover:bg-blue-600 hover:text-white transition-all text-slate-400">
                                <Facebook className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="bg-slate-900 p-4 rounded-full hover:bg-pink-600 hover:text-white transition-all text-slate-400">
                                <Instagram className="w-6 h-6" />
                            </Link>
                            <Link href="#" className="bg-slate-900 p-4 rounded-full hover:bg-sky-500 hover:text-white transition-all text-slate-400">
                                <Twitter className="w-6 h-6" />
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="border-t border-slate-900 pt-8 text-center text-slate-500 text-sm font-medium">
                    <p>&copy; {new Date().getFullYear()} Ilashizy. {t("footer.copyright")}</p>
                </div>
            </div>
        </footer>
    )
}
