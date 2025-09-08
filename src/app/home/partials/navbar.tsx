'use client';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  useSpring,
  useTransform,
  AnimatePresence,
} from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { navigationData } from '@/app/constants/_mocks_/navigation-data';
import { handleScrollWithOffset } from '@/lib/scrollUtils';

export const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const { scrollY } = useScroll();
  const blurRaw = useTransform(scrollY, [0, 80], [0, 16]);
  const blur = useSpring(blurRaw, { stiffness: 360, damping: 60 });
  const bgColorRaw = useTransform(
    scrollY,
    [0, 80],
    ['rgba(0,0,0,0)', 'rgba(30,16,44,0.7)']
  );
  const bgColor = useSpring(bgColorRaw, { stiffness: 360, damping: 60 });

  const [blurValue, setBlurValue] = useState(0);
  const [bgValue, setBgValue] = useState('rgba(0,0,0,0)');
  useMotionValueEvent(blur, 'change', (latest) => setBlurValue(latest));
  useMotionValueEvent(bgColor, 'change', (latest) => setBgValue(latest));

    useEffect(() => {
    const nav = document.getElementById('main-navbar');
    const syncPadding = () => {
      if (nav) {
        nav.style.paddingRight = window.getComputedStyle(
          document.body
        ).paddingRight;
      }
    };

    const observer = new MutationObserver(syncPadding);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });

    syncPadding();

    window.addEventListener('resize', syncPadding);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', syncPadding);
      if (nav) nav.style.paddingRight = '';
    };
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <motion.nav
      id='main-navbar'
      style={{
        background: bgValue,
        backdropFilter: `blur(${blurValue}px)`,
        WebkitBackdropFilter: `blur(${blurValue}px)`,
        transition: 'background 0.3s, backdrop-filter 0.3s',
      }}
      className='fixed top-0 left-0 z-50 w-full'
    >
      <div
        className='mx-auto flex w-full max-w-[1200px] items-center justify-between px-4 md:px-0'
        style={{
          height: 'clamp(60px, 8vw, 80px)',
        }}
      >
        <div
          className='flex items-center'
          style={{ border: 'none', outline: 'none' }}
        >
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/icons/star_light.svg'
              alt='Logo'
              width={44}
              height={44}
              className='h-11 w-11'
              priority
            />
            <span className='text-xl font-bold tracking-wide text-white'>
              Nura
            </span>
          </Link>
        </div>

        {/* Menu Middle */}
        <div className='flex flex-1 justify-center'>
          <div className='hidden items-center gap-10 md:flex'>
            {navigationData.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleScrollWithOffset(e, item.href)}
                className='text-base font-medium text-white transition hover:text-purple-500'
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        {/* Get in Touch Button at Right */}
        <div className='hidden items-center md:flex'>
          <a
            href='#conversation'
            onClick={(e) => handleScrollWithOffset(e, '#conversation')}
          >
            <Button>Get in Touch</Button>
          </a>
        </div>

        {/* Mobile Hamburger */}
        {!menuOpen && (
          <button
            className='flex items-center p-0 text-white md:hidden'
            onClick={() => setMenuOpen(true)}
            aria-label='Open menu'
          >
            <svg
              className='h-7 w-7'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M4 6h16M4 12h16M4 18h16'
              />
            </svg>
          </button>
        )}
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className='bg-opacity-80 absolute top-0 left-0 min-h-screen w-full bg-black shadow-lg md:hidden'
            style={{
              backdropFilter: 'blur(8px)',
              WebkitBackdropFilter: 'blur(8px)',
            }}
          >
            {/* Header Drawer */}
            <div
              className='flex w-full items-center justify-between'
              style={{
                height: 'clamp(60px, 8vw, 80px)',
                paddingLeft: 'clamp(16px, 4vw, 32px)',
                paddingRight: 'clamp(16px, 4vw, 32px)',
              }}
            >
              <Link
                href='/'
                className='flex items-center gap-2'
                onClick={() => setMenuOpen(false)}
              >
                <Image
                  src='/icons/star_light.svg'
                  alt='Logo'
                  width={44}
                  height={44}
                  className='h-11 w-11'
                  priority
                />
                <span className='text-xl font-bold tracking-wide text-white'>
                  Nura
                </span>
              </Link>
              <button
                className='flex items-center p-2 text-white'
                onClick={() => setMenuOpen(false)}
                aria-label='Close menu'
              >
                <svg
                  className='h-7 w-7'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              </button>
            </div>
            {/* Menu Drawer Content */}
            <div className='flex flex-col gap-4 p-6'>
              {navigationData.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    handleScrollWithOffset(e, item.href);
                    setMenuOpen(false);
                  }}
                  className='group'
                >
                  <span className='block cursor-pointer rounded-md px-3 py-2 text-base font-normal text-white transition-colors duration-200 group-hover:bg-white/10 group-hover:text-blue-400 active:bg-white/20 active:text-blue-500'>
                    {item.label}
                  </span>
                </a>
              ))}
              <a
                href='#conversation'
                onClick={(e) => {
                  handleScrollWithOffset(e, '#conversation');
                  setMenuOpen(false);
                }}
              >
                <Button className='mt-2 w-full'>Get in Touch</Button>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
