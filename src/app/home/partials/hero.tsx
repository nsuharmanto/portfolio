'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState, useEffect } from 'react';

function EmailAlert({
  success,
  onClose,
}: {
  success: boolean;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9, ease: [0.42, 0, 0.58, 1] }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm'
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.42, 0, 0.58, 1] }}
        className='border-gray-1000 relative mx-5 flex w-full max-w-[461px] flex-col items-center rounded-2xl border bg-black shadow-lg hover:border-purple-500 hover:shadow-[0_0_10px_5px_rgba(169,63,168,0.5)]'
        style={{
          minWidth: '0',
          minHeight: '280px',
          maxHeight: '90vh',
          overflow: 'visible',
          boxSizing: 'border-box',
          padding: 0,
        }}
      >
        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: -70, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{
            duration: 0.7,
            ease: 'easeOut',
            delay: 0.25,
          }}
          style={{
            position: 'absolute',
            left: 'calc(50% - 64.5px)',
            top: 0,
            zIndex: 10,
            width: 129,
            height: 129,
            pointerEvents: 'none',
          }}
        >
          <Image
            src={success ? '/icons/email_success.svg' : '/icons/email_fail.svg'}
            alt={success ? 'Success' : 'Failed'}
            width={129}
            height={129}
            style={{ display: 'block' }}
            draggable={false}
            priority
          />
        </motion.div>
        <div
          style={{
            width: '100%',
            height: '100%',
            boxSizing: 'border-box',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '110px 24px 24px 24px',
          }}
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flex: 1,
              marginBottom: '40px',
            }}
          >
            <h3 className='mb-2 text-center text-xl font-bold text-white'>
              {success ? 'Message Sent Successfully!' : 'Send Failed'}
            </h3>
            <p
              className='mb-0 text-center text-gray-300'
              style={{ whiteSpace: 'pre-line' }}
            >
              {success
                ? "Thank you for reaching out.\nI'll get back to you as soon as possible"
                : "Something broke along the way. Let's try resending it."}
            </p>
          </div>
          <motion.button
            whileHover={{
              scale: 1.03,
              background:
                'radial-gradient(circle at 90% 10%, #9436A7 10%, #662474 50%, #321139 100%)',
              boxShadow:
                '0 8px 32px 0 rgba(76,29,149,0.35), 0 1.5px 6px 0 rgba(0,0,0,0.15)',
              color: '#fff',
              cursor: 'pointer',
            }}
            whileTap={{ scale: 0.98 }}
            className='h-12 w-full rounded-md bg-white py-3 font-semibold text-black transition-all'
            style={{
              fontSize: 'clamp(1rem, 2vw, 1.15rem)',
              transition: 'background 0.3s, color 0.2s',
              marginTop: 'auto',
              cursor: 'pointer',
            }}
            onClick={onClose}
          >
            {success ? 'Back to Home' : 'Try Again'}
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

