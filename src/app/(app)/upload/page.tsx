"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Calendar, Clock, MapPin, Star, Users, Info, Upload, X } from 'lucide-react'
import { motion } from 'framer-motion'
import AddressAutocompleteMap from '../../../components/Upmap'
import { UploadButton } from "@/utils/uploadthing"

const crowdLevels = ['Low', 'Medium', 'High', 'VeryHigh', 'Extreme']

export default function AddPujoEvent() {
  const router = useRouter()

  const [title, setTitle] = useState('')
  const [images, setImages] = useState<string[]>([])
  const [rating, setRating] = useState(4.5)
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('6:00 AM - 9:00 PM')
  const [description, setDescription] = useState('')
  const [crowdLevel, setCrowdLevel] = useState('Medium')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate all fields
    if (!title.trim()) {
      setError('Title is required.')
      setIsSubmitting(false)
      return
    }
    if (images.length === 0) {
      setError('At least one image is required.')
      setIsSubmitting(false)
      return
    }
    if (rating < 0 || rating > 5) {
      setError('Rating must be between 0 and 5.')
      setIsSubmitting(false)
      return
    }
    if (!location.trim()) {
      setError('Location is required.')
      setIsSubmitting(false)
      return
    }
    if (!date) {
      setError('Date is required.')
      setIsSubmitting(false)
      return
    }
    if (!time.trim()) {
      setError('Time is required.')
      setIsSubmitting(false)
      return
    }
    if (!description.trim()) {
      setError('Description is required.')
      setIsSubmitting(false)
      return
    }
    if (!latitude || !longitude) {
      setError('Please select a location on the map.')
      setIsSubmitting(false)
      return
    }

    const selectedDate = new Date(date)
    const today = new Date()
    if (selectedDate < today) {
      setError('Date must be in the future.')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/pujo-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          images,
          rating,
          location,
          date,
          time,
          description,
          crowdLevel,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Something went wrong.')
      } else {
        localStorage.removeItem('pujoEvents')
        localStorage.removeItem('pujoEventsTimestamp')
        router.push('/explore')
      }
    } catch (err) {
      setError('An unexpected error occurred.')
      console.error(err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleMapCoordinatesChange = (lat: string, lng: string) => {
    setLatitude(lat)
    setLongitude(lng)
  }

  const handleImageUpload = (res: any[]) => {
    const newImages = res.map(file => file.url)
    setImages(prevImages => [...prevImages, ...newImages])
  }

  const removeImage = (index: number) => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index))
  }

  return (
    <div className="flex flex-col items-center p-6 min-h-screen my-10 ">
      <motion.h1
        className="text-4xl font-bold text-white mb-6 "
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Locate New Pujo Pandal      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl    backdrop-blur-xl p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error && <p className="text-red-500 mb-4 p-2 bg-red-100 rounded">{error}</p>}

        <div className="mb-4">
          <Label htmlFor="title" className="text-white flex items-center ">
            <Info className="w-4 h-4 mr-2" />
            Pandal Name
          </Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="ex- sontosh mitra square"
            className="mt-1 rounded-xl"
          />
        </div>

        <div className="mb-4">
          <Label className="text-white flex items-center mb-2">
            <Upload className="w-4 h-4 mr-2" />
            Image Upload
          </Label>
          <UploadButton 
          className='rounded-lg'
            endpoint="imageUploader"
            onClientUploadComplete={handleImageUpload}
            onUploadError={(error: Error) => {
              alert(`ERROR! ${error.message}`)
            }}
          />
          <div className="mt-2 flex flex-wrap gap-2">
            {images.map((image, index) => (
              <div key={index} className="relative">
                <Image src={image} alt={`Uploaded preview ${index + 1}`} width={100} height={100} className="rounded" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                  title="Remove image"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <Label htmlFor="rating" className="text-white flex items-center">
            <Star className="w-4 h-4 mr-2" />
            Rating
          </Label>
          <Input
            id="rating"
            type="number"
            step="0.1"
            min="0"
            max="5"
            value={rating}
            onChange={(e) => setRating(Number.parseFloat(e.target.value))}
            required
            placeholder="4.5"
            className="mt-1 rounded-xl"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="location" className="text-white flex items-center">
            <MapPin className="w-4 h-4 mr-2" />
            Location
          </Label>
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Event Location"
            className="mt-1 rounded-xl"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="date" className="text-white flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            Visit Date
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1 rounded-xl"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="time" className="text-white flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            Open and Closing time
          </Label>
          <Input
            id="time"
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            placeholder="e.g., 6:00 AM - 9:00 AM"
            className="mt-1 rounded-xl"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="description" className="text-white flex items-center">
            <Info className="w-4 h-4 mr-2" />
           Pandal Review
          </Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Pandal review"
            className="mt-1 rounded-xl"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="crowdLevel" className="text-white flex items-center">
            <Users className="w-4 h-4 mr-2" />
            Crowd Level
          </Label>
          <Select onValueChange={(value) => setCrowdLevel(value)} defaultValue="Medium">
            <SelectTrigger className="w-full mt-1">
              <SelectValue placeholder="Select Crowd Level" />
            </SelectTrigger>
            <SelectContent>
              {crowdLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {level.replace(/([A-Z])/g, ' $1').trim()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-6">
          <Label className="text-white flex items-center mb-2">
            <MapPin className="w-4 h-4 mr-2" />
            Event Location on Map
          </Label>
          <AddressAutocompleteMap onCoordinatesChange={handleMapCoordinatesChange} />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full rounded-xl bg-rose-600 hover:bg-festiveOrange">
          {isSubmitting ? 'Submitting...' : 'Add Event'}
        </Button>
      </motion.form>
    </div>
  )
}