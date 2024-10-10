"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample team data (replace with your actual team data)
const teamMembers = [
  { name: "Alice Johnson", role: "UI/UX Designer", image: "/placeholder.svg?height=400&width=400", portfolio: "#" },
  { name: "Bob Smith", role: "Frontend Developer", image: "/placeholder.svg?height=400&width=400", portfolio: "#" },
  { name: "Carol Williams", role: "Backend Developer", image: "/placeholder.svg?height=400&width=400", portfolio: "#" },
]

export function TeamMemberCardComponent() {
  const [currentMember, setCurrentMember] = useState(0)

  const nextMember = () => {
    setCurrentMember((prev) => (prev + 1) % teamMembers.length)
  }

  const prevMember = () => {
    setCurrentMember((prev) => (prev - 1 + teamMembers.length) % teamMembers.length)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-100 to-red-400">
      <motion.div
        className="bg-white rounded-3xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <div className="relative w-80 h-[28rem] bg-gradient-to-br from-orange-400 to-red-500 p-6 flex flex-col justify-between">
            <div className="absolute top-4 right-4 flex space-x-2">
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMember}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <motion.img
                  src={teamMembers[currentMember].image}
                  alt={teamMembers[currentMember].name}
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
                <motion.h2 className="mt-4 text-2xl font-bold text-white text-center">
                  {teamMembers[currentMember].name}
                </motion.h2>
                <motion.p className="text-white/80 text-center">{teamMembers[currentMember].role}</motion.p>
              </motion.div>
            </AnimatePresence>
            <motion.a
              href={teamMembers[currentMember].portfolio}
              className="mt-6 bg-white text-orange-500 py-2 px-4 rounded-full font-semibold text-center 
                        shadow-lg hover:bg-orange-100 transition-colors duration-300 hover:shadow-xl transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Portfolio
            </motion.a>
          </div>
          <div className="relative w-80 h-[28rem] bg-gradient-to-br from-orange-400 to-red-500 p-6 flex flex-col justify-between">
            <div className="absolute top-4 right-4 flex space-x-2">
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={currentMember}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center"
              >
                <motion.img
                  src={teamMembers[currentMember].image}
                  alt={teamMembers[currentMember].name}
                  className="w-40 h-40 rounded-full border-4 border-white shadow-lg"
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 10 }}
                />
                <motion.h2 className="mt-4 text-2xl font-bold text-white text-center">
                  {teamMembers[currentMember].name}
                </motion.h2>
                <motion.p className="text-white/80 text-center">{teamMembers[currentMember].role}</motion.p>
              </motion.div>
            </AnimatePresence>
            <motion.a
              href={teamMembers[currentMember].portfolio}
              className="mt-6 bg-white text-orange-500 py-2 px-4 rounded-full font-semibold text-center 
                        shadow-lg hover:bg-orange-100 transition-colors duration-300 hover:shadow-xl transform hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Visit Portfolio
            </motion.a>
          </div>
        </div>

      </motion.div>
    </div>
  )
}