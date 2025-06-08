'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HiMenu, HiX } from 'react-icons/hi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur-sm shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo + Brand */}
        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="/tokasa/logoTK.jpg"
            alt="ToKasa logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-2xl md:text-3xl font-extrabold text-blue-900 tracking-tight">
            ToKasa
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex space-x-8 text-sm md:text-base font-medium text-neutral-600">
          {[
            { label: 'Features', href: '#features' },
            { label: 'FAQ',      href: '#faq'      },
            { label: 'Contact',  href: '#contact'  },
          ].map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-blue-600 transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA button (desktop) */}
        <div className="hidden md:block">
          <Link
            href="/dashboard"
            className="
              inline-block
              px-5 py-2
              bg-gradient-to-r from-blue-600 to-blue-800
              text-white text-sm md:text-base
              font-semibold
              rounded-full
              shadow-lg
              hover:from-blue-500 hover:to-blue-700
              transition
            "
          >
            Enter App
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-2xl text-neutral-700"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="md:hidden bg-white/90 backdrop-blur-sm shadow-inner overflow-hidden"
          >
            <div className="flex flex-col px-6 py-4 space-y-4">
              {[
                { label: 'Features', href: '#features' },
                { label: 'FAQ',      href: '#faq'      },
                { label: 'Contact',  href: '#contact'  },
              ].map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className="text-neutral-700 text-base hover:text-blue-600 transition-colors"
                >
                  {label}
                </Link>
              ))}
              <Link
                href="/dashboard"
                onClick={() => setMobileOpen(false)}
                className="
                  mt-2 text-center
                  px-5 py-2
                  bg-gradient-to-r from-blue-600 to-blue-800
                  text-white text-base
                  font-semibold
                  rounded-full
                  shadow-lg
                  hover:from-blue-500 hover:to-blue-700
                  transition
                "
              >
                Enter App
              </Link>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
