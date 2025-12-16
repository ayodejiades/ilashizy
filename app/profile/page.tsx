"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Mail, Calendar, MapPin, Edit2, Camera, Star, LogOut } from "lucide-react"
import { Aladin } from 'next/font/google'
import { Footer } from "@/components/footer"

const aladin = Aladin({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    display_name: "",
    bio: "",
    location: "",
    website: ""
  })
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error || !user) {
        router.push("/auth/login")
      } else {
        setUser(user)
        // Fetch additional profile data if it exists in a separate table
        const { data: profile } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (profile) {
          setProfileData({
            display_name: profile.display_name || user.user_metadata?.display_name || "",
            bio: profile.bio || "",
            location: profile.location || "",
            website: profile.website || ""
          })
        } else {
          setProfileData({
            display_name: user.user_metadata?.display_name || "",
            bio: "",
            location: "",
            website: ""
          })
        }
      }
      setLoading(false)
    }
    getUser()
  }, [router, supabase])

  const handleUpdateProfile = async () => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          ...profileData,
          updated_at: new Date().toISOString(),
        })

      if (error) throw error

      // Also update auth metadata for display name
      if (profileData.display_name !== user.user_metadata?.display_name) {
        await supabase.auth.updateUser({
          data: { display_name: profileData.display_name }
        })
      }

      setIsEditing(false)
      // Show success message (could add toast here)
    } catch (error) {
      console.error('Error updating profile:', error)
    }
  }

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-cyan-300 selection:text-blue-900">
      {/* Header - Matching Landing Page */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all duration-300 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
          <Link href="/" className={`text-3xl brand-title text-blue-600 tracking-wider hover:opacity-80 transition-opacity ${aladin.className}`}>ILASHIZY</Link>
          <div className="hidden md:flex gap-8">
            <Link href="/dashboard" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Dashboard</Link>
            <Link href="/activities" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Activities</Link>
            <Link href="/gallery" className="text-slate-700 hover:text-blue-600 transition-colors text-lg font-bold">Gallery</Link>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={handleSignOut}
              className="bg-blue-600 text-white hover:bg-blue-700 px-6 py-2 text-lg font-bold rounded-full transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 border-none"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="pt-32 pb-12 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="rounded-[2rem] border-slate-100 shadow-xl bg-white/90 backdrop-blur-sm overflow-hidden">
              <div className="h-32 bg-gradient-to-r from-blue-400 to-cyan-400"></div>
              <CardContent className="relative pt-0 pb-8 px-6 text-center">
                <div className="relative -mt-16 mb-4 inline-block">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={user?.user_metadata?.avatar_url} />
                    <AvatarFallback className="bg-blue-100 text-blue-600 text-4xl font-bold">
                      {profileData.display_name?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {isEditing && (
                    <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full shadow-md">
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {isEditing ? (
                  <div className="space-y-4 text-left">
                    <div>
                      <Label htmlFor="display_name">Display Name</Label>
                      <Input
                        id="display_name"
                        value={profileData.display_name}
                        onChange={(e) => setProfileData({ ...profileData, display_name: e.target.value })}
                        className="rounded-xl border-slate-200 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="rounded-xl border-slate-200 focus:ring-indigo-500"
                        placeholder="Tell us about yourself..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        className="rounded-xl border-slate-200 focus:ring-indigo-500"
                        placeholder="City, Country"
                      />
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button onClick={handleUpdateProfile} className="flex-1 rounded-full bg-blue-600 hover:bg-blue-700">Save</Button>
                      <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1 rounded-full">Cancel</Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className={`text-3xl font-bold text-slate-900 mb-1 ${aladin.className}`}>
                      {profileData.display_name || "User"}
                    </h1>
                    <p className="text-slate-500 mb-4">{user?.email}</p>
                    {profileData.bio && (
                      <p className="text-slate-600 mb-4 italic">"{profileData.bio}"</p>
                    )}

                    <div className="flex flex-col gap-2 text-sm text-slate-500 mb-6">
                      {profileData.location && (
                        <div className="flex items-center justify-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {profileData.location}
                        </div>
                      )}
                      <div className="flex items-center justify-center gap-2">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(user?.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <Button onClick={() => setIsEditing(true)} className="w-full rounded-full bg-white text-indigo-600 border-2 border-indigo-100 hover:bg-indigo-50 hover:border-indigo-200 shadow-sm">
                      <Edit2 className="w-4 h-4 mr-2" />
                      Edit Profile
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="rounded-2xl border-none shadow-md bg-white/60 backdrop-blur-sm p-4 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Bookings</div>
              </Card>
              <Card className="rounded-2xl border-none shadow-md bg-white/60 backdrop-blur-sm p-4 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="text-2xl font-bold text-cyan-600">0</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Photos</div>
              </Card>
              <Card className="rounded-2xl border-none shadow-md bg-white/60 backdrop-blur-sm p-4 text-center hover:-translate-y-1 transition-transform duration-300">
                <div className="text-2xl font-bold text-blue-500">0</div>
                <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">Reviews</div>
              </Card>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="bookings" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-slate-100 rounded-full p-1">
                <TabsTrigger value="bookings" className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white">My Bookings</TabsTrigger>
                <TabsTrigger value="photos" className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white">My Photos</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-full data-[state=active]:bg-blue-600 data-[state=active]:text-white">My Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="bookings" className="space-y-6">
                <Card className="rounded-[2rem] border-none shadow-lg bg-white/80 backdrop-blur-sm min-h-[400px] flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <Calendar className="w-10 h-10 text-blue-300" />
                  </div>
                  <h3 className={`text-2xl text-slate-800 mb-2 ${aladin.className}`}>No Bookings Yet</h3>
                  <p className="text-slate-500 max-w-md mb-8">
                    You haven't made any bookings yet. Explore our activities and find your next adventure!
                  </p>
                  <Link href="/activities">
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-8">
                      Explore Activities
                    </Button>
                  </Link>
                </Card>
              </TabsContent>

              <TabsContent value="photos" className="space-y-6">
                <Card className="rounded-[2rem] border-none shadow-lg bg-white/80 backdrop-blur-sm min-h-[400px] flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-cyan-50 rounded-full flex items-center justify-center mb-6">
                    <Camera className="w-10 h-10 text-cyan-300" />
                  </div>
                  <h3 className={`text-2xl text-slate-800 mb-2 ${aladin.className}`}>No Photos Uploaded</h3>
                  <p className="text-slate-500 max-w-md mb-8">
                    Share your memories with the community. Upload photos from your activities!
                  </p>
                  <Link href="/gallery">
                    <Button className="rounded-full bg-blue-600 hover:bg-blue-700 px-8">
                      Go to Gallery
                    </Button>
                  </Link>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card className="rounded-[2rem] border-none shadow-lg bg-white/80 backdrop-blur-sm min-h-[400px] flex flex-col items-center justify-center text-center p-8">
                  <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-6">
                    <Star className="w-10 h-10 text-blue-300" />
                  </div>
                  <h3 className={`text-2xl text-slate-800 mb-2 ${aladin.className}`}>No Reviews Written</h3>
                  <p className="text-slate-500 max-w-md mb-8">
                    Your feedback matters! Review your past activities to help others.
                  </p>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </main>
    </div>
  )
}
