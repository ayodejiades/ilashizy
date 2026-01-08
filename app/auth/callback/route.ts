import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Get user data
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const displayName = user.user_metadata?.display_name || user.email?.split('@')[0] || 'User'
                const role = user.user_metadata?.role || 'guest'

                // Check if profile exists
                const { data: existingProfile } = await supabase
                    .from('profiles')
                    .select('id')
                    .eq('id', user.id)
                    .single()

                // Create profile if it doesn't exist
                if (!existingProfile) {
                    await supabase.from('profiles').insert({
                        id: user.id,
                        display_name: displayName,
                        role: role,
                        created_at: new Date().toISOString(),
                        updated_at: new Date().toISOString(),
                    })
                }

                // Redirect based on type or role
                if (searchParams.get("type") === "recovery") {
                    return NextResponse.redirect(`${origin}/auth/reset-password`)
                }

                if (role === "service_provider") {
                    return NextResponse.redirect(`${origin}/provider/dashboard`)
                } else {
                    return NextResponse.redirect(`${origin}/dashboard`)
                }
            }
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/login?error=auth_failed`)
}
