"use client";

import { useState, useEffect } from 'react';
import Hero from '@/components/Hero';
import Zoompic from '@/components/zoompic';
import Pandel from '../components/Showcase';
import Ripple from '../components/ui/ripple';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Footer from '@/components/Footer';
import { useInView } from 'react-intersection-observer';

function Landing() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const zoomAnimation = {
    initial: { scale: 1 },
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="overflow-hidden">
      <Hero />
      <Zoompic />
      <Pandel />
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="relative flex h-[50vh] md:h-[70vh] w-full flex-col items-center justify-center my-10 md:my-20"
      >
        <motion.div {...zoomAnimation}>
          <Image
            src="/durga2.png"
            alt="Goddess Durga"
            width={500}
            height={800}
            priority
            className="drop-shadow-2xl max-h-full w-auto"
            style={{ objectFit: "contain" }}
          />
        </motion.div>
        <Ripple mainCircleOpacity={2} />
      </motion.div>
      <Footer />
    </div>
  );
}

export default Landing;