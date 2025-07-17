'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { AppHeading } from '@/components/reusables/app-heading';
import { faqs } from '@/constants/contents';

const Faqs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setActiveIndex(activeIndex === idx ? null : idx);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants:any = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section
      className={` py-16 md:py-24`}
      id="faqs"
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={containerVariants}
        className="max-w-4xl mx-auto"
      >
<div className="text-center mb-12">
          <AppHeading
                    variant="h2"
                    className="text-2xl sm:text-3xl md:text-4xl text-center mb-8"
                  >
                    Frequently Asked Questions
                  </AppHeading>
        </div>

        <div className="space-y-4 px-2 xmd:px-4 md:px-6 lg:px-0">
          {faqs?.map((itm, idx) =>
            
              <motion.div
                key={idx}
                variants={itemVariants}
                className="rounded-xl overflow-hidden"
              >
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem
                    value={`item-${idx}`}
                    className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300"
                  >
                    <AccordionTrigger
                      onClick={() => handleToggle(idx)}
                      className="w-full px-6 py-4 flex items-center justify-between text-left"
                    >
                      <h3 className="text-lg font-medium text-gray-900">
                        {itm?.question}
                      </h3>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                          activeIndex === idx ? 'rotate-180' : ''
                        }`}
                      />
                    </AccordionTrigger>

                    <AccordionContent className="px-6 pb-4">
                      <ul className="space-y-2 text-gray-600">
                        {itm?.answer && (
                          <li className="flex items-start">
                            <span className="h-1.5 w-1.5 rounded-full bg-brand-color mt-2 mr-2 flex-shrink-0" />
                            <span>{itm.answer}</span>
                          </li>
                        )}
                        {[...Array(5)].map((_, num) => {
                          const answerKey = `answer_${num}` as const;
                          return (
                            itm[answerKey] && (
                              <li key={num} className="flex items-start">
                                <span className="h-1.5 w-1.5 rounded-full bg-brand-color mt-2 mr-2 flex-shrink-0" />
                                <span>{itm[answerKey]}</span>
                              </li>
                            )
                          );
                        })}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Faqs;
