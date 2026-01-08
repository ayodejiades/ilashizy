"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useTranslation } from "@/lib/use-translation"
import { Waves, Ship, Camera, Fish, Footprints, Utensils, Flower2, Anchor, LifeBuoy } from "lucide-react"

const ICON_MAP: Record<string, any> = {
  Waves, Ship, Camera, Fish, Footprints, Utensils, Flower2, Anchor, LifeBuoy,
  Beach: Waves, // Aliases for backward compatibility or different naming
  Boat: Ship,
  Photo: Camera,
  Stay: LifeBuoy,
  Group: Footprints
}

interface ActivityCardProps {
  id: string
  title: string
  icon: string
  description: string
  available: boolean
  userRole?: string
  onToggleAvailability?: (id: string, available: boolean) => void
}

export function ActivityCard({
  id,
  title,
  icon,
  description,
  available,
  userRole,
  onToggleAvailability,
}: ActivityCardProps) {
  const { t } = useTranslation()
  const IconComponent = ICON_MAP[icon] || Waves

  return (
    <Card
      className={cn(
        "h-full transition-all duration-300 backdrop-blur-sm border-border/50",
        !available && "opacity-60",
        available && "hover:shadow-xl hover:scale-105 hover:border-primary/50",
      )}
    >
      <CardContent className="p-8 md:p-10 flex flex-col items-center text-center h-full relative">
        {/* Large Icon */}
        <div
          className={cn(
            "mb-8 transition-all duration-300 relative z-10 p-6 rounded-3xl bg-slate-50",
            available ? "text-blue-600 hover:scale-110" : "text-slate-300",
          )}
        >
          <IconComponent size={64} strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3 font-aladin">
          {t(`activity.${id}` as any) || title}
        </h3>

        {/* Availability Badge */}
        <div
          className={cn(
            "text-sm font-bold mb-4 px-4 py-1.5 rounded-full uppercase tracking-wider",
            available
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700",
          )}
        >
          {available ? t("activity.available" as any) : t("activity.unavailable" as any)}
        </div>

        {/* Description */}
        <p className="text-slate-500 mb-6 flex-grow text-base">
          {description}
        </p>

        {/* Actions */}
        {userRole === "service_provider" && onToggleAvailability ? (
          <Button
            variant={available ? "default" : "outline"}
            onClick={() => onToggleAvailability(id, !available)}
            className="w-full rounded-full py-6 font-bold"
          >
            {available ? t("activity.disable" as any) : t("activity.enable" as any)}
          </Button>
        ) : (
          <Link href={`/activities/${id}`} className="w-full">
            <Button disabled={!available} className="w-full rounded-full py-6 font-bold" variant={available ? "default" : "outline"}>
              {available ? t("activities.viewActivities" as any) : t("activity.unavailable" as any)}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