const Hero = ({ showModal = false }: { showModal?: boolean }) => {
  const [modalOpen, setModalOpen] = useState(showModal);

  useEffect(() => {
    const updateBodyStyles = () => {
      if (modalOpen) {
        const scrollbarWidth =
          window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.paddingRight = `${scrollbarWidth}px`;
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      } else {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
        document.documentElement.style.paddingRight = '';
        document.body.style.paddingRight = '';
      }
    };

    requestAnimationFrame(updateBodyStyles);

    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      document.documentElement.style.paddingRight = '';
      document.body.style.paddingRight = '';
    };
  }, [modalOpen]);

  const handleClose = () => {
    window.history.replaceState({}, document.title, '/');
    setModalOpen(false);
  };

  return (
    <>
      <AnimatePresence>
        {modalOpen && <EmailAlert success={true} onClose={handleClose} />}
      </AnimatePresence>

      <section
        id='home'
        className='relative flex min-h-[852px] w-full flex-col items-start justify-start overflow-hidden md:min-h-[946px] md:flex-row md:items-center md:justify-center'
      >
        {/* Grid + Hero Background */}
        <div className='pointer-events-none absolute inset-0 z-0 h-full w-full'>
          <Image
            src='/images/grid.svg'
            alt='Grid Background'
            fill
            className='h-full w-full object-cover opacity-40'
            priority
            sizes='100vw'
          />
          <Image
            src='/images/hero_bg.svg'
            alt='Hero Background'
            fill
            className='h-full w-full object-cover opacity-60'
            priority
            sizes='100vw'
          />
        </div>

        {/* PORTOFOLIO text */}
        <h1
          className='absolute left-1/2 z-20 -translate-x-1/2 pr-1 font-extrabold whitespace-nowrap select-none md:pr-3'
          style={{
            top: 'clamp(70px, 12vw, 176px)',
            fontSize: 'clamp(3.47rem, 9vw, 8.85rem)',
            lineHeight: 'clamp(4.375rem, 12vw, 11.2rem)',
            letterSpacing: '-0.05em',
            background:
              'linear-gradient(90deg, #5B2E8C 0%, #A259C3 50%, #E97E8A 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(255,255,255,0.15)',
            opacity: 0.9,
          }}
        >
          PORTFOLIO
        </h1>

        {/* Main Content */}
        <div className='relative z-40 mt-[467px] ml-4 flex flex-col items-start gap-3 md:mt-0 md:mr-39 md:ml-50 md:min-h-48 md:w-full md:flex-row md:items-center md:gap-0'>
          {/* Name Container */}
          <div className='flex flex-1 flex-col items-start justify-center'>
            <h2
              className='font-extrabold text-white'
              style={{
                fontSize: 'clamp(2.1875rem, 7vw, 3.8rem)',
                lineHeight: 'clamp(2.5rem, 8vw, 4.2rem)',
                letterSpacing: '-0.02em',
              }}
            >
              NURA
            </h2>
            <h2
              className='font-extrabold text-white'
              style={{
                fontSize: 'clamp(2.1875rem, 7vw, 3.8rem)',
                lineHeight: 'clamp(2.5rem, 8vw, 4.2rem)',
                letterSpacing: '-0.02em',
              }}
            >
              SUHARMANTO
            </h2>
          </div>

          {/* Right: About & Social */}
          <div className='flex max-w-[340px] flex-col items-start justify-center'>
            <h3
              className={
                'text-display-md mb-1 leading-[44px] font-bold text-white'
              }
            >
              About me
            </h3>
            <p
              className={
                'text-md mb-6 leading-[28px] font-medium text-white md:mb-10'
              }
            >
              Passionate about frontend development,
              <br />I focus on crafting digital products.
            </p>
            <div className='flex gap-3 md:gap-3'>
              <a
                href='https://facebook.com'
                aria-label='Facebook'
                className='flex h-[53px] w-[53px] items-center justify-center rounded-full bg-[#3C234A] transition hover:bg-[#69379F]'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='/icons/facebook.svg'
                  alt='Facebook'
                  width={48}
                  height={48}
                />
              </a>
              <a
                href='https://instagram.com'
                aria-label='Instagram'
                className='flex h-[53px] w-[53px] items-center justify-center rounded-full bg-[#3C234A] transition hover:bg-[#A259C3]'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='/icons/instagram.svg'
                  alt='Instagram'
                  width={48}
                  height={48}
                />
              </a>
              <a
                href='https://linkedin.com'
                aria-label='LinkedIn'
                className='flex h-[53px] w-[53px] items-center justify-center rounded-full bg-[#3C234A] transition hover:bg-[#E66574]'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='/icons/linkedin.svg'
                  alt='LinkedIn'
                  width={48}
                  height={48}
                />
              </a>
              <a
                href='https://tiktok.com'
                aria-label='TikTok'
                className='flex h-[53px] w-[53px] items-center justify-center rounded-full bg-[#3C234A] transition hover:bg-[#E87d8A]'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Image
                  src='/icons/tiktok.svg'
                  alt='TikTok'
                  width={48}
                  height={48}
                />
              </a>
            </div>
          </div>
        </div>

        {/* Middle Image */}
        <div
          className='absolute z-30 flex items-center justify-center'
          style={{
            top: 'clamp(107px, 18vw, 268px)',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 'clamp(319.18px, 50vw, 383px)',
            height: 'clamp(414px, 60vw, 496.77px)',
            maxWidth: '383px',
            maxHeight: '496.77px',
          }}
        >
          <div
            className='flex items-center justify-center bg-white/10 p-0 shadow-2xl'
            style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderTopLeftRadius: 'clamp(938775.5px, 60vw, 1126470.63px)',
              borderTopRightRadius: 'clamp(938775.5px, 60vw, 1126470.63px)',
              borderBottomLeftRadius: '0px',
              borderBottomRightRadius: '0px',
            }}
          >
            <Image
              src='/images/me_ai.png'
              alt='Nura AI'
              fill
              sizes='(max-width: 600px) 319.18px, 383px'
              className='object-cover'
              priority
              style={{
                borderTopLeftRadius: 'clamp(938775.5px, 60vw, 1126470.63px)',
                borderTopRightRadius: 'clamp(938775.5px, 60vw, 1126470.63px)',
                borderBottomLeftRadius: '0px',
                borderBottomRightRadius: '0px',
              }}
            />

            {/* Icon expert_fe */}
            {/* <div
              className='absolute right-[-14px] bottom-[-43px] z-40 md:right-[-55px] md:bottom-[-20px]'
              style={{
                width: 'clamp(97px, 12vw, 120px)',
                height: 'clamp(97px, 12vw, 120px)',
              }}
            >
              <Image
                src='/icons/expert_fe.svg'
                alt='Expert Frontend Icon'
                width={120}
                height={120}
                className='h-full w-full'
                priority
              />
            </div> */}

            <div
              className='absolute right-[-130px] bottom-[-200px] z-40 flex items-center justify-center md:right-[-190px] md:bottom-[-205px]'
              style={{
                width: 'clamp(97px, 12vw, 120px)',
                height: 'clamp(97px, 12vw, 120px)',
                position: 'relative',
              }}
            >
              {/* Animasi lingkaran teks+background */}
              <motion.img
                src='/icons/expert_fe_full.svg'
                alt='Expert Frontend Circle'
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  zIndex: 2,
                  pointerEvents: 'none',
                }}
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 12, ease: 'linear' }}
                draggable={false}
              />
              {/* Icon globe di tengah */}
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  width: 'clamp(28px, 3vw, 34px)',
                  height: 'clamp(28px, 3vw, 34px)',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  pointerEvents: 'none',
                }}
              >
                <Image
                  src='/icons/globe.svg'
                  alt='Globe Icon'
                  width={34}
                  height={34}
                  priority
                  style={{ width: '100%', height: '100%', display: 'block' }}
                />
              </div>
            </div>

            {/* Icon star_light */}
            <div
              className='absolute right-[-13px] bottom-[325px] z-40 md:right-[-46px] md:bottom-[347px]'
              style={{
                width: 'clamp(81px, 8vw, 126px)',
                height: 'clamp(81px, 8vw, 126px)',
              }}
            >
              <Image
                src='/icons/star_light.svg'
                alt='Star Light Icon'
                width={126}
                height={126}
                className='h-[126px] w-[126px]'
                priority
                style={{
                  width: '100%',
                  height: 'auto',
                }}
              />
            </div>
          </div>
        </div>

        <button
          className='absolute bottom-0 left-1/2 z-40 flex -translate-x-1/2 cursor-pointer items-center justify-center bg-transparent shadow-lg transition-all duration-500'
          aria-label='Scroll to top'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{
            height: 'clamp(50px, 8vw, 105px)',
            width: 'clamp(73.37px, 12vw, 105px)',
          }}
        >
          <div
            className='relative flex items-start justify-center overflow-hidden'
            style={{
              height: 'clamp(50px, 8vw, 105px)',
              width: 'clamp(73.37px, 12vw, 105px)',
            }}
          >
            <Image
              src='/icons/fluent_arrow_up.svg'
              alt='Arrow Up'
              width={105}
              height={156}
              className='object-cover transition-all duration-500'
              priority
              style={{ objectPosition: 'top' }}
            />
          </div>
        </button>
      </section>
    </>
  );
};

export default Hero;
