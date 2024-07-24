"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import ProgressBar from './ProgressBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
    <ProgressBar />
    <nav className="bg-yellow-500 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-lg">
          <Link href="/">Kiddo Knowledge</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/" className="text-white hover:text-gray-300">Home</Link>
          <Link href="/nursery" className="text-white hover:text-gray-300">Nursery</Link>
          <Link href="/first-grade" className="text-white hover:text-gray-300">1st Grade</Link>
          <Link href="/second-grade" className="text-white hover:text-gray-300">2nd Grade</Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link href="/" className="block text-white hover:text-gray-300">Home</Link>
          <Link href="/nursery" className="block text-white hover:text-gray-300">Nursery</Link>
          <Link href="/first-grade" className="block text-white hover:text-gray-300">1st Grade</Link>
          <Link href="/second-grade" className="block text-white hover:text-gray-300">2nd Grade</Link>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;