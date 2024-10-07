"use client"

import { useState } from "react"
import { MapPin, Star, Users, Calendar, Clock, Info } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link" // Import Link from next/link
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const pujoEvents = [
  { id: 1, title: "Mahalaya Magic", image: "https://res.cloudinary.com/saas-cloud/image/upload/v1724137551/next-cloudinary-uploads/mipnfffbfdczufq8ejlp.jpg", rating: 4.8, location: "Kolkata", date: "Oct 14, 2024", time: "6:00 AM - 9:00", description: "Experience the enchanting Mahalaya celebrations with soul-stirring Chandipath and mesmerizing cultural performances.", crowdLevel: "High" },
  { id: 2, title: "Bodhan Bliss", image: "https://res.cloudinary.com/saas-cloud/image/upload/v1723529241/samples/animals/reindeer.jpg", rating: 4.6, location: "Howrah", date: "Oct 15, 2024", time: "4:00 PM - 8:00", description: "Witness the divine invocation of Goddess Durga with traditional rituals and bhog offerings.", crowdLevel: "Medium" },
  { id: 3, title: "Sasthi Spectacle", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-3.jpg", rating: 4.9, location: "Salt Lake", date: "Oct 16, 2024", time: "5:00 PM - 10:00", description: "Join the grand unveiling of Durga idol and immerse yourself in festive fervor Sasthi.", crowdLevel: "Very High" },
  { id: 4, title: "Saptami Soiree", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-4.jpg", rating: 5.0, location: "Park Street", date: "Oct 17, 2024", time: "11:00 AM - 10:00 PM", description: "Indulge in a day-long celebration with elaborate pujas, cultural programs, and mouthwatering Bengali cuisine.", crowdLevel: "Extreme" },
  { id: 5, title: "Ashtami Extravaganza", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-5.jpg", rating: 4.7, location: "Ballygunge", date: "Oct 18, 2024", time: "6:00 AM - 11:00 PM", description: "Experience the pinnacle of Durga Puja with Pushpanjali, Kumari Puja, and a grand cultural evening.", crowdLevel: "Extreme" },
  { id: 6, title: "Navami Nights", image: "https://kcqcqxrwjjjgvwuqcxio.supabase.co/storage/v1/object/public/public-images/durga-puja-6.jpg", rating: 4.9, location: "New Town", date: "Oct 19, 2024", time: "4:00 PM - 12:00 AM", description: "Revel in the night-long festivities with Maha Arati, cultural performances, and a dazzling display of lights.", crowdLevel: "High" },
]

const crowdLevelColors = {
  "Low": "bg-green-100 text-green-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "High": "bg-orange-100 text-orange-800",
  "Very High": "bg-red-100 text-red-800",
  "Extreme": "bg-purple-100 text-purple-800",
}

export function Pujopandel() {
  const [activeFilter, setActiveFilter] = useState<"all" | "nearMe" | "highlyRated" | "highlyCrowded">("all")
  const [ratingFilter, setRatingFilter] = useState(4.5)

  const filteredEvents = pujoEvents.filter(event => {
    // Apply rating filter
    const meetsRating = event.rating >= ratingFilter

    // Apply active filter
    switch(activeFilter) {
      case "nearMe":
        // Implement your logic for 'nearMe' filter
        // For demonstration, assume 'nearMe' means location is "Kolkata" or "Howrah"
        return meetsRating && (event.location === "Kolkata" || event.location === "Howrah")
      case "highlyRated":
        return meetsRating && event.rating >= 4.8
      case "highlyCrowded":
        return meetsRating && (event.crowdLevel === "High" || event.crowdLevel === "Very High" || event.crowdLevel === "Extreme")

      default:
        return meetsRating
    }
  })

  return (
    <div className="flex flex-col items-center space-y-6 p-4 min-h-screen ">
      <motion.h1 
        className="text-4xl font-bold text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Durga Puja Events
      </motion.h1>
      
      <motion.div 
        className="w-full max-w-7xl backdrop-blur-lg p-6 rounded-lg shadow-lg border-blue-50"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-white mb-4">Filter Events</h2>
        
        <div className="mb-6">
          {/* biome-ignore lint/a11y/noLabelWithoutControl: <explanation> */}
<label className="text-lg font-medium text-white">Minimum Rating: {ratingFilter.toFixed(1)}</label>
          <Slider
            value={[ratingFilter]}
            onValueChange={(value) => setRatingFilter(value[0])}
            max={5}
            min={0}
            step={0.1}
            className="mt-2"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            variant={activeFilter === "all" ? "default" : "outline"}
            onClick={() => setActiveFilter("all")}
            className="flex-grow sm:flex-grow-0"
          >
            All
          </Button>
          <Button
            variant={activeFilter === "nearMe" ? "default" : "outline"}
            onClick={() => setActiveFilter("nearMe")}
            className="flex-grow sm:flex-grow-0"
          >
            <MapPin className="mr-2 h-4 w-4" />
            Near Me
          </Button>
          <Button
            variant={activeFilter === "highlyRated" ? "default" : "outline"}
            onClick={() => setActiveFilter("highlyRated")}
            className="flex-grow sm:flex-grow-0"
          >
            <Star className="mr-2 h-4 w-4" />
            Highly Rated
          </Button>
          <Button
            variant={activeFilter === "highlyCrowded" ? "default" : "outline"}
            onClick={() => setActiveFilter("highlyCrowded")}
            className="flex-grow sm:flex-grow-0"
          >
            <Users className="mr-2 h-4 w-4" />
            Highly Crowded
          </Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-7xl">
        {filteredEvents.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-slate-800 border-black rounded-2xl">
              <div className="relative">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className={`${crowdLevelColors[event.crowdLevel as keyof typeof crowdLevelColors]} px-2 py-1`}>
                    {event.crowdLevel} Crowd
                  </Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-orange-800">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-orange-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center text-orange-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium">{event.rating.toFixed(1)}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`explore/pandal/${event.id}`} passHref>
                          <Button variant="outline" size="sm" className="mt-2 w-full flex items-center justify-center">
                            <Info className="h-4 w-4 mr-2" />
                            Visit
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p className="max-w-xs text-sm">{event.description}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
