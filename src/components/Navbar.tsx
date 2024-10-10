"use client";
import { button } from 'framer-motion/client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Navbar1 = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 200) { // Change 200 to the scroll amount where you want the effect
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className=" backdrop-blur  fixed top-0 w-full z-50 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold"><Link href='/'></Link></h1>
            <div className="mr-4">
              <Link href="/">
                <Image src="/PUJA.png" alt="Durga Puja" width={180} height={60} className="rounded-xl" />
              </Link>
            </div>
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
<button className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-festiveOrange"><Link href='/upload'>Add Pandal</Link></button>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}  backdrop-blur-xl`}>
        <div className="flex flex-col px-4 py-2 space-y-2">
          <a href="/about" className="text-white hover:text-gray-900">About</a>
          <a href="/explore" className="text-white hover:text-gray-900">Explore</a>
          {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button className="bg-rose-600 text-white px-4 py-2 rounded hover:bg-festiveOrange"><Link href='/upload'>Add Pandal</Link></button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar1;
