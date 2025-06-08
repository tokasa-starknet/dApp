'use client';

import { Coins, Building, Gift } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      ease: 'easeOut',
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function WhatIsToKasa() {
  return (
    <section
      id="what-is-tokasa"
      className="
        bg-gradient-to-br from-white via-gray-50 to-blue-50
        snap-start
        min-h-screen
        flex flex-col items-center justify-center
        py-16 px-4 sm:px-8 lg:px-16
        text-center
      "
    >
      <motion.h2
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-4"
      >
        What Is ToKasa?
      </motion.h2>

      <motion.p
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="text-base sm:text-lg text-neutral-600 max-w-2xl mb-12"
      >
        ToKasa transforms vacation property ownership through blockchain technology
        and innovative tokenomics.
      </motion.p>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {/* Tokenization */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, boxShadow: '0 15px 25px rgba(0,0,0,0.05)' }}
          className="
            bg-white rounded-2xl shadow-lg p-8
            flex flex-col items-start
            transition-shadow cursor-pointer
          "
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
            <Coins className="text-blue-900" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            Tokenization
          </h3>
          <p className="text-sm text-neutral-600">
            Convert real estate assets into digital tokens on the blockchain,
            enabling fractional ownership and seamless transfers with complete legal backing.
          </p>
        </motion.div>

        {/* Fractional Ownership */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, boxShadow: '0 15px 25px rgba(0,0,0,0.05)' }}
          className="
            bg-white rounded-2xl shadow-lg p-8
            flex flex-col items-start
            transition-shadow cursor-pointer
          "
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
            <Building className="text-blue-900" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            Fractional Ownership
          </h3>
          <p className="text-sm text-neutral-600">
            Own a percentage of premium vacation properties and receive
            proportional returns from rental income and property appreciation.
          </p>
        </motion.div>

        {/* Guest Rewards */}
        <motion.div
          variants={cardVariants}
          whileHover={{ y: -5, boxShadow: '0 15px 25px rgba(0,0,0,0.05)' }}
          className="
            bg-white rounded-2xl shadow-lg p-8
            flex flex-col items-start
            transition-shadow cursor-pointer
          "
        >
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
            <Gift className="text-blue-900" size={24} />
          </div>
          <h3 className="text-xl font-semibold text-blue-900 mb-2">
            Guest Rewards
          </h3>
          <p className="text-sm text-neutral-600">
            Earn and redeem tokens for stays, upgrades, and exclusive experiences
            across the ToKasa property network worldwide.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
