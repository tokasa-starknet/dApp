'use client';

import { User, Coins, Building, Gift, ChevronRight } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, ease: 'easeOut' },
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
  { icon: User, title: 'Register', desc: 'Create your account and complete KYC verification to join the platform securely.' },
  { icon: Coins, title: 'Tokenize', desc: 'List your property or browse available tokenized properties in our curated marketplace.' },
  { icon: Building, title: 'Invest', desc: 'Purchase property tokens and build your diversified real estate portfolio.' },
  { icon: Gift, title: 'Earn', desc: 'Receive regular rental income and benefit from potential property value appreciation.' },
];

export default function HowItWorks() {
  const [ref, inView] = useInView({ triggerOnce: false, threshold: 0.3 });

  return (
    <motion.section
      ref={ref}
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
      animate={inView ? 'show' : 'hidden'}
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
        Four simple steps to start your journey with ToKasa and begin earning from real estate.
      </motion.p>

      {/* Steps Grid */}
      <div className="relative w-full max-w-6xl">
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-start gap-8"
        >
          {steps.map(({ icon: Icon, title, desc }, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
              className="
                flex flex-col items-center
                bg-white rounded-2xl p-8
                transition-shadow cursor-pointer
              "
            >
              {/* Number Badge */}
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-700 to-blue-900 flex items-center justify-center text-white text-xl font-bold mb-4">
                {idx + 1}
              </div>

              {/* Icon */}
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-900 mb-4">
                <Icon size={20} />
              </div>

              {/* Title & Desc */}
              <h3 className="text-lg font-semibold text-blue-900 mb-2">{title}</h3>
              <p className="text-sm text-neutral-600">{desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Arrows between steps (solo en pantallas md+) */}
        <div className="hidden md:flex absolute inset-0 pointer-events-none">
          {Array(steps.length - 1)
            .fill(0)
            .map((_, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex-1 flex items-center justify-center"
                custom={idx}
              >
                <ChevronRight
                  size={32}
                  className="text-blue-300 animate-pulse"
                />
              </motion.div>
            ))}
        </div>
      </div>
    </motion.section>
  );
}
