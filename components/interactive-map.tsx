"use client"

import { useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Map, Navigation, Maximize2, Minimize2, MapPin, Waves } from "lucide-react"

export function InteractiveMap() {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Initialize map - in production, use Mapbox, Google Maps, or Leaflet
    // For now, we'll show a static representation with embedded iframe
    if (mapRef.current) {
      mapRef.current.innerHTML = `
        <iframe
          width="100%"
          height="400"
          frameborder="0"
          style="border:0"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.1234567890123!2d3.3!3d6.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b9c9c9c9c9c9d%3A0x9c9c9c9c9c9c9c9c!2sIlashe%20Beach!5e0!3m2!1sen!2sng!4v1234567890"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          class="rounded-lg"
        ></iframe>
      `
    }
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle>Beach Location</CardTitle>
        <CardDescription>Find Ilashe Beach on the map</CardDescription>
      </CardHeader>
      <CardContent>
        <div ref={mapRef} className="rounded-lg overflow-hidden bg-muted h-96">
          {/* Map will be loaded here */}
        </div>
        <div className="mt-6 p-4 bg-card rounded-lg border border-border">
          <p className="text-sm text-muted-foreground mb-2">
            <strong>Ilashe Beach</strong>
          </p>
          <p className="text-sm text-muted-foreground mb-4">
            Located in Lagos, Nigeria. A beautiful coastal destination perfect for surfing, photography, and community
            gatherings.
          </p>
          <div className="flex gap-4 text-sm">
            <span className="text-muted-foreground flex items-center gap-1"><MapPin className="w-4 h-4" /> GPS: 6.5°N, 3.3°E</span>
            <span className="text-muted-foreground flex items-center gap-1"><Waves className="w-4 h-4" /> Ideal Visit: Oct-Dec</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
