'use client';

import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaBuilding,
  FaTiktok,
  FaClock,
  FaGlobe,
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { splitPhoneNumber } from '@/_lib/utils';
import { address } from '@/constants/contents';

export const ContactPageSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants:any = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const cardVariants:any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: {
        duration: 0.2,
        ease: "easeInOut",
      },
    },
  };

  const socialVariants:any = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 260,
        damping: 20,
      },
    },
    hover: {
      scale: 1.15,
      rotate: 5,
      transition: {
        duration: 0.2,
      },
    },
  };

  const contactMethods = [
    {
      icon: FaPhone,
      title: "Call Us",
      content: [
        `+234 ${splitPhoneNumber('8104441104')}`,
        `+234 ${splitPhoneNumber('7043637031')}`,
      ],
      subtitle: "Mon-Sat 8am to 6pm WAT",
      bgGradient: "from-blue-50 to-indigo-50",
      iconColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      icon: FaEnvelope,
      title: "Email Us",
      content: ["hisnadproperty23@gmail.com"],
      subtitle: "We'll respond within 24 hours",
      bgGradient: "from-green-50 to-emerald-50",
      iconColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Location",
      content: ["Ogun State, Nigeria"],
      subtitle: "Visit us anytime",
      bgGradient: "from-purple-50 to-violet-50",
      iconColor: "text-purple-600",
      borderColor: "border-purple-200",
    },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 mb-20">
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full mb-6"
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
          >
            <FaGlobe className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get in <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Have questions about our services? We're here to help. Send us a message 
            and we'll respond as soon as possible.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {/* Contact Methods */}
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className={`bg-gradient-to-br ${method.bgGradient} border ${method.borderColor} rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className={`inline-flex items-center justify-center w-14 h-14 ${method.iconColor} bg-white rounded-xl shadow-md mb-6`}>
                <method.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{method.title}</h3>
              <div className="space-y-1 mb-3">
                {method.content.map((item, idx) => (
                  <p key={idx} className="text-gray-700 font-medium">{item}</p>
                ))}
              </div>
              <p className="text-sm text-gray-600">{method.subtitle}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Office Information */}
          <motion.div variants={itemVariants}>
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-center mb-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-md mr-4">
                  <FaBuilding className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Head Office</h2>
              </div>
              
              <div className="space-y-3 mb-8">
                {address.map((item) => (
                  <motion.p 
                    key={item.id} 
                    className="text-gray-700 text-lg leading-relaxed"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.content}
                  </motion.p>
                ))}
              </div>

              {/* Office Hours */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center mb-4">
                  <FaClock className="w-5 h-5 text-blue-600 mr-3" />
                  <h3 className="text-lg font-semibold text-gray-900">Office Hours</h3>
                </div>
                <div className="space-y-2">
                  <motion.div 
                    className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg"
                    whileHover={{ backgroundColor: "#f9fafb" }}
                  >
                    <span className="text-gray-700 font-medium">Monday - Friday</span>
                    <span className="text-gray-600">8:00 AM - 6:00 PM</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg"
                    whileHover={{ backgroundColor: "#f9fafb" }}
                  >
                    <span className="text-gray-700 font-medium">Saturday</span>
                    <span className="text-gray-600">9:00 AM - 1:00 PM</span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-between items-center py-2 px-4 bg-gray-50 rounded-lg"
                    whileHover={{ backgroundColor: "#f9fafb" }}
                  >
                    <span className="text-gray-700 font-medium">Sunday</span>
                    <span className="text-red-500 font-medium">Closed</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div variants={itemVariants}>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 shadow-xl text-white">
              <h2 className="text-2xl font-bold mb-2">Connect With Us</h2>
              <p className="text-gray-300 mb-8 text-lg">
                Follow us on social media for the latest updates and property listings
              </p>

              <div className="grid grid-cols-1 gap-4">
                <motion.div variants={socialVariants} whileHover="hover">
                  <Link
                    href="https://www.facebook.com/share/1HzG575Jx7/?mibextid=wwXIfr"
                    target="_blank"
                    className="flex items-center p-4 bg-blue-600 hover:bg-blue-700 rounded-xl transition-all duration-300 group"
                    aria-label="Visit our Facebook page"
                  >
                    <FaFacebookF className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold">Facebook</p>
                      <p className="text-sm text-blue-100">Follow us for updates</p>
                    </div>
                  </Link>
                </motion.div>

                <motion.div variants={socialVariants} whileHover="hover">
                  <Link
                    href="https://www.instagram.com/hisnad_homes?igsh=MXBmaGkxZDAxcjRncw%3D%3D&utm_source=qr"
                    target="_blank"
                    className="flex items-center p-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl transition-all duration-300 group"
                    aria-label="Visit our Instagram page"
                  >
                    <FaInstagram className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold">Instagram</p>
                      <p className="text-sm text-purple-100">See our latest properties</p>
                    </div>
                  </Link>
                </motion.div>

                <motion.div variants={socialVariants} whileHover="hover">
                  <Link
                    href="https://www.tiktok.com/@userhisnad63?_t=ZM-8yF1z2evcoP&_r=1"
                    target="_blank"
                    className="flex items-center p-4 bg-gray-800 hover:bg-gray-700 rounded-xl transition-all duration-300 group border border-gray-600"
                    aria-label="Visit our TikTok page"
                  >
                    <FaTiktok className="w-6 h-6 mr-4 group-hover:scale-110 transition-transform" />
                    <div>
                      <p className="font-semibold">TikTok</p>
                      <p className="text-sm text-gray-300">Watch our property tours</p>
                    </div>
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};