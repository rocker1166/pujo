"use client";

import Link from 'next/link';
import { ReactTyped } from "react-typed";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import DurgaImage from "/public/durga1.png";

export default function Hero() {
  return (
    <div className="relative h-screen  overflow-hidden backdrop-blur-sm  pt-20 z-10">
      <motion.div
        className="absolute inset-x-0 top-10 flex justify-center items-end overflow-hidden "
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 1.8,
          ease: "easeOut",
        }}
      >
        <div className="relative">
          <motion.div
            className="absolute inset-0 bg-yellow-300 rounded-full filter blur-3xl opacity-30"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
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
            className="drop-shadow-2xl max-w-full h-auto"
          />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-[url('/durga-bg-pattern.svg')] opacity-20"></div>
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-lg">
          Celebrate <span className='font-extrabold text-transparent text-6xl sm:text-7xl md:text-8xl bg-clip-text bg-gradient-to-r from-yellow-400 to-red-600'>
          <ReactTyped
            strings={["Durga Puja", "মায়ের পুজো", "Culture of India"]}
            typeSpeed={100}
            loop
            backSpeed={20}
            cursorChar="!"
            showCursor={true}
          /></span>
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl font-extrabold text-yellow-100 mb-8 max-w-2xl">
          Immerse yourself in the vibrant pandals and rich traditions of Bengal's biggest festival
        </p>
        <div className='flex flex-col sm:flex-row gap-3'>
          <Link href="/explore" className="bg-red-600 text-white text-lg px-8 py-3 rounded-2xl hover:bg-red-700 transition transform hover:scale-105 w-full sm:w-auto mb-2 sm:mb-0">
            Explore Pandals 🌍
          </Link>
          <Link href="/upload" className="bg-orange-600 text-white text-lg px-8 py-3 rounded-2xl hover:bg-red-700 transition transform hover:scale-105 w-full sm:w-auto">
            Mark Pandals 📍
          </Link>
        </div>
      </div>
    </div>
  );
}