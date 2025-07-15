'use client';
import { motion } from 'framer-motion';
import { IoLogoWhatsapp } from 'react-icons/io5';
const WhatsaapChat = () => {
  return (
    <a
      href="https://wa.me/2348104441104"
      target="_blank"
      rel="noopener noreferrer"
    >
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="fixed bottom-16 right-4 sm:right-8 p-3 bg-white/90 text-accent-primary rounded-full shadow-md hover:shadow-lg flex items-center gap-2 transition-all duration-200 z-50 border border-brand-color-main/20"
      >
        <IoLogoWhatsapp className="w-5 h-5" />
        <span className="text-sm font-medium">Chat with us</span>
      </motion.button>
    </a>
  );
};

export default WhatsaapChat;
