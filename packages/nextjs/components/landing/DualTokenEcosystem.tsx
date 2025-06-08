'use client';

import { CheckCircle } from 'lucide-react';
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

export default function DualTokenEcosystem() {
  const tokens = [
    {
      id: 'kasa',
      letter: 'K',
      title: 'Kasa Token',
      description:
        'Asset-backed tokens directly linked to property value, generating passive yield from rental income and property appreciation.',
      features: [
        'Backed by real estate assets',
        'Quarterly dividend distributions',
        'Appreciation tied to property value',
        'Tradeable on secondary markets',
      ],
    },
    {
      id: 'toka',
      letter: 'T',
      title: 'ToKa Token',
      description:
        'Utility token powering the ecosystem, used for rewards, payments, governance, and accessing premium features.',
      features: [
        'Governance voting rights',
        'Discounts on booking and transaction fees',
        'Access to premium features and experiences',
        'Staking rewards and loyalty benefits',
      ],
    },
  ];

  return (
    <section
      id="dual-token-ecosystem"
      className="
        bg-gradient-to-br from-[#0A1E3F] to-[#2B4E9C]
        text-white
        min-h-screen snap-start
        flex flex-col items-center justify-center
        py-20 px-4 sm:px-8 lg:px-16
      "
    >
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.3 }}
        variants={containerVariants}
        className="max-w-4xl text-center"
      >
        <motion.h2
          variants={cardVariants}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
        >
          Dual Token Ecosystem
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="text-base sm:text-lg text-white/80 mb-12"
        >
          Our innovative dual token system creates a sustainable economy for all participants
        </motion.p>

        <motion.div
          variants={containerVariants}
          className="w-full grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {tokens.map(({ id, letter, title, description, features }) => (
            <motion.div
              key={id}
              variants={cardVariants}
              whileHover={{ y: -5, boxShadow: '0 20px 30px rgba(0,0,0,0.3)' }}
              className="
                relative
                bg-white/10
                border border-white/20
                rounded-2xl
                p-8
                flex flex-col
                transition-shadow cursor-pointer
              "
            >
              {/* Letter badge */}
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-white text-lg font-bold">
                {letter}
              </div>

              <h3 className="mt-8 text-2xl font-semibold mb-4">{title}</h3>
              <p className="text-white/80 mb-6">{description}</p>
              <ul className="space-y-3">
                {features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2">
                    <CheckCircle className="text-white" size={16} />
                    <span className="text-white/90">{feat}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
