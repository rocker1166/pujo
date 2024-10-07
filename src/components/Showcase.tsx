
"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue } from "framer-motion"
import { Star, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import { usePujoEvents, type PujoEvent } from '../hooks/usePujoEvents' // Adjust the import path as needed

const AnimatedStar = ({ filled }: { filled: boolean }) => (
  <Star
    className={`h-6 w-6 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill={filled ? "currentColor" : "none"}
    strokeWidth={2}
  />
)

export default function PujopandelCarousel() {
  const { events: pujoEvents, loading, error } = usePujoEvents()
  const [duplicatedEvents, setDuplicatedEvents] = useState<PujoEvent[]>([])
  const carouselRef = useRef<HTMLDivElement>(null)
  const [autoScroll, setAutoScroll] = useState(true)

  useEffect(() => {
    if (pujoEvents.length > 0) {
      // Duplicate events to make the carousel seamless
      setDuplicatedEvents([...pujoEvents, ...pujoEvents, ...pujoEvents])
    }
  }, [pujoEvents])

  const x = useMotionValue(0)
  const baseVelocity = -0.5

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const resetPosition = () => {
      const currentX = x.get()
      const containerWidth = carouselRef.current?.scrollWidth || 0
      const viewportWidth = carouselRef.current?.offsetWidth || 0

      if (Math.abs(currentX) >= containerWidth - viewportWidth) {
        x.set(0)
      }
    }

    const autoScrollAnimation = () => {
      if (autoScroll) {
        x.set(x.get() + baseVelocity)
        resetPosition()
      }
      timeoutId = setTimeout(autoScrollAnimation, 16) // roughly 60fps
    }

    autoScrollAnimation()

    return () => {
      clearTimeout(timeoutId)
    }
  }, [x, autoScroll, baseVelocity])

  if (loading) {
    return <p className="text-white">Loading events...</p>
  }

  if (error) {
    return <p className="text-red-500">{error}</p>
  }

  return (
    <section className="py-24 overflow-hidden w-full ">
      <div className="w-full px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-12 tracking-tight">
          Durga Pujo Extravaganza
        </h2>
        <div className="relative">
          <motion.div
            ref={carouselRef}
            className="overflow-hidden"
            onHoverStart={() => setAutoScroll(false)}
            onHoverEnd={() => setAutoScroll(true)}
          >
            <motion.div
              style={{ x }}
              className="flex"
              drag="x"
              dragConstraints={carouselRef}
            >
              {duplicatedEvents.map((event, index) => (
                <motion.div
                  key={`${event.id}-${index}`}
                  className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-2"
                  whileHover={{ scale: 1.05, zIndex: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link href={`/explore/pandal/${event.id}`} className="block h-full">
                    <div className="bg-white rounded-xl shadow-2xl overflow-hidden h-full flex flex-col transform transition-all duration-300 hover:shadow-orange-300/50 cursor-pointer">
                      <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                        <motion.img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3 }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                        <h3 className="absolute bottom-4 left-4 text-xl sm:text-2xl font-bold text-white tracking-wide">{event.title}</h3>
                      </div>
                      <div className="p-4 sm:p-6 flex-grow flex flex-col justify-between bg-gradient-to-b from-orange-50 to-yellow-50">
                        <div className="space-y-3">
                          <div className="flex items-center text-gray-700">
                            <Calendar className="h-5 w-5 mr-2 text-orange-500" />
                            <span className="text-sm sm:text-base">{event.date}</span>
                          </div>
                          <div className="flex items-center text-gray-700">
                            <MapPin className="h-5 w-5 mr-2 text-orange-500" />
                            <span className="text-sm sm:text-base">{event.location}</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <AnimatedStar key={star} filled={star <= Math.floor(event.rating)} />
                            ))}
                          </div>
                          <span className="text-xl sm:text-2xl font-bold text-orange-600">{event.rating.toFixed(1)}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <div className="absolute top-0 left-0 w-16 sm:w-32 h-full bg-gradient-to-r from-orange-500 to-transparent pointer-events-none" />
          <div className="absolute top-0 right-0 w-16 sm:w-32 h-full bg-gradient-to-l from-yellow-500 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  )
}
