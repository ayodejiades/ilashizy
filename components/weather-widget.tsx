"use client"

import { useEffect, useState } from "react"
import { Sun } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface WeatherData {
  temp: number
  condition: string
  humidity: number
  windSpeed: number
  feelsLike: number
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate weather data - in production, connect to a real weather API
    const fetchWeather = async () => {
      try {
        // Using a mock weather API response
        // In production, use services like OpenWeatherMap or WeatherAPI
        const mockWeatherData: WeatherData = {
          temp: 28,
          condition: "Sunny",
          humidity: 65,
          windSpeed: 15,
          feelsLike: 30,
        }
        setWeather(mockWeatherData)
      } catch (error) {
        console.error("Error fetching weather:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Beach Weather</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">Loading weather data...</p>
        </CardContent>
      </Card>
    )
  }

  if (!weather) {
    return null
  }

  return (
    <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 border-blue-200 dark:border-blue-800">
      <CardHeader>
        <CardTitle>Beach Weather Today</CardTitle>
        <CardDescription>Current conditions at Ilashe Beach</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Sun className="w-16 h-16 text-black" strokeWidth={1.5} />
            <div>
              <div className="text-4xl font-bold text-primary">{weather.temp}°C</div>
              <div className="text-lg text-muted-foreground">{weather.condition}</div>
              <div className="text-sm text-muted-foreground">Feels like {weather.feelsLike}°C</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
            <div>
              <p className="text-sm text-muted-foreground">Humidity</p>
              <p className="text-lg font-semibold text-foreground">{weather.humidity}%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Wind Speed</p>
              <p className="text-lg font-semibold text-foreground">{weather.windSpeed} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
