'use client';

import { AlertCircle, CheckCircle } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.2, ease: 'easeOut' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function ProblemSolutionSection() {
  return (
    <motion.section
      id="problem"
      className="bg-white min-h-screen snap-start flex flex-col items-center justify-center py-16 px-6 sm:px-8 lg:px-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Heading + Intro */}
      <motion.div variants={itemVariants} className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-3xl md:text-4xl font-extrabold text-blue-900 mb-4">
          The Problem &amp; Our Solution
        </h2>
        <p className="text-neutral-600 text-lg">
          Traditional real estate suffers from high entry barriers, illiquidity, opaque processes
          and middlemen. ToKasa removes these obstacles through blockchain-driven fractional
          ownership and a transparent dual-token ecosystem.
        </p>
      </motion.div>

      {/* Two-column grid */}
      <motion.div
        variants={containerVariants}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        {/* The Problem (ahora idéntico en estilo al Solution) */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
          className="
            bg-white 
            rounded-2xl
            p-10
            flex flex-col
            transition-transform
            shadow-lg
          "
        >
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
            <AlertCircle className="text-blue-900" size={28} />
          </div>
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">The Problem</h3>
          <ul className="space-y-3 text-neutral-600 list-disc list-inside">
            <li>High minimum capital requirements</li>
            <li>Illiquid assets & delayed transactions</li>
            <li>Centralized control & middlemen</li>
            <li>Lack of transparency in management</li>
            <li>Complex property maintenance</li>
          </ul>
        </motion.div>

        {/* Our Solution */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.1)' }}
          className="
            bg-white 
            rounded-2xl
            p-10
            flex flex-col
            transition-transform
            shadow-lg
          "
        >
          <div className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mb-6">
            <CheckCircle className="text-blue-900" size={28} />
          </div>
          <h3 className="text-2xl font-semibold text-blue-900 mb-4">Our Solution</h3>
          <ul className="space-y-3 text-neutral-600 list-disc list-inside">
            <li>Blockchain tokenization for fractional ownership</li>
            <li>24/7 tradable liquidity on secondary markets</li>
            <li>Automated management via smart contracts</li>
            <li>Decentralized governance & full transparency</li>
            <li>Low entry threshold for all participants</li>
          </ul>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
