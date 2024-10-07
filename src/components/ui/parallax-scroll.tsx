"use client";
import { useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { AnimatedModalDemo } from "../AnimatedButton";




interface ImageSection {
  image: string;
  name: string;
}

export const ParallaxScroll = ({
  imageSection,
  className,
}: {
  imageSection: ImageSection[];
  className?: string;
}) => {
  const gridRef = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    container: gridRef, // remove this if your container is not fixed height
    offset: ["start start", "end start"], // remove this if your container is not fixed height
  });

  const translateFirst = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const translateSecond = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const translateThird = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const third = Math.ceil(imageSection.length / 3);

  const firstPart = imageSection.slice(0, third);
  const secondPart = imageSection.slice(third, 2 * third);
  const thirdPart = imageSection.slice(2 * third);

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start  max-w-5xl mx-auto gap-10 py-40 px-10"
        ref={gridRef}
      >
        <div className="grid gap-10">
          {firstPart.map((imageSection, idx) => (
            <motion.div
              style={{ y: translateFirst }} // Apply the translateY motion value here
              key={"grid-1" + idx}
              className="relative"
            >
              <Image
                src={imageSection.image}
                className="h-80 w-40 object-cover object-left-top rounded-2xl gap-10 !m-0 !p-0 cursor-pointer transition ease-in duration-300 hover:scale-105
                   "
                height="800"
                width="400"
                alt="thumbnail"
                onClick={()=>{console.log("clicked")}}
              />
                    <p className="absolute bottom-5 left-5 bg-white/75 p-2 "> 
                {imageSection.name}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((imageSection, idx) => (
            <motion.div style={{ y: translateSecond }}
              key={"grid-2" + idx}
              className="relative"

            >
              <Image
                src={imageSection.image}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 cursor-pointer transition ease-in duration-300 hover:scale-105 "
                height="400"
                width="400"
                alt="thumbnail"
              />
              <p className="absolute bottom-5 left-5 bg-white/75 p-2 "> 
                {imageSection.name}
              </p>
            </motion.div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((imageSection, idx) => (
            <motion.div style={{ y: translateThird }} key={"grid-3" + idx} className="relative"
            >
              <Image
                src={imageSection.image}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0 cursor-pointer transition ease-in duration-300 hover:scale-105   "
                height="400"
                width="400"
                alt="thumbnail"
              />
                    <p className="absolute bottom-5 left-5 bg-white/75 p-2 "> 
                {imageSection.name}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
