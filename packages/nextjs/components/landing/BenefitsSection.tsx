'use client';

import { Building, Coins, Users, CheckCircle } from 'lucide-react';
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
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

export default function BenefitsSection() {
  return (
    <motion.section
      id="benefits"
      className="
        bg-white
        min-h-screen snap-start
        flex flex-col items-center justify-center
        py-16 px-4 sm:px-8 lg:px-16
        text-center
      "
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.h2
        variants={cardVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-4"
      >
        Benefits For Everyone
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={cardVariants}
        className="text-base sm:text-lg text-neutral-600 max-w-2xl mb-12"
      >
        ToKasa creates value for all participants in the ecosystem through innovative tokenomics
      </motion.p>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
      >
        {[
          {
            Icon: Building,
            title: 'Property Owners',
            items: [
              'Unlock liquidity without selling your property',
              'Simplified property management through automation',
              'Access to global investor network',
              'Increased property visibility and bookings',
            ],
          },
          {
            Icon: Coins,
            title: 'Investors',
            items: [
              'Passive income from rental yields',
              'Low barrier to entry for real estate investment',
              'Portfolio diversification with liquid assets',
              'Fractional access to premium properties',
            ],
          },
          {
            Icon: Users,
            title: 'Guests',
            items: [
              'Discounted stays at premium properties',
              'Earn rewards for loyalty and referrals',
              'Access to unique, curated experiences',
              'Exclusive member-only properties and perks',
            ],
          },
        ].map(({ Icon, title, items }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: '0 15px 25px rgba(0,0,0,0.05)' }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-start transition-shadow cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-neutral-100 flex items-center justify-center mb-4">
              <Icon className="text-neutral-500" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-4">{title}</h3>
            <ul className="space-y-3 text-sm text-neutral-600 pl-1">
              {items.map(text => (
                <li key={text} className="flex items-start gap-2">
                  <CheckCircle className="text-blue-500 mt-1" size={16} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
