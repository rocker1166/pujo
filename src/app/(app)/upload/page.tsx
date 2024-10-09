// app/add-pujo-event/page.tsx

"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, MapPin, Star, Users, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import AddressAutocompleteMap from '../../../components/Upmap';
import { div } from 'framer-motion/client';

const crowdLevels = ['Low', 'Medium', 'High', 'VeryHigh', 'Extreme'];

export default function AddPujoEvent() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [rating, setRating] = useState(4.5);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [description, setDescription] = useState('');
  const [crowdLevel, setCrowdLevel] = useState('Medium');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Basic client-side validation
    if (!title || !image || !rating || !location || !date || !time || !description || !crowdLevel || !latitude || !longitude) {
      setError('All fields are required.');
      setIsSubmitting(false);
      return;
    }

    // Additional validations
    const imageUrlPattern = /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|svg))$/i;
    if (!imageUrlPattern.test(image)) {
      setError('Please enter a valid image URL.');
      setIsSubmitting(false);
      return;
    }

    if (rating < 0 || rating > 5) {
      setError('Rating must be between 0 and 5.');
      setIsSubmitting(false);
      return;
    }

    const selectedDate = new Date(date);
    const today = new Date();
    if (selectedDate < today) {
      setError('Date must be in the future.');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/pujo-events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          image,
          rating,
          location,
          date,
          time,
          description,
          crowdLevel,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Something went wrong.');
      } else {
        // Clear the cache
        localStorage.removeItem('pujoEvents');
        localStorage.removeItem('pujoEventsTimestamp');

        // Redirect to the main events page or show a success message
        router.push('/explore');
      }
    } catch (err) {
      setError('An unexpected error occurred.');
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMapCoordinatesChange = (lat: string, lng: string) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <div className="flex flex-col items-center p-6 min-h-screen bg-gray-900">
      <motion.h1
        className="text-4xl font-bold text-white mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Add New Pujo Event
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-gray-800 p-8 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error && <p className="text-red-500 mb-4">{error}</p>}

        <div className="mb-4">
          <Label htmlFor="title" className="text-white">Title</Label>
          <Input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Event Title"
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="image" className="text-white">Image URL</Label>
          <Input
            id="image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
            placeholder="https://example.com/image.jpg"
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="rating" className="text-white">Rating</Label>
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
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="location" className="text-white">Location</Label>
          <Input
            id="location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            placeholder="Event Location"
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="date" className="text-white">Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="time" className="text-white">Time</Label>
          <Input
            id="time"
            type="text"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
            placeholder="e.g., 6:00 AM - 9:00 AM"
            className="mt-1"
          />
        </div>

        <div className="mb-4">
          <Label htmlFor="description" className="text-white">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Event Description"
            className="mt-1"
            rows={4}
          />
        </div>

        <div className="mb-6">
          <Label htmlFor="crowdLevel" className="text-white">Crowd Level</Label>
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
          <Label className="text-white mb-2 block">Event Location on Map</Label>
          <AddressAutocompleteMap onCoordinatesChange={handleMapCoordinatesChange} />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? 'Submitting...' : 'Add Event'}
        </Button>
      </motion.form>
    </div>
  );
}