'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="h-screen snap-start bg-gradient-to-br from-white via-gray-50 to-blue-50 relative overflow-hidden"
    >
      <div className="container mx-auto px-6 lg:px-8 h-full flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center w-full">

          {/* ===== Bloque de texto ===== */}
          <motion.div
            className="flex flex-col justify-center h-full max-w-lg space-y-6"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7 }}
          >
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-900 tracking-tight leading-tight">
              Democratizing Vacation Rental Investments
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Fractional ownership, passive rental income & exclusive guest benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="/opportunities"
                className="px-8 py-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white font-medium rounded-full shadow-lg hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 transition inline-block"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Opportunities
              </motion.a>
              <motion.a
                href="/litepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-white text-blue-900 font-medium border-2 border-blue-900 rounded-full shadow-sm hover:bg-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200 transition inline-flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Read Litepaper <span className="ml-2">↗</span>
              </motion.a>
            </div>
          </motion.div>

          {/* ===== Imagen ===== */}
          <motion.div
            className="hidden lg:block"
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Image
              src="/HomeHeroSection.png"
              alt="Vacation property"
              width={800}
              height={500}
              className="rounded-2xl shadow-2xl object-cover w-full h-[500px]"
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
