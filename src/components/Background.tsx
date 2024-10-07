"use client"

import React from "react"
import Image from "next/image"
import { motion, useScroll, useTransform } from "framer-motion"
import DhakImage from "/public/dhak.png"
import DurgaImage from "/public/durga1.png"
import MandalaImage from "/public/p.png"
import KashfulImage from "/public/kashful.png"
import DiasImage from "/public/dhak.png"
import BackgroundImage from "/public/bg.jpg"

export default function DurgaPujaBackground() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 500], [0, 50])

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Background Image with enhanced overlay */}
      <Image
        src={BackgroundImage}
        alt="Durga Puja Background"
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
        className="brightness-75"
      />

      {/* Improved overlay gradient for better contrast and festive feel */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-800/70 via-orange-600/50 to-yellow-500/40 mix-blend-overlay" />

      {/* Abstract Color Layers with enhanced animation */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-gradient-to-tl from-red-700/30 via-orange-500/20 to-yellow-400/10"
        animate={{
          opacity: [0.3, 0.5, 0.3],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Durga Image - Appearing and fitting screen width with glow effect */}
      <motion.div
        className="absolute inset-x-0 bottom-0 flex justify-center items-end overflow-hidden"
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
        style={{ y }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-yellow-300 rounded-full filter blur-3xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <Image
            src={DurgaImage}
            alt="Goddess Durga"
            width={600}
            height={800}
            objectFit="contain"
            priority
            className="drop-shadow-2xl"
          />
        </div>
      </motion.div>

      {/* Floating Kashful with enhanced animation */}
      <motion.div
        className="absolute -top-10 left-20 z-20"
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Image src={KashfulImage} alt="Kashful" width={120} height={120} className="opacity-80" />
      </motion.div>

      {/* Dhak Player with enhanced animation */}
      <motion.div
        className="absolute bottom-0 right-0 z-20"
        animate={{
          rotate: [-5, 5, -5],
          y: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <Image src={DhakImage} alt="Dhak Player" width={250} height={375} className="drop-shadow-lg" />
      </motion.div>

      {/* Festive Decoration - Dias with glow effect */}
      <motion.div
        className="absolute bottom-10 left-10 z-10"
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-orange-400 rounded-full filter blur-2xl opacity-50"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />
          <Image src={DiasImage} alt="Dias" width={150} height={150} className="relative z-20" />
        </div>
      </motion.div>

      {/* Abstract Shapes */}
      <motion.div
        className="absolute top-1/4 right-1/4 w-32 h-32 bg-yellow-300 rounded-full opacity-30 z-10 mix-blend-screen"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-red-500 rotate-45 opacity-40 z-10 mix-blend-screen"
        animate={{
          rotate: [45, 90, 45],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      {/* Festive Text with glowing animation */}
    
    </div>
  )
}