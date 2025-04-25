'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { AppHeading } from '@/components/reusables/app-heading';


const OurGoals = () => {
  const goals = [
    {
      id: 1,
      title: 'Regulatory Compliance',
      description:
        'At Hisnad Home and Property, we pride ourselves on being a fully registered and compliant real estate brand with the likes of REDAN, LASERA & EFCC. Our adherence to all regulatory standards ensures the utmost protection for our clients throughout every transaction.',
    },
    {
      id: 2,
      title: 'Fastest documentation process',
      description:
        'Our digitized process means less waiting without unnecessary delays or complications. Our commitment to efficiency means you can focus on what matters most, getting your dream property or investment opportunity while we handle your documentation fast and accurately.',
    },
    {
      id: 3,
      title: 'Top-tier Real Estate Investments',
      description:
        'Every property listed with Hisnad undergoes meticulous due diligence with our expert surveyors, and lawyers. Rest assured; we are only bringing the best investment opportunities closer to you.',
    },
    {
      id: 4,
      title: 'Real Estate Made Easy',
      description:
        'We break down the real estate process into simple steps, guiding you from start to finish. Taking real estate from boring to exciting accessible and simplified for young people.',
    },
    {
      id: 5,
      title: 'Innovative Technology',
      description:
        "Every transaction with Land Republic as a customer can be tracked and monitored via customer dashboards. This is giving every customer first-hand information of their transactions.",
    },
    {
        id: 6,
        title: 'Land Charting for Agriculture',
        description:
          'We provide expertly charted lands tailored for agricultural use, ensuring you get access to fertile and secure plots backed by accurate land surveys and official documentation. At Hisnad, we help you invest in sustainable farming with confidence and clarity.',
      }
      
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  h-auto`}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
        className="text-center mb-14"
      >
        <AppHeading
          variant="h2"
          className="text-2xl sm:text-3xl md:text-4xl text-start -mb-8"
        >
          - Our Goals!
        </AppHeading>
      </motion.div>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {goals?.map((goal) => (
          <motion.div
            key={goal.id}
            variants={itemVariants}
            className="bg-[#e8f0ff] hover:bg-[#d0e1ff] p-6 rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <span className={`w-10 h-10 flex items-center justify-center bg-border-primary text-global-text rounded-full text-sm font-semibold `}>
                {goal.id}
              </span>
              <h3 className="text-lg font-semibold text-brand-color">
                {goal.title}
              </h3>
            </div>
            <p className="text-brand-color-text text-sm">{goal.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default OurGoals;
