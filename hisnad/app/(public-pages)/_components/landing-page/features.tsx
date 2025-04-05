'use client'
import { deguardian, nairametrics, tribune, ustimes, vanguard } from "@/public";
import React from "react";
import { motion, useAnimation } from "framer-motion"; 
import Image from "next/image";
import { AppHeading } from "@/components/reusables/app-heading";
import { features } from "@/constants/types";


export default function Features() {
    const controls = useAnimation()

  const words_1: features[] = [
    { id: "vanguard", image: vanguard },
    { id: "deguardian", image: deguardian },
    { id: "ustimes", image: ustimes },
    { id: "tribune", image: tribune },
    { id: "nairametrics", image: nairametrics },
  ];

  // Duplicate array for infinite scrolling
  const images = [...words_1, ...words_1];

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % words_1.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  React.useEffect(() => {
    const scroll = async () => {
      while (true) {
        await controls.start({ x: "-100%", transition: { duration: 500, ease: "linear" } });
        controls.set({ x: "0%" });
      }
    };
    scroll();
  }, [controls]);

  return (
    <div className="relative w-full overflow-hidden bg-white py-6">
      {/* Heading */}
      <AppHeading variant="h3" className="text-center z-10 ">
        Featured In the Media
      </AppHeading>

      <div className="md:flex flex-wrap justify-center items-center gap-12 -mt-4 sm:-mt-8 md:-mt-4 hidden">
                {words_1.map((img, i) => (
                    <motion.div
                        key={img.id}
                        className="relative flex justify-center items-center"
                        initial={{ scale: 1 }}
                        animate={{ scale: i === activeIndex ? 1.3 : 1 }}
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                    >
                        {i === words_1.length - 1 ? <Image
                            src={img.image}
                            width={80}
                            height={80}
                            quality={100}
                            alt={img.id}
                            className="object-contain w-10 h-10 sm:w-12 sm:h-12  rounded-xl "
                        /> : <Image
                            src={img.image}
                            width={100}
                            height={100}
                            quality={100}
                            alt={img.id}
                            className="object-contain w-12 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-40 lg:h-40"
                        />}
                    </motion.div>
                ))}
            </div>

      {/* Scrolling Container on smaller screen sizes */}
      <motion.div
        className="flex w-max items-center md:gap-12 gap-16 md:hidden"
        animate={controls}
        transition={{ ease: "easeInOut", duration: 1000, repeat: Infinity }}
      >
        {words_1.map((img, i) => (
          <motion.div
            key={`${img.id}-${i}`}
            className="flex justify-center items-center"
            initial={{ scale: 1 }}
            animate={{ scale: i % words_1.length === activeIndex ? 1.3 : 1 }}
            transition={{ duration: 50, ease: "easeInOut" }}
          >
         {i === words_1.length -1?  <Image
              src={img.image}
              width={100}
              height={100}
              quality={100}
              alt={img.id}
              className="object-contain w-10 h-10 sm:w-14 sm:h-14 md:w-12 md:h-12 rounded-xl "
            /> : <Image
            src={img.image}
            width={100}
            height={100}
            quality={100}
            alt={img.id}
            className={`object-contain w-24 h-24 sm:w-36 sm:h-40 md:w-40 md:h-32 lg:w-40 lg:h-40`}
          />}
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
