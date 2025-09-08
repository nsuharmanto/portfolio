'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

import { Button } from '@/components/ui/button';

import { portfolios, Portfolio } from '@/app/constants/_mocks_/portfolio-data';

export default function Frontend() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activePortfolio, setActivePortfolio] = useState<Portfolio | null>(
    null
  );

  const handleOpenModal = (portfolio: Portfolio) => {
    setActivePortfolio(portfolio);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setActivePortfolio(null);
  };

  useEffect(() => {
    const updateBodyStyles = () => {
      if (modalOpen) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.body.style.overflow = 'hidden'; 
        document.body.style.paddingRight = `${scrollbarWidth}px`; 
      } else {
        document.body.style.overflow = ''; 
        document.body.style.paddingRight = ''; 
      }
    };

    requestAnimationFrame(updateBodyStyles);

    return () => {
      document.body.style.overflow = ''; 
      document.body.style.paddingRight = '';
    };
  }, [modalOpen]);

  return (
    <section id="projects" className="w-full py-10 md:py-20">
      <div className="mx-auto max-w-[1200px] px-4 sm:px-6 md:px-0">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.42, 0, 0.58, 1] }}
          viewport={{ once: true }}
          className="mb-10 text-center md:mb-16"
        >
          <h2
            className="mb-4 font-bold text-white"
            style={{
              fontSize: 'clamp(2rem, 3vw, 3rem)',
              lineHeight: '1.2',
            }}
          >
            Frontend in Action
          </h2>
          <p className="text-[1rem] font-normal text-gray-400 md:text-[1.125rem]">
            These are hands-on projects where I delivered clean, responsive user
            interfaces.
          </p>
        </motion.div>

        {/* Portfolios */}
        <div className="mx-auto flex h-auto w-full max-w-[1159px] flex-col gap-6 md:h-[469px] md:flex-row">
          {portfolios.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.2, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="flex h-auto flex-1 flex-col items-center md:h-full"
            >
              <div className="relative h-[260px] w-full overflow-hidden rounded-md border-1 border-gray-1000 bg-gradient-to-br from-[#18181c] to-[#23232b] shadow-2xl transition-all duration-300 hover:border-purple-900 hover:shadow-[0_0_20px_5px_rgba(169,63,168,0.3)] md:h-[80%]">
                <Image
                  src={p.img}
                  alt={p.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 340px"
                  className="object-cover object-top transition-transform duration-700 hover:scale-105"
                  priority={i === 0}
                />
              </div>
              <div className="mt-6 flex w-full items-center justify-between px-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {p.title}
                  </h3>
                  <span className="text-sm text-gray-400">{p.year}</span>
                </div>
                <motion.button
                  whileHover={{ scale: 1.15 }}
                  className="group cursor-pointer rounded-full border border-gray-700 bg-black/60 p-1.5 transition-colors duration-200 hover:border-[1.5px] hover:border-purple-500 hover:bg-gradient-to-r hover:from-purple-800 hover:to-fuchsia-900 hover:shadow-[0_0_10px_5px_rgba(169,63,168,0.5)]"
                  aria-label="View Portfolio"
                  type="button"
                  onClick={() => handleOpenModal(p)}
                >
                  <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
                    <circle
                      cx="12"
                      cy="12"
                      r="12"
                      fill="currentColor"
                      className="text-gray-950"
                    />
                    <path
                      d="M10 8l4 4-4 4"
                      stroke="#fff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="transition-colors duration-200 group-hover:stroke-purple-500"
                    />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
        {/* Modal */}
        <AnimatePresence>
          {modalOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.42, 0, 0.58, 1] }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
                className="border-gray-1000 relative mx-4 w-[90vw] max-w-2xl rounded-md border bg-gradient-to-br from-[#23232b] via-[#18181c] to-[#2d0b3a] p-6 shadow-2xl sm:p-10 hover:border-purple-500 hover:shadow-[0_0_10px_5px_rgba(169,63,168,0.5)]"
                style={{ minWidth: '300px', width: '100%', maxWidth: '600px' }}
              >
                <div className="flex flex-col items-center gap-6">
                  <h3 className="mb-2 text-center text-2xl font-extrabold tracking-tight text-white">
                    {activePortfolio?.title}
                  </h3>
                  <div className="flex flex-col items-center gap-3">
                    <p className="mb-0 text-center text-lg leading-8 text-gray-300">
                      Portfolio details are not available yet.
                    </p>
                    <p className="mb-0 text-center text-lg leading-8 text-gray-300">
                      This feature will be coming soon!
                    </p>
                  </div>
                  <Button
                    onClick={handleCloseModal}
                    className="mt-2 px-8 py-2 text-base font-semibold"
                    aria-label="Close Modal"
                    variant="default"
                  >
                    Close
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}