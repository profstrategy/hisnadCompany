'use client';

import React from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AppHeading } from '@/components/reusables/app-heading';
import AppButton from '@/components/reusables/app-button';
import { CLIENT_ROUTES } from '@/_lib/routes';

const NewUser = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push(CLIENT_ROUTES.PublicPages.onboarding.initialStep);
  };

  const handleLogin = () => {
    router.push(CLIENT_ROUTES.PublicPages.auth.login);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="min-h-screen flex pt-[4rem] md:pt-[6rem] lg:pt-[10rem] justify-center w-full px-4 md:px-8 lg:px-0"
    >
      <div className="text-center w-full sm:w-[80%] md:w-[60%] lg:w-[40%] px-4">
        <motion.div
          initial={{ x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center w-full justify-start gap-4 mb-6"
        >
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => router.push('/')}
            className="w-10 h-10 rounded-full border-2 border-brand-color flex items-center justify-center"
          >
            <FaArrowLeft className="text-xl sm:text-2xl text-brand-color cursor-pointer" />
          </motion.div>
          <AppHeading
            variant="h2"
            className="text-brand-color text-xl sm:text-2xl md:text-3xl text-center sm:text-left"
          >
            Are you new on our platform?
          </AppHeading>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-brand-color-text mb-8 text-center sm:text-left text-sm sm:text-base"
        >
          If you&apos;re new to this portal, please click the &quot;Get
          Started&quot; button below to begin the onboarding process
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="space-y-4 w-full max-w-[500px] mx-auto"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <AppButton
              variant="secondary"
              className="w-full text-sm sm:text-base py-3 h-[50px]"
              onClick={handleGetStarted}
            >
              Yes I am new, Get Started
            </AppButton>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <AppButton
              variant="primary"
              className="w-full text-sm sm:text-base h-[50px] py-3 text-white"
              onClick={handleLogin}
            >
              I already have an account, I want to Login
            </AppButton>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default NewUser;