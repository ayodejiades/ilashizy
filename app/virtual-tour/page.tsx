"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"

export default function VirtualTourPage() {
  const [currentScene, setCurrentScene] = useState(0)

  const scenes = [
    {
      id: 0,
      title: "Beach Entrance",
      description: "Welcome to Ilashe Beach! This is where your adventure begins.",
      icon: "Entry",
      details: [
        "White sand beach stretching for miles",
        "Welcoming beach huts and facilities",
        "Parking area and amenities nearby",
      ],
    },
    {
      id: 1,
      title: "Golden Hour Sunset",
      description: "Witness the breathtaking sunset at Ilashe Beach during golden hour.",
      icon: "Sunset",
      details: ["Stunning orange and pink skies", "Perfect photography spot", "Best time: 5:30 PM - 7:00 PM"],
    },
    {
      id: 2,
      title: "Water Activities Zone",
      description: "Where tourists enjoy boat tours and water sports.",
      icon: "Water",
      details: ["Boat tour departure point", "Watersport equipment rental", "Safety briefing area"],
    },
    {
      id: 3,
      title: "Local Market",
      description: "Vibrant community market with local crafts and food.",
      icon: "Market",
      details: ["Fresh seafood and local delicacies", "Handmade crafts and souvenirs", "Open daily from 6 AM - 8 PM"],
    },
    {
      id: 4,
      title: "Beachside Dining",
      description: "Enjoy delicious meals with a view at beachside restaurants.",
      icon: "Dining",
      details: ["Fresh grilled fish and local cuisine", "Ocean view seating", "Live music on weekends"],
    },
    {
      id: 5,
      title: "Community Gathering Spot",
      description: "Where locals and tourists gather for beach volleyball and picnics.",
      icon: "Group",
      details: ["Beach volleyball courts", "Picnic areas with tables", "Evening gathering point"],
    },
  ]

  const scene = scenes[currentScene]

  return (
    <main className="min-h-screen bg-gradient-to-b from-sky-50 to-white dark:from-slate-900 dark:to-slate-950">
      {/* Navigation */}
      <nav className="border-b border-border bg-white dark:bg-slate-900 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-primary">
            ILASHIZY
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/activities" className="text-foreground hover:text-primary">
              Activities
            </Link>
            <form action="/api/auth/logout" method="POST">
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </nav>

      {/* Virtual Tour */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-foreground mb-4">360° Virtual Beach Tour</h1>
          <p className="text-xl text-muted-foreground">Explore Ilashe Beach from anywhere in the world</p>
        </div>

        {/* Main Scene Display */}
        <Card className="mb-8 overflow-hidden">
          <div className="aspect-video bg-gradient-to-br from-sky-300 to-blue-400 dark:from-sky-900 dark:to-blue-900 flex flex-col items-center justify-center p-8 text-center">
            <div className="text-8xl mb-6">{scene.icon}</div>
            <h2 className="text-4xl font-bold text-white mb-2">{scene.title}</h2>
            <p className="text-lg text-white/90 max-w-2xl">{scene.description}</p>
          </div>
          <CardContent className="pt-6">
            <div className="grid md:grid-cols-3 gap-4">
              {scene.details.map((detail, idx) => (
                <div key={idx} className="p-3 bg-card border border-border rounded-lg">
                  <p className="text-sm text-foreground">{detail}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Scene Navigation */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Select a Location</CardTitle>
            <CardDescription>
              Scene {currentScene + 1} of {scenes.length}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-3">
              {scenes.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setCurrentScene(s.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${currentScene === s.id ? "border-primary bg-primary/10" : "border-border hover:border-primary"
                    }`}
                >
                  <div className="text-3xl mb-2">{s.icon}</div>
                  <p className="font-semibold text-foreground text-sm">{s.title}</p>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="flex gap-4 justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentScene(Math.max(0, currentScene - 1))}
            disabled={currentScene === 0}
          >
            Previous Scene
          </Button>
          <Button
            onClick={() => setCurrentScene(Math.min(scenes.length - 1, currentScene + 1))}
            disabled={currentScene === scenes.length - 1}
          >
            Next Scene
          </Button>
        </div>
      </section>
    </main>
  )
}
