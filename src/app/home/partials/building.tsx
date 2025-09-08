'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import { experiences } from '@/app/constants/_mocks_/experiences-data';

const cardHeightMobile = 500; 
const gapMobile = 24; 
const lineHeight = 350;

const Building = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section className='w-full py-10 md:py-20'>
      <div className='mx-auto max-w-[1200px] px-4 sm:px-6 md:px-0'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
          viewport={{ once: true }}
          className='mb-10 text-center md:mb-16'
        >
          <h2
            className='mb-4 font-bold text-white'
            style={{
              fontSize: 'clamp(1.75rem, 2.5vw, 3rem)',
              lineHeight: '1.2',
            }}
          >
            Years of Building, Learning, and Shipping
          </h2>
          <p className='text-[1rem] font-normal text-gray-400 md:text-[1.125rem]'>
            Each role has sharpened my ability to build better digital
            experiences, faster.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className='relative'>
          {experiences.map((experience, index) => {
            const delayBase = index * 2;
            const topMobile = index * (cardHeightMobile + gapMobile);

            return (
              <div key={index} className='relative'>
                {/* Dot */}
                <motion.div
                  key={`dot-${isMobile ? 'mobile' : 'desktop'}-${index}`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    delay: delayBase,
                    duration: 0.5,
                    ease: 'easeInOut',
                  }}
                  style={{
                    top: isMobile
                      ? `${topMobile}px`
                      : `${index * lineHeight}px`,
                    zIndex: 10,
                    background:
                      'radial-gradient(circle, #800080 30%, #400040 70%)',
                    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
                  }}
                  className='absolute left-0.5 h-5.5 w-5.5 rounded-full md:left-1/2 md:translate-x-[-50%]'
                />

                {/* Timeline */}
                {index < experiences.length - 1 && (
                  <motion.div
                    key={`timeline-${isMobile ? 'mobile' : 'desktop'}-${index}`}
                    initial={{ height: 0 }}
                    animate={{
                      height: isMobile
                        ? `${cardHeightMobile + gapMobile}px`
                        : `${lineHeight}px`,
                    }}
                    transition={{
                      delay: delayBase + 0.5,
                      duration: 1.5,
                      ease: 'easeInOut',
                    }}
                    style={{
                      top: isMobile
                        ? `${topMobile + 3}px`
                        : `${index * lineHeight}px`,
                      zIndex: 1,
                    }}
                    className='absolute left-2.5 w-[3px] translate-x-[50%] bg-gradient-to-b from-purple-500 to-purple-700 md:left-1/2 md:translate-x-[-50%]'
                  />
                )}

                {/* Card */}
                {isMobile ? (
                  <motion.div
                    key={`card-mobile-${index}`}
                    initial={{
                      clipPath:
                        index === 1
                          ? 'inset(0 100% 0 0)' 
                          : index % 2 === 0
                            ? 'inset(0 100% 0 0)'
                            : 'inset(0 0 0 100%)',
                      opacity: 0,
                    }}
                    animate={{
                      clipPath: 'inset(0 0 0 0)',
                      opacity: 1,
                    }}
                    transition={{
                      delay: delayBase + 0.5,
                      duration: 1.5,
                      ease: 'easeInOut',
                    }}
                    style={{
                      top: `${topMobile}px`, 
                      left: '36px',
                      width: 'calc(100vw - 64px)', 
                      minWidth: '240px',
                      maxWidth: '308px',
                      padding: '18px 16px',
                      borderRadius: '16px',
                      background:
                        'radial-gradient(circle at top left, rgba(128, 0, 128, 0.3) 15%, rgba(0, 0, 0, 0.9) 70%)',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                      border: '1px solid #252b37',
                      boxSizing: 'border-box',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem', 
                      height: `${cardHeightMobile}px`,
                    }}
                    className='absolute text-white shadow-lg'
                  >
                    <div className='flex flex-col gap-2'>
                      <h3
                        className='font-bold'
                        style={{
                          fontSize: '1.08rem',
                          marginBottom: '2px',
                          whiteSpace: 'nowrap',
                          textAlign: 'left',
                        }}
                      >
                        {experience.year}
                      </h3>
                      <Image
                        src={experience.logo}
                        alt={`${experience.year} logo`}
                        width={90}
                        height={32}
                        className='mb-2 h-8 w-auto self-start object-contain'
                      />
                      <div
                        style={{
                          width: '100%',
                          height: '1px',
                          background: '#23232b',
                          margin: '8px 0 12px 0',
                        }}
                      />
                      <ul className='space-y-3'>
                        {experience.description.map((desc, i) => (
                          <li
                            key={i}
                            className='flex items-start gap-2 text-[0.9rem] leading-relaxed'
                          >
                            <span className='mt-1'>
                              <svg
                                width='18'
                                height='18'
                                viewBox='0 0 43 44'
                                fill='none'
                              >
                                <defs>
                                  <linearGradient
                                    id='star-gradient'
                                    x1='0'
                                    y1='0'
                                    x2='43'
                                    y2='44'
                                    gradientUnits='userSpaceOnUse'
                                  >
                                    <stop stopColor='#A93FA8' />
                                    <stop offset='1' stopColor='#5E2591' />
                                  </linearGradient>
                                </defs>
                                <path
                                  d='M21.5 43.5C20.8775 23.1313 20.3687 22.6257 0 22C20.3687 21.3775 20.8744 20.8687 21.5 0.5C22.1224 20.8687 22.6313 21.3744 43 22C22.6313 22.6257 22.1257 23.1251 21.5 43.5Z'
                                  fill='url(#star-gradient)'
                                />
                              </svg>
                            </span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key={`card-desktop-${index}`}
                    initial={{
                      clipPath:
                        index % 2 === 0
                          ? 'inset(0 100% 0 0)'
                          : 'inset(0 0 0 100%)',
                      opacity: 0,
                    }}
                    animate={{
                      clipPath: 'inset(0 0 0 0)',
                      opacity: 1,
                    }}
                    transition={{
                      delay: delayBase + 0.5,
                      duration: 1.5,
                      ease: 'easeInOut',
                    }}
                    style={{
                      top: `${index * lineHeight}px`,
                      background:
                        index % 2 === 0
                          ? 'radial-gradient(circle at top left, rgba(128, 0, 128, 0.3) 15%, rgba(0, 0, 0, 0.9) 70%)'
                          : 'radial-gradient(circle at top right, rgba(128, 0, 128, 0.3) 15%, rgba(0, 0, 0, 0.9) 70%)',
                      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.5)',
                      border: '1px solid #252b37',
                      boxSizing: 'border-box',
                    }}
                    className={`absolute flex gap-6 rounded-lg p-6 text-white shadow-lg ${
                      index % 2 === 0 ? 'md:left-[76%]' : 'md:left-[24%]'
                    } md:h-[330px] md:w-[580px] md:translate-x-[-50%]`}
                  >
                    <div className='flex items-start gap-4'>
                      {/* Year and Logo */}
                      <div className='flex w-fit flex-col items-start gap-2'>
                        <h3
                          className='w-full text-center font-bold'
                          style={{
                            fontSize: 'clamp(1rem, 1.0625vw, 1.125rem)',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          {experience.year}
                        </h3>
                        <Image
                          src={experience.logo}
                          alt={`${experience.year} logo`}
                          width={128}
                          height={48}
                          className='h-12 w-auto object-contain'
                        />
                      </div>
                      {/* Vertical Separator */}
                      <div
                        className='w-[1px] bg-gray-900'
                        style={{
                          height: '100%',
                        }}
                      ></div>
                      {/* Description */}
                      <div>
                        <ul className='text-md space-y-2'>
                          {experience.description.map((desc, i) => (
                            <li key={i} className='flex items-center gap-[6px]'>
                              <span className='text-gray-50'>
                                <svg
                                  width='30'
                                  height='30'
                                  viewBox='0 0 43 44'
                                  fill='none'
                                  xmlns='http://www.w3.org/2000/svg'
                                  className='h-[30px] w-[30px]'
                                >
                                  <defs>
                                    <linearGradient
                                      id='star-gradient'
                                      x1='0'
                                      y1='0'
                                      x2='43'
                                      y2='44'
                                      gradientUnits='userSpaceOnUse'
                                    >
                                      <stop stopColor='#5E2591' />
                                      <stop offset='1' stopColor='#A93FA8' />
                                    </linearGradient>
                                  </defs>
                                  <path
                                    d='M21.5 43.5C20.8775 23.1313 20.3687 22.6257 0 22C20.3687 21.3775 20.8744 20.8687 21.5 0.5C22.1224 20.8687 22.6313 21.3744 43 22C22.6313 22.6257 22.1257 23.1251 21.5 43.5Z'
                                    fill='url(#star-gradient)'
                                  />
                                </svg>
                              </span>
                              {desc}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            );
          })}

          {/* Timeline End and Dot End */}
          <motion.div
            key={`timeline-end-${isMobile ? 'mobile' : 'desktop'}`}
            initial={{ height: 0 }}
            animate={{
              height: isMobile ? `${cardHeightMobile + gapMobile}px` : '350px',
            }}
            transition={{
              delay: (experiences.length - 1) * 2 + 0.5,
              duration: 1.5,
              ease: 'easeInOut',
            }}
            style={{
              top: isMobile
                ? `${(experiences.length - 1) * (cardHeightMobile + gapMobile)}px`
                : `${(experiences.length - 1) * 350}px`,
              zIndex: 1,
            }}
            className='absolute left-2.5 w-[3px] translate-x-[50%] bg-gradient-to-b from-purple-500 to-purple-700 md:left-1/2 md:translate-x-[-50%]'
          />

          <motion.div
            key={`dot-end-${isMobile ? 'mobile' : 'desktop'}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: experiences.length * 2,
              duration: 0.5,
              ease: 'easeInOut',
            }}
            style={{
              top: isMobile
                ? `${experiences.length * (cardHeightMobile + gapMobile)}px`
                : `${experiences.length * 350}px`,
              zIndex: 10,
              background: 'radial-gradient(circle, #8B8000 30%, #5A4C00 70%)',
              boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
            }}
            className='absolute left-0.5 h-5.5 w-5.5 rounded-full md:left-1/2 md:translate-x-[-50%]'
          />
          <div style={{ height: isMobile ? '1595px' : '1073px' }} />
        </div>
      </div>
    </section>
  );
};

export default Building;
