'use client';

import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

import { faqs } from '@/app/constants/_mocks_/faq-data';

export default function Frequently() {
  return (
    <section id='faq' className='w-full py-10 md:py-20'>
      <div className='mx-auto max-w-[1200px] px-4 sm:px-6 md:px-0'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='mb-3 text-center font-extrabold text-white'
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 'clamp(2.4rem, 6vw, 3.6rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Frequently Asked Questions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className='mb-14 text-center text-gray-400'
          style={{
            fontSize: 'clamp(0.875rem, 1vw, 1.125rem)',
            lineHeight: 'clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          Got questions? Here are the answers to the ones we get asked the most.
        </motion.p>

        <Accordion type='single' collapsible className='w-full'>
          {faqs.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`faq-${idx}`}
              className='border-b border-gray-900'
            >
              <AccordionTrigger
                className='group flex w-full cursor-pointer items-start justify-start py-4 pr-2 font-semibold text-white transition-colors hover:text-purple-700 focus:outline-none md:py-8'
                style={{
                  fontSize: 'clamp(1.125rem, 2vw, 1.75rem)',
                  textDecoration: 'none',
                }}
              >
                {/* Arrow top left */}
                <span className='flex h-6 w-6 flex-shrink-0 items-start justify-start'>
                  <ChevronDown
                    size={24}
                    className='text-gray-400 transition-transform duration-300 group-hover:text-purple-400 group-data-[state=open]:rotate-180'
                  />
                </span>
                {/* Question*/}
                <span className='flex-1 pt-0 text-left'>{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent
                className='pt-0 pb-8 pl-[calc(24px+16px)] text-gray-300'
                style={{
                  fontSize: 'clamp(0.875rem, 1vw, 1rem)',
                  lineHeight: 'clamp(1.5rem, 3vw, 1.8rem)',
                  textAlign: 'left',
                }}
              >
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
