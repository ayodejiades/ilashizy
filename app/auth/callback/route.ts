import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    // if "next" is in param, use it as the redirect URL
    const next = searchParams.get("next") ?? "/dashboard"

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)
        if (!error) {
            // Check user role to determine redirect
            const { data: { user } } = await supabase.auth.getUser()
            const role = user?.user_metadata?.role

            if (role === "service_provider") {
                return NextResponse.redirect(`${origin}/provider/dashboard`)
            } else {
                return NextResponse.redirect(`${origin}/dashboard`)
            }
        }
    }

    // return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
