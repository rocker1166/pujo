'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Star, 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  Send 
} from 'lucide-react'

interface PandalData {
  id: number
  title: string
  images: string[]
  rating: number
  location: string
  date: string
  time: string
  description: string
  crowdLevel: string
  latitude: number
  longitude: number
}

interface Comment {
  id: number
  text: string
  author: string
}

export default function PandalShowcase() {
  const { id } = useParams()
  const [pandalData, setPandalData] = useState<PandalData | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState('')
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check local storage for existing data
        const storedData = localStorage.getItem(`pandal_${id}`);
        if (storedData) {
          setPandalData(JSON.parse(storedData));
          return; // Return early if data exists in local storage
        }

        // Fetch data from API if not found in local storage
        const response = await fetch(`/api/pandal/${id}`)
        if (!response.ok) {
          throw new Error('Failed to fetch pandal data')
        }
        const data = await response.json()

        // Store data in local storage
        localStorage.setItem(`pandal_${id}`, JSON.stringify(data));
        setPandalData(data);
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setUserLocation({ latitude, longitude })
          console.log('User location:', { latitude, longitude })
        },
        (error) => {
          console.error('Error getting location:', error)
        }
      )
    } else {
      console.log('Geolocation is not supported by this browser.')
    }
  }, [id])

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newComment.trim()) {
      setComments([...comments, { id: Date.now(), text: newComment, author: 'Anonymous' }])
      setNewComment('')
    }
  }

  if (!pandalData) {
    return (
      <div className="flex items-center justify-center min-h-screen p-10">
        <div className="text-xl text-gray-500">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-fit w-full py-20 px-2 sm:px-4 md:px-6  overflow-hidden">
      <div className="max-w-full mx-auto border border-black backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden">
        <div className="flex flex-col lg:flex-row w-full h-full">
          {/* Left Section */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-2/3 w-full p-6"
          >
            <h1 className="text-4xl font-extrabold text-white mb-4">{pandalData.title}</h1>
            <Carousel className="w-full mb-6 rounded-lg overflow-hidden shadow">
              <CarouselContent>
                {pandalData.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative h-64 sm:h-80 lg:h-96">
                      <Image
                        src={image}
                        alt={`Pandal image ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-2 top-1/2 transform -translate-y-1/2  bg-opacity-75 rounded-full p-2 shadow hover:bg-opacity-100 transition" />
              <CarouselNext className="absolute right-2 top-1/2 transform -translate-y-1/2  bg-opacity-75 rounded-full p-2 shadow hover:bg-opacity-100 transition" />
            </Carousel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="flex items-center text-yellow-500">
                <Star className="w-5 h-5 mr-2" />
                <span className="font-semibold text-lg">{pandalData.rating} / 5</span>
              </div>
              <div className="flex items-center text-green-600">
                <MapPin className="w-5 h-5 mr-2" />
                <span className="text-lg">{pandalData.location}</span>
              </div>
              <div className="flex items-center text-purple-600">
                <Calendar className="w-5 h-5 mr-2" />
                <span className="text-lg">{new Date(pandalData.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center text-blue-600">
                <Clock className="w-5 h-5 mr-2" />
                <span className="text-lg">{pandalData.time}</span>
              </div>
              <div className="flex items-center text-red-600">
                <Users className="w-5 h-5 mr-2" />
                <span className="text-lg">Crowd Level: {pandalData.crowdLevel}</span>
              </div>
            </div>
            <p className="text-gray-700 mb-6">{pandalData.description}</p>
            {userLocation && (
              <div className="p-4 bg-blue-100 rounded-lg mb-6 shadow">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">Your Current Location</h3>
                <p className="text-blue-600">Latitude: {userLocation.latitude.toFixed(6)}</p>
                <p className="text-blue-600">Longitude: {userLocation.longitude.toFixed(6)}</p>
              </div>
            )}
          </motion.div>

          {/* Right Section */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:w-1/3 w-full backdrop-blur-xl border border-blue-600 p-6 flex flex-col"
          >
            {/* Comments Section */}
            <div className="mb-6 flex-grow">
              <h2 className="text-2xl font-semibold text-white mb-4">Comments</h2>
              <form onSubmit={handleCommentSubmit} className="mb-4">
                <Input
                  type="text"
                  placeholder="Add a comment..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="mb-2"
                />
                <Button type="submit" className="w-full bg-orange-600 text-white hover:bg-orange-700 transition">
                  Post Comment
                </Button>
              </form>
              <div className="space-y-4 max-h-64 overflow-y-auto">
                {comments.length === 0 ? (
                  <p className="text-gray-500">No comments yet. Be the first to comment!</p>
                ) : (
                  comments.map((comment) => (
                    <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
                      <p className="text-gray-800">{comment.text}</p>
                      <p className="text-sm text-gray-500 mt-1">- {comment.author}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
            {/* Map Placeholder */}
            <div className="h-64 bg-green-500 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow">
              Map Component Placeholder
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
