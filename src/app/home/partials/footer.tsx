'use client';

import React from 'react';

const Footer = () => {
  return (
    <footer
      className="w-full py-6 px-4 flex flex-col items-center justify-center"
      style={{
        borderTop: '1px solid rgba(255,255,255,0.10)',
      }}
    >
      <div className="w-full max-w-[1200px] flex flex-col items-center justify-center">
        <span className="text-gray-400 text-sm md:text-md font-medium text-center">
          © 2025 Nura Suharmanto. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
