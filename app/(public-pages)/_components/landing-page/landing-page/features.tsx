'use client'
import { deguardian, nairametrics, tribune, ustimes, vanguard } from "@/public";
import React from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";
import { AppHeading } from "@/components/reusables/app-heading";

export default function Features() {
  const controls = useAnimation();
  const [isHovered, setIsHovered] = React.useState(false);

  const mediaPartners = [
    { id: "vanguard", image: vanguard, name: "Vanguard" },
    { id: "deguardian", image: deguardian, name: "The Guardian" },
    { id: "ustimes", image: ustimes, name: "US Times" },
    { id: "tribune", image: tribune, name: "Tribune" },
    { id: "nairametrics", image: nairametrics, name: "Nairametrics" },
  ];

  // Duplicate array for infinite scrolling
  const infinitePartners = [...mediaPartners, ...mediaPartners];

  const [activeIndex, setActiveIndex] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        setActiveIndex((prev) => (prev + 1) % mediaPartners.length);
      }
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered]);

  React.useEffect(() => {
    const scroll = async () => {
      while (true) {
        await controls.start({
          x: "-100%",
          transition: {
            duration: 1000,
            ease: "linear"
          }
        });
      }
    };
    scroll();
  }, [controls]);

  return (
    <section
      className="w-full overflow-hidden bg-white rounded-2xl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <AppHeading
          variant="h3"
          className="text-center -mb-8 md:-mb-16 text-xl font-normal"
        >
          Featured In
        </AppHeading>

        {/* Desktop Grid Layout */}
        <div className="hidden md:grid grid-cols-5 gap-8 lg:gap-12 items-center justify-center">
          {mediaPartners.map((partner, index) => (
            <motion.div
              key={partner.id}
              className="flex flex-col items-center justify-center p-4"
              initial={{ scale: 1 }}
              animate={{
                scale: index === activeIndex ? 1.1 : 1,
                opacity: index === activeIndex ? 1 : 0.8
              }}
              transition={{
                duration: 0.5,
                ease: "easeInOut",
                delay: index * 0.05
              }}
              whileHover={{ scale: 1.05 }}
            >
              <div className={`relative mb-4 ${index === mediaPartners.length - 1
                  ? 'w-1/2 h-12 sm:h-16 md:h-20 lg:h-24 rounded-lg'
                  : 'w-full h-24 sm:h-32 md:h-40 lg:h-48'
                }`}>
                <Image
                  src={partner.image}
                  fill
                  quality={100}
                  alt={partner.name}
                  className={`object-contain object-center ${index === mediaPartners.length - 1 ? 'rounded-lg' : ''
                    }`}
                  sizes={index === mediaPartners.length - 1
                    ? "(max-width: 768px) 50px, (max-width: 1200px) 75px, 100px"
                    : "(max-width: 768px) 100px, (max-width: 1200px) 150px, 200px"
                  }
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Scrolling Marquee */}
        <div className="md:hidden relative overflow-hidden h-40">
          <motion.div
            className="flex absolute top-0 left-0 h-full items-center"
            animate={controls}
          >
            {infinitePartners.map((partner, i) => (
              <motion.div
                key={`${partner.id}-${i}`}
                className="flex flex-col items-center justify-center mx-8 w-32"
                initial={{ scale: 1 }}
                animate={{
                  scale: i % mediaPartners.length === activeIndex ? 1.1 : 1,
                  opacity: i % mediaPartners.length === activeIndex ? 1 : 0.7
                }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative w-full h-20 mb-2">
                  <Image
                    src={partner.image}
                    fill
                    quality={100}
                    alt={partner.name}
                    className="object-contain object-center"
                    sizes="100px"
                  />
                </div>

              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}