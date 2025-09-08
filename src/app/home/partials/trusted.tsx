'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel';

import { testimonials } from '@/app/constants/_mocks_/testimonials-data';

const CARD_WIDTH = 387;
const CARD_HEIGHT = 395;
const CARD_GAP = 32;

export default function Trusted() {
  const [active, setActive] = useState(0);
  const [mobileActive, setMobileActive] = useState(0);
  const [embla, setEmbla] = useState<any>(null);

  const getTrackX = () => {
    const cardFull = CARD_WIDTH + CARD_GAP;
    const centerIdx = 1;
    return -(active - centerIdx) * cardFull;
  };

    useEffect(() => {
    if (!embla) return;
    const onSelect = () => setMobileActive(embla.selectedScrollSnap());
    embla.on('select', onSelect);
    setMobileActive(embla.selectedScrollSnap());
    return () => {
      embla.off('select', onSelect);
    };
  }, [embla]);

  // Fungsi klik dot mobile
  const handleDotClick = (idx: number) => {
    if (embla && typeof embla.scrollTo === 'function') {
      embla.scrollTo(idx);
      setMobileActive(idx);
    }
  };

  return (
    <section className='w-full py-14 md:py-24'>
      <div className='mx-auto max-w-[1200px] px-4 sm:px-6 md:px-0'>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className='mb-4 text-center font-extrabold text-white'
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 'clamp(2.4rem, 6vw, 3.6rem)',
            letterSpacing: '-0.02em',
          }}
        >
          Trusted by Teams, Valued by Clients
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
          className='mb-10 text-center text-gray-300'
          style={{
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 'clamp(1.5rem, 3vw, 2rem)',
          }}
        >
          A few kind words from the people behind the projects Nura helped bring
          to life.
        </motion.p>

        {/* Desktop Carousel Center Mode */}
        <div className='relative hidden h-[395px] items-start justify-center overflow-hidden pb-16 md:flex'>
          <div className='flex h-[395px] w-full items-start justify-center'>
            <motion.div
              className='flex w-full items-start gap-6'
              animate={{ x: getTrackX() }}
              transition={{
                type: 'spring',
                stiffness: 60,
                damping: 18,
                mass: 0.7,
              }}
            >
              {testimonials.map((card, idx) => (
                <div
                  key={idx}
                  className={`relative flex h-full min-h-[395px] max-w-[387px] flex-shrink-0 items-start justify-center transition-all duration-500 ${
                    idx === active
                      ? 'z-20'
                      : 'pointer-events-none z-10 blur-[3px] brightness-75 filter'
                  }`}
                  style={{
                    height: `${CARD_HEIGHT}px`,
                    width: `${CARD_WIDTH}px`,
                  }}
                >
                  <div
                    className={`relative flex h-full w-full flex-col rounded-2xl border border-gray-950 p-5 shadow-2xl ${
                      idx === active
                        ? 'hover:border-purple-900 hover:shadow-[0_0_10px_5px_rgba(169,63,168,0.5)]'
                        : ''
                    }`}
                    style={{
                      background:
                        'radial-gradient(circle at top left, rgba(128, 0, 128, 0.3) 15%, rgba(0, 0, 0, 0.9) 70%)',
                      boxShadow: '0 4px 32px 0 rgba(169,63,168,0.12)',
                      height: '100%',
                      width: '100%',
                    }}
                  >
                    {/* Logo Left */}
                    <div className='mb-8 flex items-center justify-start'>
                      <Image
                        src={card.logo}
                        alt={card.company}
                        width={128}
                        height={48}
                      />
                    </div>
                    <div className='mb-8 flex gap-1'>
                      {Array.from({ length: card.stars }).map((_, i) => (
                        <Image
                          key={i}
                          src='/icons/gold_star.svg'
                          alt='star'
                          width={24}
                          height={24}
                        />
                      ))}
                    </div>
                    <p className='mb-6 text-lg leading-relaxed text-white'>
                      &quot;{card.text}&quot;
                    </p>
                    <div>
                      <span className='text-md font-bold text-gray-50'>
                        {card.name}
                      </span>
                      <div className='text-md text-gray-500'>
                        {card.position}
                      </div>
                    </div>
                    {/* Overlay Gradient */}
                    {idx < active && (
                      <div className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-black/60 to-transparent' />
                    )}
                    {idx > active && (
                      <div className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-l from-black/60 to-transparent' />
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        {/* Carousel dots desktop */}
        <div className='mt-6 hidden justify-center gap-3 md:flex'>
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                active === idx
                  ? 'w-12 shadow-lg'
                  : 'w-6 cursor-pointer bg-gray-800'
              }`}
              style={
                active === idx
                  ? {
                      background:
                        'radial-gradient(circle at 30% 70%, #6d28d9 0%, #520099 50%, #420F6E 100%)',
                      boxShadow: '0 2px 8px 0 rgba(76,29,149,0.35)',
                    }
                  : {}
              }
              aria-label={`Show testimonial ${idx + 1}`}
              onClick={() => setActive(idx)}
            />
          ))}
        </div>

        {/* Mobile carousel shadcn/ui */}
        <div className='md:hidden'>
          <Carousel
            opts={{
              align: 'center',
              loop: true,
            }}
            className='mx-auto w-full max-w-full'
            setApi={setEmbla}
          >
            <CarouselContent>
              {testimonials.map((card, idx) => (
                <CarouselItem key={idx} className='p-0'>
                  <div
                    className='flex min-h-[395px] flex-col rounded-md border border-gray-950 p-6 shadow-xl'
                    style={{
                      background:
                        'radial-gradient(circle at top left, rgba(128, 0, 128, 0.3) 15%, rgba(0, 0, 0, 0.9) 70%)',
                      boxShadow: '0 4px 32px 0 rgba(169,63,168,0.12)',
                      height: `${CARD_HEIGHT}px`,
                      width: '100%',
                    }}
                  >
                    {/* Logo left */}
                    <div className='mb-6 flex items-center justify-start'>
                      <Image
                        src={card.logo}
                        alt={card.company}
                        width={96}
                        height={36}
                      />
                    </div>
                    <div className='mb-6 flex gap-1'>
                      {Array.from({ length: card.stars }).map((_, i) => (
                        <Image
                          key={i}
                          src='/icons/gold_star.svg'
                          alt='star'
                          width={24}
                          height={24}
                        />
                      ))}
                    </div>
                    <p className='mb-6 text-base leading-relaxed text-white'>
                      &quot;{card.text}&quot;
                    </p>
                    <div>
                      <span className='font-bold text-white'>{card.name}</span>
                      <div className='text-sm text-gray-400'>
                        {card.position}
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Custom dots */}
            <div className='mt-6 flex justify-center gap-3'>
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    mobileActive === idx ? 'w-12 shadow-lg' : 'w-6 bg-gray-800'
                  }`}
                  style={
                    mobileActive === idx
                      ? {
                          background:
                        'radial-gradient(circle at 30% 70%, #6d28d9 0%, #520099 50%, #420F6E 100%)',
                          boxShadow: '0 2px 8px 0 rgba(76,29,149,0.35)',
                        }
                      : {}
                  }
                  aria-label={`Show testimonial ${idx + 1}`}
                  onClick={() => handleDotClick(idx)}
                  disabled={!embla}
                />
              ))}
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}
