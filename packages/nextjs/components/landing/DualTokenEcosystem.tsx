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
        'Property–backed asset tokens that generate passive yield via quarterly rental income and long-term appreciation.',
      features: [
        '100% backed by real estate assets',
        'Quarterly dividend distributions',
        'Value tied directly to property performance',
        'Tradable on 24/7 secondary markets',
      ],
    },
    {
      id: 'toka',
      letter: 'T',
      title: 'ToKa Token',
      description:
        'Utility token for payments, staking, governance and exclusive guest perks, driving platform adoption and community rewards.',
      features: [
        'Governance voting rights',
        'Discounts on booking & transaction fees',
        'Access to premium features & experiences',
        'Staking rewards and loyalty bonuses',
      ],
    },
  ];

  return (
    <section
      id="dual-token-ecosystem"
      className="
    bg-gradient-to-br from-[#0A1E3F] to-[#2B4E9C]
    text-white
    min-h-screen
    snap-start
    flex flex-col items-center justify-center
    py-20
    px-4 sm:px-8 lg:px-16
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
          Dual-Token Ecosystem
        </motion.h2>
        <motion.p
          variants={cardVariants}
          className="text-base sm:text-lg text-white/80 mb-12"
        >
          Kasa delivers property-backed yields, while ToKa powers payments, staking and guest rewards—together creating liquidity,
          governance & benefits for every participant.
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
              className="  relative  bg-white/10  border border-white/20  rounded-2xl  p-8  flex flex-col  transition-shadow cursor-pointer  "
            >
              {/* Letter badge */}
              <div className="absolute -top-6 left-8 w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center text-blue-900 text-lg font-bold">
                {letter}
              </div>

              {/* Title & Description */}
              <h3 className="mt-8 text-2xl font-semibold text-white mb-4">{title}</h3>
              <p className="text-white/80 mb-6">{description}</p>

              {/* Features */}
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
