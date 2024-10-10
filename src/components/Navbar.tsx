"use client";
import { button } from 'framer-motion/client';
import Link from 'next/link';
import React, { useState } from 'react';

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  return (
    <nav className="backdrop-blur-md shadow-md fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold"><Link href='/'>PujoPixel</Link></h1>
          </div>
          <div className="flex items-center md:hidden">
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
              title="Toggle Menu"
              onClick={toggleMenu}
              className="text-gray-500 focus:outline-none"
            >
              {isOpen ? (
                // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
<svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="hidden md:flex md:items-center md:space-x-8">
            <a href="/about" className="text-white hover:text-gray-900">About</a>
            <a href="/explore" className="text-white hover:text-gray-900">Explore</a>
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"><Link href='/upload'>Add Panel</Link></button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}  backdrop-blur-xl`}>
        <div className="flex flex-col px-4 py-2 space-y-2">
          <a href="/about" className="text-white hover:text-gray-900">About</a>
          <a href="/explore" className="text-white hover:text-gray-900">Explore</a>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"><Link href='/upload'>Add Panel</Link></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
