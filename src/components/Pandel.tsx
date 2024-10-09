"use client";

import { useState, useEffect } from "react";
import { MapPin, Star, Users, Calendar, Clock, Info, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { usePujoEvents, type PujoEvent } from "../hooks/usePujoEvents";
import Image from "next/image";

const crowdLevelColors: Record<PujoEvent["crowdLevel"], string> = {
  "Low": "bg-green-100 text-green-800",
  "Medium": "bg-yellow-100 text-yellow-800",
  "High": "bg-orange-100 text-orange-800",
  "VeryHigh": "bg-red-100 text-red-800",
  "Extreme": "bg-purple-100 text-purple-800",
};

export function Pujopandel() {
  const { events: pujoEvents, loading, error } = usePujoEvents();
  const [activeFilter, setActiveFilter] = useState<"all" | "nearMe" | "highlyRated" | "highlyCrowded">("all");
  const [ratingFilter, setRatingFilter] = useState(1);
  const [currentImageIndex, setCurrentImageIndex] = useState<Record<number, number>>({});

  useEffect(() => {
    const initialImageIndex: Record<number, number> = {};
    pujoEvents.forEach(event => {
      initialImageIndex[event.id] = 0;
    });
    setCurrentImageIndex(initialImageIndex);
  }, [pujoEvents]);

  const filteredEvents = pujoEvents.filter(event => {
    const meetsRating = event.rating >= ratingFilter;

    switch(activeFilter) {
      case "nearMe":
        return meetsRating && (event.location === "Kolkata" || event.location === "Howrah");
      case "highlyRated":
        return meetsRating && event.rating >= 4.8;
      case "highlyCrowded":
        return meetsRating && (event.crowdLevel === "High" || event.crowdLevel === "VeryHigh" || event.crowdLevel === "Extreme");
      default:
        return meetsRating;
    }
  });

  const nextImage = (eventId: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [eventId]: (prev[eventId] + 1) % (pujoEvents.find(e => e.id === eventId)?.images.length || 1)
    }));
  };

  const prevImage = (eventId: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [eventId]: (prev[eventId] - 1 + (pujoEvents.find(e => e.id === eventId)?.images.length || 1)) % (pujoEvents.find(e => e.id === eventId)?.images.length || 1)
    }));
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center space-y-6 p-4 my-10 min-h-screen">
      <motion.h1 
        className="text-4xl font-bold text-white"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Durga Puja Events
      </motion.h1>
      
      <motion.div 
        className="w-full max-w-7xl backdrop-blur-lg p-6 rounded-lg shadow-lg"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-white">Filter Events</h2>
          <Link href="/upload">
            <Button variant="default">Add New Pandal</Button>
          </Link>
        </div>
        
        <div className="mb-6">
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
            <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 bg-[url('/card.png')] rounded-2xl">
              <div className="relative">
                {event.images.length > 0 ? (
                  <img
                    src={event.images[currentImageIndex[event.id] || 0]} 
                    alt={`${event.title} - Image ${(currentImageIndex[event.id] || 0) + 1}`} 
                    className="w-full h-48 object-cover"
                 

                  />
                ) : (
                  <div className="w-full h-48 bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-500">No image available</span>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className={`${crowdLevelColors[event.crowdLevel]} px-2 py-1`}>
                    {event.crowdLevel.replace(/([A-Z])/g, ' $1').trim()} Crowd
                  </Badge>
                </div>
                {event.images.length > 1 && (
                  <>
                    <button 
                    title="d"
                      onClick={(e) => { e.preventDefault(); prevImage(event.id); }}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button 
                    title="r"
                      onClick={(e) => { e.preventDefault(); nextImage(event.id); }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-1"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                  </>
                )}
              </div>
              <CardHeader>
                <CardTitle className="text-xl text-white font-semibold">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center text-white">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  <div className="flex items-center text-white">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-1" />
                    <span className="text-sm font-medium text-white">{event.rating.toFixed(1)}</span>
                  </div>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/explore/${event.id}`} passHref>
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
  );
}