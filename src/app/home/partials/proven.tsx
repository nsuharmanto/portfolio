'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';

import { provenData } from '@/app/constants/_mocks_/proven-data';

function CountUp({
  value,
  duration = 1.2,
}: {
  value: string;
  duration?: number;
}) {
  const isPercent = value.includes('%');
  const isPlus = value.includes('+');
  const endValue = parseInt(value.replace(/\D/g, ''));
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = endValue / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [endValue, duration]);

  return (
    <span>
      {count}
      {isPercent ? '%' : ''}
      {isPlus ? '+' : ''}
    </span>
  );
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9 },
  },
};

const Proven = () => (
  <section className='w-full bg-black py-10 md:py-20'>
    <div className='mx-auto max-w-[1200px] px-4 md:px-0'>
      {/* Title & Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className='mb-6 md:mb-16'
      >
        <h2 className='mb-3 text-[1.75rem] leading-tight font-bold text-white md:mb-4 md:text-[3rem]'>
          Proven Numbers. Real Impact.
        </h2>
        <p className='text-[1rem] font-normal text-gray-400 md:text-[1.125rem]'>
          From shipped products to years of experience
        </p>
      </motion.div>
      {/* Proven Data */}
      <div className='flex flex-col gap-0'>
        {provenData.map((item, i) => (
          <motion.div
            key={item.value}
            initial='hidden'
            whileInView='visible'
            variants={itemVariants}
            viewport={{ once: true, amount: 0.3 }}
            transition={{
              delay: i * 0.18,
              duration: 0.7,
              ease: [0.42, 0, 0.58, 1],
            }}
            className='group flex items-center justify-between border-b border-gray-800 py-4 transition-all duration-300 last:border-b-0 hover:bg-gradient-to-r hover:from-[#2d0c4a]/40 hover:to-[#a93fa8]/10 md:py-12'
          >
            <div
              className='flex items-center gap-2 md:gap-2'
              style={{
                width: 'fit-content',
                height: 'fit-content',
              }}
            >
              {/* SVG Star with gradient and animated gradient */}
              <motion.svg
                width='28'
                height='28'
                viewBox='0 0 43 44'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='h-[28px] w-[28px] md:h-[44px] md:w-[44px]'
                style={{
                  width: 'clamp(28px, 6vw, 44px)',
                  height: 'clamp(28px, 6vw, 44px)',
                }}
                initial={{ rotate: 0 }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 2,
                  ease: 'easeInOut',
                }}
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
              </motion.svg>
              <span
                className='font-bold text-white'
                style={{
                  fontSize: 'clamp(2rem, 7vw, 5rem)', 
                  lineHeight: '1.1',
                  letterSpacing: '-2%',
                }}
              >
                <CountUp value={item.value} duration={5} />
              </span>
            </div>
            <div className='md:items-left absolute left-1/2 flex -translate-x-1/2 flex-col items-start md:h-[88px] md:w-[272px] md:justify-center'>
              <span className='text-[1rem] font-medium text-white md:text-[2rem]'>
                {item.label1}
              </span>
              <span className='text-[1rem] font-medium text-white md:text-[2rem]'>
                {item.label2}
              </span>
            </div>
            <motion.div
              className='relative ml-auto'
              style={{
                width: 'clamp(80px, 20vw, 120px)',
                height: 'clamp(80px, 20vw, 120px)',
              }}
              whileHover={{ scale: 1.08 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Image
                src={item.img}
                alt={item.alt}
                fill
                className='border-gray-800 rounded-2xl border object-cover transition-all duration-300 hover:border-purple-500 hover:shadow-[0_0_20px_5px_rgba(169,63,168,0.5)]'
                sizes='(max-width: 768px) 80px, 120px'
                priority
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Proven;
