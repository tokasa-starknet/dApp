'use client';

import { User, Coins, Building, Gift } from 'lucide-react';
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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const steps = [
  {
    number: 1,
    icon: User,
    title: 'Register',
    desc: 'Create your account and complete KYC verification to join the platform securely.',
  },
  {
    number: 2,
    icon: Coins,
    title: 'Tokenize',
    desc: 'List your property or browse available tokenized properties in our curated marketplace.',
  },
  {
    number: 3,
    icon: Building,
    title: 'Invest',
    desc: 'Purchase property tokens and build your diversified real estate portfolio.',
  },
  {
    number: 4,
    icon: Gift,
    title: 'Earn',
    desc: 'Receive regular rental income and benefit from potential property value appreciation.',
  },
];

export default function HowItWorks() {
  return (
    <motion.section
      id="how-it-works"
      className="
        bg-gradient-to-br from-white via-gray-50 to-blue-50
        snap-start
        min-h-screen
        flex flex-col items-center justify-center
        py-20 px-4 sm:px-8 lg:px-16
        text-center
      "
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-4"
      >
        How It Works
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg text-neutral-600 mb-12 max-w-2xl"
      >
        Four simple steps to start your journey with ToKasa and begin earning from real estate
      </motion.p>

      {/* Steps */}
      <motion.div
        variants={containerVariants}
        className="w-full max-w-5xl flex items-center justify-between gap-4 overflow-x-auto"
      >
        {steps.map(({ number, icon: Icon, title, desc }, idx) => (
          <motion.div
            key={number}
            variants={itemVariants}
            className="flex items-center"
          >
            {/* Step card */}
            <div className="flex flex-col items-center">
              {/* Number badge with icon */}
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white text-xl font-bold">
                  {number}
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-xl bg-blue-500 flex items-center justify-center">
                  <Icon className="text-white" size={16} />
                </div>
              </div>
              {/* Title & Description */}
              <h3 className="mt-4 text-lg font-semibold text-blue-900">{title}</h3>
              <p className="mt-2 text-sm text-neutral-600 max-w-xs">{desc}</p>
            </div>

            {/* Connector line */}
            {idx < steps.length - 1 && (
              <div className="flex-1 h-px bg-blue-900 mx-4" />
            )}
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
