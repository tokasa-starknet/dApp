'use client';

import { Building, CheckCircle, ArrowRightCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      ease: 'easeOut',
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function TokenEcosystem() {
  return (
    <section
      id="dual-token-ecosystem"
      className="
        bg-white
        min-h-screen snap-start
        flex flex-col items-center justify-center
        px-6 py-20 md:px-12
      "
    >
      <motion.div
        // cada vez que entre en viewport vuelve a animar
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
        className="w-full max-w-5xl text-center"
      >
        <motion.h2
          variants={cardVariants}
          className="text-3xl md:text-5xl font-extrabold text-blue-900 leading-tight"
        >
          Reimagining Real Estate Investment
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="mt-4 text-base md:text-lg text-neutral-600 max-w-2xl mx-auto"
        >
          Traditional real estate investment has barriers. ToKasa removes them through blockchain innovation.
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16"
        >
          {/* Traditional Real Estate Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: '0 20px 30px rgba(0,0,0,0.1)' }}
            className="
              flex flex-col
              bg-white
              rounded-2xl
              shadow-lg
              p-8
              cursor-pointer
              transition-shadow
            "
          >
            <div className="w-14 h-14 rounded-xl bg-neutral-100 flex items-center justify-center mb-6">
              <Building className="text-neutral-500" size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-neutral-800 mb-4">
              Traditional Real Estate Investment
            </h3>
            <ul className="space-y-3 text-sm text-neutral-600 pl-1">
              {[
                'High barriers to entry with large capital requirements',
                'Illiquid assets with lengthy transaction processes',
                'Complex management and maintenance responsibilities',
                'Limited transparency and accessibility',
              ].map((text) => (
                <li key={text} className="flex items-start gap-2">
                  <ArrowRightCircle className="text-neutral-400 mt-1" size={16} />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* The ToKasa Way Card */}
          <motion.div
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: '0 20px 30px rgba(0,0,0,0.2)' }}
            className="
              flex flex-col
              bg-gradient-to-br from-[#0A1E3F] to-[#2B4E9C]
              rounded-2xl
              shadow-xl
              p-8
              cursor-pointer
              transition-shadow
            "
          >
            <div className="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center mb-6">
              <CheckCircle className="text-white" size={24} />
            </div>
            <h3 className="text-xl md:text-2xl font-semibold text-white mb-4">
              The ToKasa Way
            </h3>
            <ul className="space-y-3 text-sm text-white pl-1">
              {[
                'Fractional ownership with minimal investment thresholds',
                'Liquid assets tradable 24/7 on blockchain',
                'Automated management through smart contracts',
                'Complete transparency and decentralized governance',
              ].map((text) => (
                <li key={text} className="flex items-start gap-2">
                  <CheckCircle className="text-white mt-1" size={16} />
                  {text}
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
