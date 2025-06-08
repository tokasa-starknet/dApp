'use client';

import { useState, MouseEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion } from 'framer-motion';

const navItems = [
  { label: 'Home', href: 'hero' },
  { label: 'Problem', href: 'problem' },
  { label: 'About', href: 'what-is-tokasa' },
  { label: 'Benefits', href: 'benefits' },
  { label: 'Ecosystem', href: 'dual-token-ecosystem' },
  { label: 'How', href: 'how-it-works' },
  { label: 'Why', href: 'why-choose-us' },
  { label: 'Roadmap', href: 'roadmap' },
  { label: 'FAQ', href: 'faq' },
  { label: 'Contact', href: 'join-community' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  const scrollTo = (e: MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/80 backdrop-blur-sm shadow">
      <div className="max-w-7xl mx-auto flex items-center h-16 px-4 lg:px-8">
        {/* LOGO */}
        <Link href="/" className="flex-shrink-0 flex items-center">
          <Image src="/tokasa/LogoOriginal1.png" alt="ToKasa" width={40} height={40} />
          
        </Link>

        {/* NAV (oculto en mobile) */}
        <nav className="hidden lg:flex flex-shrink-0 mx-auto space-x-8 text-sm text-neutral-700">
          {navItems.map(({ label, href }) => (
            <motion.a
              key={href}
              href={`#${href}`}
              onClick={e => scrollTo(e, href)}
              whileHover={{ color: '#1e40af', scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-1 py-1 hover:text-blue-600 transition"
            >
              {label}
            </motion.a>
          ))}
        </nav>

        {/* ENTER APP */}
        <div className="hidden lg:block flex-shrink-0">
          <motion.a
            href="/dashboard"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="  inline-block px-4 py-2  bg-gradient-to-r from-blue-600 to-blue-800  text-white text-sm font-semibold  rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transition " >
            Enter App
          </motion.a>
        </div>

        {/* MENU MÓVIL */}
        <button
          onClick={() => setOpen(o => !o)}
          className="lg:hidden ml-auto text-2xl text-neutral-700"
          aria-label="Toggle navigation"
        >
          {open ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* PANEL MÓVIL */}
      {open && (
        <div className="lg:hidden bg-white/95 backdrop-blur-sm shadow-inner">
          <div className="px-4 py-4 space-y-4">
            {navItems.map(({ label, href }) => (
              <a
                key={href}
                href={`#${href}`}
                onClick={e => scrollTo(e, href)}
                className="block text-base text-neutral-700 hover:text-blue-600 transition"
              >
                {label}
              </a>
            ))}
            <a
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="block mt-4 text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-base font-semibold rounded-full shadow-lg hover:from-blue-500 hover:to-blue-700 transition" >
              Enter App
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
