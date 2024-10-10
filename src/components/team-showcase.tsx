"use client"

import { motion } from "framer-motion"

const teamMembers = [
  { id: 1, name: "Sumon Jana", role: "Full Stack Developer", image: "/placeholder.svg?height=400&width=400" },
  { id: 2, name: "Paramanand Ram", role: "Frontend Developer // UI/UX Designer", image: "/placeholder.svg?height=400&width=400" },
  { id: 3, name: "Aritree Saha", role: "Project assistant", image: "/placeholder.svg?height=400&width=400" },
  { id: 4, name: "Sripan Saha", role: "Project assistant", image: "/placeholder.svg?height=400&width=400" },
]

export function TeamShowcase() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {teamMembers.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  )
}

function TeamMemberCard({ member }: { member: typeof teamMembers[number] }) { 
  return (
    <div className=" justify-center py-12">
    <motion.div
      className="bg-gradient-to-b from-orange-400 to-red-500 rounded-3xl overflow-hidden shadow-lg p-6 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <div className="w-40 h-40 mx-auto bg-white rounded-full overflow-hidden shadow-inner">
          <img
            src={member.image}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-1">{member.name}</h3>
        <p className="text-orange-100">{member.role}</p>
      </div>
      <motion.button
        className="w-full bg-white text-orange-500 py-2 rounded-full font-semibold hover:bg-orange-100 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Visit Portfolio
      </motion.button>
    </motion.div>
    </div>
  )
}