"use client"

import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ActivityCardProps {
  id: string
  title: string
  icon: string
  description: string
  available: boolean
  userRole?: "tourist" | "service_provider"
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
            "text-7xl md:text-8xl mb-8 transition-all duration-300 relative z-10",
            available ? "hover:scale-125 hover:drop-shadow-lg" : "",
          )}
          style={{
            animation: available ? "bounce-subtle 3s ease-in-out infinite" : "none",
            filter: "drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1))",
          }}
        >
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">{title}</h3>

        {/* Availability Badge */}
        <div
          className={cn(
            "text-sm font-semibold mb-4 px-3 py-1 rounded-full",
            available
              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-100"
              : "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-100",
          )}
        >
          {available ? "Available" : "Currently Unavailable"}
        </div>

        {/* Description */}
        <p className="text-muted-foreground mb-6 flex-grow text-base">{description}</p>

        {/* Actions */}
        {userRole === "service_provider" && onToggleAvailability ? (
          <Button
            variant={available ? "default" : "outline"}
            onClick={() => onToggleAvailability(id, !available)}
            className="w-full"
          >
            {available ? "Disable Activity" : "Enable Activity"}
          </Button>
        ) : (
          <Link href={`/activities/${id}`} className="w-full">
            <Button disabled={!available} className="w-full" variant={available ? "default" : "outline"}>
              {available ? "View Details" : "Unavailable"}
            </Button>
          </Link>
        )}
      </CardContent>
    </Card>
  )
}
