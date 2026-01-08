'use server'

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function checkAndAwardBadges(userId: string) {
    const supabase = await createClient()

    // 1. Get current booking count
    const { count: bookingCount, error: countError } = await supabase
        .from('place_bookings')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', userId)

    if (countError) {
        console.error("Error counting bookings:", countError)
        return
    }

    const count = bookingCount || 0
    const badgesToAward = []

    // 2. Define criteria
    // "First Wave" -> 1 booking
    if (count >= 1) {
        badgesToAward.push('First Wave')
    }

    // "Island Explorer" -> 3 bookings
    if (count >= 3) {
        badgesToAward.push('Island Explorer')
    }

    // 3. Process awards
    for (const badgeName of badgesToAward) {
        // Find badge ID
        const { data: badge } = await supabase
            .from('badges')
            .select('id')
            .eq('name', badgeName)
            .single()

        if (badge) {
            // Try to insert (ignore if exists due to unique constraint)
            await supabase
                .from('user_badges')
                .insert({
                    user_id: userId,
                    badge_id: badge.id
                })
                .ignore()
        }
    }

    revalidatePath('/profile')
}
