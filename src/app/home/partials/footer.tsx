'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer
      className='flex w-full flex-col items-center justify-center px-4 py-6'
      style={{
        borderTop: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <div className='flex w-full max-w-[1200px] flex-col items-center justify-center'>
        <span className='md:text-md text-center text-sm font-medium text-gray-400'>
          © 2026 Nura Suharmanto. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
