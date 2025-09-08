'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React from 'react';

import { Button } from '@/components/ui/button';

import { handleScrollWithOffset } from '@/lib/scrollUtils';

const skills = [
  { name: 'HTML', icon: '/icons/html.svg' },
  { name: 'CSS', icon: '/icons/css.svg' },
  { name: 'Javascript', icon: '/icons/javascript.svg' },
  { name: 'Typescript', icon: '/icons/typescript.svg' },
  { name: 'Sequalize', icon: '/icons/sequalize.svg' },
  { name: 'Mongo DB', icon: '/icons/mongodb.svg' },
];

const Experience = () => (
  <section id='skills' className='w-fulll py-10 md:py-20'>
    <div className='mx-auto max-w-[1200px] px-4 sm:px-6 md:px-0'>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.42, 0, 0.58, 1] }}
        viewport={{ once: true }}
        className='mb-6 text-center md:mb-16'
      >
        <h2
          className='mb-2 font-bold text-white md:mb-4'
          style={{
            fontSize: 'clamp(1.75rem, 2.5vw, 3rem)',
            lineHeight: '1.2',
          }}
        >
          Experienced in Web & App Development
        </h2>
        <p className='text-[1rem] font-normal text-gray-400 md:text-[1.125rem]'>
          I create user-focused websites that look good, work well, and feel
          right.
        </p>
      </motion.div>

      <div className='flex flex-col gap-4 md:flex-row md:gap-0'>
        {/* Skill Cards */}
        <div className='grid flex-1 grid-cols-2 gap-4 md:grid-cols-3 md:gap-6'>
          {skills.length > 0 ? (
            skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.7,
                  duration: 1.5,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className='flex flex-col items-center justify-center rounded-xl border border-gray-900 bg-black transition-all duration-500 hover:border-purple-500 hover:shadow-[0_0_20px_5px_rgba(169,63,168,0.5)]'
                style={{
                  width: 'clamp(164px, 10vw, 214px)',
                  height: 'clamp(164px, 10vw, 214px)',
                }}
              >
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  width={90}
                  height={90}
                  className='mb-2'
                  onError={(e) => (e.currentTarget.src = '/icons/default.svg')}
                  style={{
                    width: 'clamp(75px, 9vw, 90px)',
                    height: 'clamp(75px, 9vw, 90px)',
                  }}
                />
                <span className='text-[1rem] font-medium text-white md:text-[1.125rem]'>
                  {skill.name}
                </span>
              </motion.div>
            ))
          ) : (
            <p className='text-center text-gray-400'>No skills available</p>
          )}
        </div>
        {/* Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='border-gray-1000 mt-0 flex flex-1 flex-col justify-between rounded-md border px-4 py-6 transition-all duration-300 hover:border-purple-700 hover:shadow-[0_0_20px_5px_rgba(169,63,168,0.5)] md:mt-0 md:ml-8 md:p-10'
          style={{
            background: `
              radial-gradient(ellipse 150% 175% at 10% 70%, #321752 0%, #A93FA8 100%, transparent 100%),
              radial-gradient(ellipse 200% 175% at 100% 0%, #5E2591 0%, #A93FA8 290%, #F6A18D 125%, transparent 100%)
            `,
            minHeight: '320px',
          }}
        >
          <div>
            <p
              className='mb-4 font-bold text-white'
              style={{
                fontSize: 'clamp(1.2rem, 2vw, 2rem)',
                lineHeight: '1.2',
              }}
            >
              &quot;Programming is the art of telling another human what you
              want the computer to do.&quot;
            </p>
            <span className='text-[1rem] text-gray-200'>
              &mdash; Donald Knuth
            </span>
          </div>
          <Button
            variant='default'
            size='default'
            className='mt-8 w-full'
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.125rem)',
            }}
          >
            <a
              href='#conversation'
              className='block h-full w-full text-center'
              onClick={(e) => handleScrollWithOffset(e, '#conversation')}
            >
              Let&apos;s Build Something
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Experience;
