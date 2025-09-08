'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';

import { Button } from '@/components/ui/button';

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
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/60'
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className='border-gray-1000 relative flex flex-col items-center rounded-2xl border bg-black shadow-lg hover:border-purple-500 hover:shadow-[0_0_10px_5px_rgba(169,63,168,0.5)]'
        style={{
          width: '461px',
          minWidth: '320px',
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
              marginBottom: '42px',
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
            className='h-12 w-full rounded-md bg-white py-3 font-semibold text-black transition-all cursor-pointer'
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

export default function ConversationForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!navigator.onLine) {
      setAlertOpen(true);
      setAlertSuccess(false);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {
        setAlertOpen(true);
        setAlertSuccess(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        setAlertOpen(true);
        setAlertSuccess(false);
      }
    } catch {
      setAlertOpen(true);
      setAlertSuccess(false);
    }
    setLoading(false);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    setAlertSuccess(false);
    if (alertSuccess) setForm({ name: '', email: '', message: '' });
  };

  return (
    <>
      <AnimatePresence>
        {alertOpen && (
          <EmailAlert success={alertSuccess} onClose={handleAlertClose} />
        )}
      </AnimatePresence>
      <section
        id='conversation'
        className='flex min-h-screen w-full items-center justify-center px-4 pt-10 pb-20 md:px-0 md:pt-20 md:pb-30'
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className='flex w-full max-w-[480px] flex-col overflow-hidden rounded-2xl border border-gray-950 bg-black shadow-lg md:max-w-[1200px] md:flex-row'
        >
          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className='flex h-[260px] w-full items-center justify-center bg-neutral-900 md:h-auto md:w-1/2'
          >
            <Image
              src='/images/start_conversation.svg'
              alt='Start Conversation'
              width={420}
              height={420}
              className='h-full w-full rounded-none object-cover md:h-[642px] md:rounded-l-2xl'
              draggable={false}
              priority
            />
          </motion.div>

          {/* Form Section */}
          <div className='flex w-full flex-col justify-center p-6 md:w-1/2 md:p-10'>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className='mb-2 font-extrabold text-white'
              style={{
                fontSize: 'clamp(2rem, 5vw, 2.8rem)',
                lineHeight: 'clamp(2.4rem, 6vw, 3.2rem)',
                letterSpacing: '-0.02em',
              }}
            >
              Start a Conversation
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className='mb-6 text-gray-300'
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.25rem)',
                lineHeight: 'clamp(1.5rem, 3vw, 2rem)',
              }}
            >
              I&#39;m open to freelance gigs, collaborations, or even just a
              casual chat.
            </motion.p>
            <form className='space-y-5' onSubmit={handleSubmit}>
              <div>
                <label
                  className='mb-1 block font-semibold text-white'
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                >
                  Name<span className='text-red-500'>*</span>
                </label>
                <input
                  type='text'
                  name='name'
                  value={form.name}
                  onChange={handleChange}
                  placeholder='What should I call you?...'
                  className='w-full border-b border-gray-900 bg-transparent py-2 text-gray-300 transition-all focus:border-purple-700 focus:outline-none'
                  style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' }}
                  required
                />
              </div>
              <div>
                <label
                  className='mb-1 block font-semibold text-white'
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                >
                  Email<span className='text-red-500'>*</span>
                </label>
                <input
                  type='email'
                  name='email'
                  value={form.email}
                  onChange={handleChange}
                  placeholder='Where can I reach you? ...'
                  className='w-full border-b border-gray-900 bg-transparent py-2 text-gray-300 transition-all focus:border-purple-700 focus:outline-none'
                  style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' }}
                  required
                />
              </div>
              <div>
                <label
                  className='mb-1 block font-semibold text-white'
                  style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
                >
                  Message<span className='text-red-500'>*</span>
                </label>
                <textarea
                  name='message'
                  value={form.message}
                  onChange={handleChange}
                  rows={2}
                  placeholder='Tell me about your project or just say hi :) ...'
                  className='w-full resize-none border-b border-gray-900 bg-transparent py-2 text-gray-300 transition-all focus:border-purple-700 focus:outline-none'
                  style={{ fontSize: 'clamp(0.95rem, 2vw, 1.15rem)' }}
                  required
                />
              </div>
              <Button
                type='submit'
                className='mt-2 h-12 w-full rounded-md py-3 font-semibold text-black shadow transition-all'
                whileHover={{
                  scale: 1.03,
                  background:
                    'radial-gradient(circle at 90% 10%, #9436A7 10%, #662474 50%, #321139 100%)',
                  boxShadow:
                    '0 8px 32px 0 rgba(76,29,149,0.35), 0 1.5px 6px 0 rgba(0,0,0,0.15)',
                  color: '#fff',
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: '#fff',
                  fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                  transition: 'background 0.3s, color 0.2s',
                }}
                disabled={loading}
              >
                {loading ? 'Sending...' : "Let's Build Something"}
              </Button>
            </form>
          </div>
        </motion.div>
      </section>
    </>
  );
}