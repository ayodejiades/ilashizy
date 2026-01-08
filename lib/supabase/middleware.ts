import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) => supabaseResponse.cookies.set(name, value, options))
        },
      },
    },
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  const publicRoutes = ["/", "/about", "/contact", "/blog", "/partners", "/emergency"]
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname === route || request.nextUrl.pathname.startsWith(route + "/"))
  const isAuthRoute = request.nextUrl.pathname.startsWith("/auth")
  const isProviderRoute = request.nextUrl.pathname.startsWith("/provider")

  // 1. Unauthenticated users:
  // If NOT public route and NOT auth route -> redirect to login
  if (!user && !isPublicRoute && !isAuthRoute) {
    const url = request.nextUrl.clone()
    url.pathname = "/auth/login"
    return NextResponse.redirect(url)
  }

  // 2. Authenticated users:
  if (user) {
    const role = user.user_metadata?.role || "guest"

    // If on auth routes, redirect to their respective dashboard
    if (isAuthRoute && request.nextUrl.pathname !== "/auth/callback") {
      const url = request.nextUrl.clone()
      url.pathname = role === "service_provider" ? "/provider/dashboard" : "/dashboard"
      return NextResponse.redirect(url)
    }

    // If a guest tries to access provider routes -> redirect to guest dashboard
    if (role === "guest" && isProviderRoute) {
      const url = request.nextUrl.clone()
      url.pathname = "/dashboard"
      return NextResponse.redirect(url)
    }

    // If a provider tries to access guest-only routes (like /dashboard) -> redirect to provider dashboard
    // Note: Some pages like /activities might be shared, but /dashboard is usually user-specific.
    if (role === "service_provider" && request.nextUrl.pathname === "/dashboard") {
      const url = request.nextUrl.clone()
      url.pathname = "/provider/dashboard"
      return NextResponse.redirect(url)
    }
  }

  return supabaseResponse
}
