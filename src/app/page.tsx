"use client"; // Add this directive

import Hero from '@/components/Hero';
import Zoompic from '@/components/zoompic';
import Pandel from '../components/Showcase';
import React from 'react';
import Ripple from '../components/ui/ripple';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';

function Landing() {
  // Define the animation properties
  const zoomAnimation = {
    initial: { scale: 1 },  // Initial scale
    animate: {
      scale: [1, 1.05, 1], // Scale up to 1.05 and back to 1
      transition: {
        duration: 1.5, // Duration of the zoom effect
        repeat: Infinity, // Repeat the animation
        ease: "easeInOut", // Easing function
      },
    },
  };

  return (
    <div>
      <Hero />
      <Zoompic />
      <Pandel />
      <div className="relative flex h-[700px] w-full flex-col items-center justify-center rounded-lg my-20 md:shadow-xl">
        <motion.div {...zoomAnimation}> {/* Apply the animation properties */}
          <Image
            src="/durga2.png" // Ensure your image path is correct
            alt="Goddess Durga"
            width={500} // Specify the width in pixels
            height={800} // Specify the height in pixels
            priority // Preload the image for better performance
            className="drop-shadow-2xl" // Add additional Tailwind CSS classes for styling
            style={{ objectFit: "contain" }} // Ensures the image maintains its aspect ratio
          />
        </motion.div>
        <Ripple mainCircleOpacity={2} />
      </div>
      <Footer />
    </div>
  );
}

export default Landing;
