'use client';

import { motion } from 'framer-motion';

import { skillsWithMe, skillsOther } from '@/app/constants/_mocks_/skills-data';

const Interface = () => (
  <section className='w-full py-10 md:py-20'>
    <div className='mx-auto max-w-[1200px] px-4 md:px-0'>
      {/* Header */}
      <div className='mb-10 text-center md:mb-16'>
        <h2
          className='mb-3 font-bold text-white md:mb-4'
          style={{
            fontSize: 'clamp(1.75rem, 2.5vw, 3rem)',
            lineHeight: '1.2',
          }}
        >
          Choose Wisely, Get Quality Results
        </h2>
        <p className='text-[1rem] font-normal text-gray-400 md:text-[1.125rem]'>
          Make the right choice for interfaces that are fast, reliable, and
          visually sharp.
        </p>
      </div>

      {/* Skills Section */}
      <div className='flex flex-col gap-5 md:flex-row md:items-start'>
        {/* With Me */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='flex-1 rounded-2xl p-6 md:p-10'
          style={{
            background: `
              radial-gradient(ellipse 150% 175% at 0% 100%, #321752 0%, #A93FA8 70%, transparent 100%),
              radial-gradient(ellipse 200% 175% at 100% 0%, #5E2591 10%, #A93FA8 90%, #F6A18D 100%, transparent 100%)
            `,
          }}
        >
          <h3
            className='mb-3 font-semibold text-white md:mb-4'
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.2',
            }}
          >
            With Me
          </h3>
          <p
            className='mb-4 font-normal text-gray-400 md:mb-4'
            style={{
              fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
              lineHeight: '1.2',
            }}
          >
            Partnering with me means working with someone who prioritizes
            quality, precision, and performance. I deliver interfaces that are
            not only visually stunning but also highly functional and
            maintainable.
          </p>
          <ul className='space-y-2 md:space-y-4'>
            {skillsWithMe.map((skill, index) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className='flex items-center gap-2 rounded-md bg-black/10 p-3 text-white shadow-md md:px-4 md:py-3'
              >
                {/* SVG Star with gradient and animated gradient */}
                <motion.svg
                  width='30'
                  height='30'
                  viewBox='0 0 43 44'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-[30px] w-[30px]'
                  style={{
                    width: 'clamp(30px, 6vw, 30px)',
                    height: 'clamp(30px, 6vw, 30px)',
                  }}
                  initial={{ scale: 1, rotate: 0 }}
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 5, -5, 0],
                    filter: [
                      'drop-shadow(0px 0px 0px rgba(255, 255, 255, 0))',
                      'drop-shadow(0px 0px 10px rgba(255, 255, 255, 0.8))',
                      'drop-shadow(0px 0px 0px rgba(255, 255, 255, 0))',
                    ],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: 'easeInOut',
                  }}
                >
                  <path
                    d='M21.5 43.5C20.8775 23.1313 20.3687 22.6257 0 22C20.3687 21.3775 20.8744 20.8687 21.5 0.5C22.1224 20.8687 22.6313 21.3744 43 22C22.6313 22.6257 22.1257 23.1251 21.5 43.5Z'
                    fill='white'
                  />
                </motion.svg>
                <span
                  className='p-3 font-normal text-gray-400'
                  style={{
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                    lineHeight: '1.2',
                  }}
                >
                  {skill}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Other */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className='flex-1 rounded-2xl border border-gray-900 bg-black p-6 md:p-10'
        >
          <h3
            className='mb-3 font-semibold text-white md:mb-4'
            style={{
              fontSize: 'clamp(1.125rem, 2vw, 1.5rem)',
              lineHeight: '1.2',
            }}
          >
            Other
          </h3>

          <ul className='space-y-2 md:mt-[88px] md:space-y-4'>
            {skillsOther.map((skill, index) => (
              <motion.li
                key={skill}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className='flex items-center gap-4 rounded-md bg-gray-900 p-3 text-white shadow-md'
              >
                <motion.svg
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-[24px] w-[24px]'
                  style={{
                    width: 'clamp(24px, 4vw, 24px)',
                    height: 'clamp(24px, 4vw, 24px)',
                  }}
                  initial={{ scale: 1 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.5,
                    ease: 'easeInOut',
                  }}
                >
                  <path
                    d='M18 6L6 18'
                    stroke='#FF0000'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                  <path
                    d='M6 6L18 18'
                    stroke='#FF0000'
                    strokeWidth='2'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                  />
                </motion.svg>
                <span
                  className='p-3 font-normal text-gray-400'
                  style={{
                    fontSize: 'clamp(0.875rem, 1.5vw, 1rem)',
                    lineHeight: '1.2',
                  }}
                >
                  {skill}
                </span>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default Interface;
