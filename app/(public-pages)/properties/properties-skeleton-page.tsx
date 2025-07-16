'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SkeletonProps {
  theme?: 'light' | 'dark';
}

export default function PropertiesSkeleton ({ theme = 'dark' }:SkeletonProps){
  const [isHovered, setIsHovered] = useState(false);
  
  const themeStyles = {
    light: {
      background: 'bg-white',
      skeletonBg: 'bg-gray-200',
      skeletonHighlight: 'bg-gray-300',
      border: 'border-gray-200'
    },
    dark: {
      background: 'bg-[#1A1A1A]',
      skeletonBg: 'bg-[#333333]',
      skeletonHighlight: 'bg-[#444444]',
      border: 'border-[#333333]'
    }
  };

  const styles = themeStyles[theme];

  const shimmerAnimation:any = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: {
        duration: 1.5,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  };

  const cardVariants = {
    initial: { y: 0, scale: 1 },
    hover: { y: -5, scale: 1.02 }
  };

  return (
    <motion.div
      className={`${styles.background} p-6 rounded-lg border ${styles.border} transition-all duration-300 flex flex-col h-full relative overflow-hidden`}
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Shimmer overlay */}
      <motion.div
        className="absolute inset-0 z-10"
        initial="initial"
        animate="animate"
        variants={shimmerAnimation}
      >
        <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </motion.div>

      {/* Status badge skeleton */}
      <motion.div
        className={`absolute top-4 right-4 z-20 w-16 h-6 rounded-full ${styles.skeletonBg}`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      />

      {/* Header section */}
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-4">
          <motion.div 
            className={`w-8 h-8 rounded-full ${styles.skeletonBg}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500 }}
          />
          
          <motion.div 
            className={`h-4 w-24 rounded ${styles.skeletonBg}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          />
          
          <motion.div 
            className={`h-5 w-16 rounded-full ${styles.skeletonBg}`}
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
          />
        </div>

        {/* Image skeleton */}
        <motion.div
          className="relative h-48 w-full mb-4 rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div className={`absolute inset-0 ${styles.skeletonBg}`} />
        </motion.div>

        {/* Title skeleton */}
        <motion.div
          className="mb-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <div className={`h-6 w-3/4 rounded ${styles.skeletonBg} mb-1`} />
          <div className={`h-6 w-1/2 rounded ${styles.skeletonBg}`} />
        </motion.div>

        {/* Location skeleton */}
        <motion.div
          className="flex items-center gap-2 mb-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className={`w-4 h-4 rounded-full ${styles.skeletonBg}`} />
          <div className={`h-3 w-32 rounded ${styles.skeletonBg}`} />
        </motion.div>

        {/* Price skeleton */}
        <motion.div
          className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <div className={`h-8 w-1/2 rounded ${styles.skeletonBg} mb-1`} />
          <div className={`h-6 w-2/3 rounded ${styles.skeletonBg}`} />
        </motion.div>
      </div>

      {/* Button skeleton */}
      <motion.div
        className={`w-full mt-6 py-3 rounded-lg border ${styles.border} flex items-center justify-center gap-2 ${styles.skeletonBg}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className={`h-4 w-20 rounded ${styles.skeletonHighlight}`}
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 500 }}
        />
        <motion.div 
          className={`h-4 w-4 rounded-full ${styles.skeletonHighlight}`}
          animate={{ x: isHovered ? 5 : 0 }}
          transition={{ type: 'spring', stiffness: 500 }}
        />
      </motion.div>
    </motion.div>
  );
};