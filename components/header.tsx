"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { cn } from "@/lib/utils"
import { Bell, User, LogOut, Settings, LayoutDashboard } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTranslation } from "@/lib/use-translation"

export function Header() {
  const { t } = useTranslation()
  const pathname = usePathname()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [userRole, setUserRole] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState<any[]>([])
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)

      if (user) {
        setUserRole(user.user_metadata?.role || "guest")
        // Fetch real notifications
        const { data: notifs } = await supabase
          .from("notifications")
          .select("*")
          .eq("recipient_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5)

        setNotifications(notifs || [])
      }
      setLoading(false)
    }

    getData()

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setUserRole(session?.user?.user_metadata?.role || "guest")
      if (!session?.user) {
        setNotifications([])
      } else {
        // Re-fetch if they just logged in
        getData()
      }
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleMarkAsRead = async (id: string) => {
    await supabase.from("notifications").update({ read: true }).eq("id", id)
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
    router.push("/")
  }

  const unreadCount = notifications.filter(n => !n.read).length

  // Base items for everyone
  const navItems = [
    { name: t("nav.home"), href: "/" },
  ]

  // Role-based items
  if (!user) {
    // Logged out
    navItems.push(
      { name: t("nav.blog"), href: "/blog" },
      { name: t("nav.contact"), href: "/contact" }
    )
  } else if (userRole === "service_provider") {
    // Service Provider
    navItems.push(
      { name: t("nav.dashboard"), href: "/provider/dashboard" },
      { name: t("nav.bookings") || "Bookings", href: "/provider/bookings" },
      { name: t("nav.blog"), href: "/blog" }
    )
  } else {
    // Guest (Default)
    navItems.push(
      { name: t("nav.activities"), href: "/activities" },
      { name: t("nav.calendar") || "Calendar", href: "/calendar" },
      { name: t("nav.blog"), href: "/blog" },
      { name: t("nav.contact"), href: "/contact" }
    )
  }

  return (
    <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-sand-200 transition-all duration-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
        <Link href="/" className="text-3xl brand-title text-primary tracking-wider font-aladin">
          ILASHIZY
        </Link>

        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-lg font-bold transition-colors hover:text-primary",
                pathname === item.href ? "text-primary" : "text-slate-700"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {/* Show Notifications for Logged-In Users */}
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="relative rounded-full hover:bg-slate-100 text-slate-600">
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                      <span className="absolute top-2 right-2 h-2 w-2 bg-red-500 rounded-full border-2 border-white" />
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 rounded-2xl p-2 shadow-xl border-slate-100">
                  <DropdownMenuLabel className="px-4 py-3 font-aladin text-xl text-slate-800 flex items-center justify-between">
                    <span>{t("nav.notifications") || "Notifications"}</span>
                    {unreadCount > 0 && <span className="bg-red-50 text-red-600 text-[10px] px-2 py-0.5 rounded-full font-bold">{unreadCount} New</span>}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-100" />

                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <DropdownMenuItem
                        key={n.id}
                        onClick={() => handleMarkAsRead(n.id)}
                        className={cn(
                          "p-4 cursor-pointer focus:bg-slate-50 rounded-xl mb-1 flex flex-col items-start gap-1",
                          !n.read && "bg-blue-50/50"
                        )}
                      >
                        <div className="flex justify-between w-full items-start">
                          <span className="font-bold text-slate-800 text-sm">{n.type === 'booking' ? 'Booking Update' : n.type === 'account' ? 'Profile Update' : 'Notice'}</span>
                          {!n.read && <div className="h-2 w-2 bg-blue-600 rounded-full mt-1.5" />}
                        </div>
                        <span className="text-xs text-slate-500 leading-snug">{n.message}</span>
                        <span className="text-[10px] text-slate-400 mt-1">
                          {new Date(n.created_at).toLocaleDateString()}
                        </span>
                      </DropdownMenuItem>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <p className="text-sm text-slate-400">No notifications yet</p>
                    </div>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <LanguageSwitcher />
          </div>

          {!loading && (
            user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20 transition-all hover:border-primary/50">
                      <AvatarImage src={user.user_metadata?.avatar_url} alt={user.user_metadata?.display_name} />
                      <AvatarFallback className="bg-primary/10 text-primary font-bold">
                        {user.user_metadata?.display_name?.[0]?.toUpperCase() || user.email?.[0]?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.user_metadata?.display_name || "User"}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={userRole === "service_provider" ? "/provider/dashboard" : "/dashboard"} className="cursor-pointer">
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      <span>{t("nav.dashboard")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>{t("nav.profile")}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/settings" className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>{t("nav.settings") || "Settings"}</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="text-red-600 cursor-pointer focus:text-red-700 focus:bg-red-50">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>{t("nav.signOut")}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button className="bg-primary text-white hover:bg-primary/90 rounded-full font-bold px-6 shadow-md">
                  {t("auth.signIn")}
                </Button>
              </Link>
            )
          )}
        </div>
      </div>
    </header>
  )
}
