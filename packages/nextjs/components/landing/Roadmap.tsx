'use client';

import { motion, Variants } from 'framer-motion';
import { Layers, CreditCard, ShoppingCart, Gift, Users } from 'lucide-react';

interface Milestone {
  label: string;
  title: string;
  description: string;
  Icon: React.ComponentType<{ size?: number; className?: string }>;
}

const milestones: Milestone[] = [
  {
    label: 'Phase 1',
    title: 'Property Tokenization Live',
    description:
      'Owners can tokenize their vacation properties into Kasa tokens, enabling fractional ownership and automated rental-income distribution.',
    Icon: Layers,
  },
  {
    label: 'Phase 2',
    title: 'ToKa Utility Token Launch',
    description:
      'Introduction of ToKa for payments, discounts, rewards, and staking—powering the ecosystem economy.',
    Icon: CreditCard,
  },
  {
    label: 'Phase 3',
    title: 'Marketplace Go-Live',
    description:
      'Our 24/7 integrated marketplace launches, letting you buy, sell, and trade tokenized real estate assets instantly.',
    Icon: ShoppingCart,
  },
  {
    label: 'Phase 4',
    title: 'Staking & Rewards Program',
    description:
      'Stake ToKa to earn loyalty benefits and community incentives; first 400K tokens unlocked for growth campaigns.',
    Icon: Gift,
  },
  {
    label: 'Phase 5',
    title: 'DAO Governance',
    description:
      'On-chain DAO goes live—ToKa holders vote on platform upgrades, new property listings, and revenue policies.',
    Icon: Users,
  },
];

const sectionVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15, ease: 'easeOut' },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Roadmap() {
  return (
    <motion.section
      id="roadmap"
      className="bg-gradient-to-br from-white via-gray-50 to-blue-50 snap-start min-h-screen flex flex-col items-center py-20 px-6 sm:px-8 lg:px-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={sectionVariants}
    >
      {/* Heading */}
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-4"
      >
        Roadmap
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg text-neutral-600 mb-12 text-center max-w-2xl"
      >
        Our phased rollout to democratize vacation-rental investing with on-chain tokens.
      </motion.p>

      {/* Milestones Grid */}
      <motion.div
        variants={sectionVariants}
        className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12"
      >
        {milestones.map(({ label, title, description, Icon }) => (
          <motion.div
            key={label}
            variants={itemVariants}
            whileHover={{ scale: 1.02, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
            className="bg-white rounded-2xl shadow-lg p-8 flex flex-col transition-transform cursor-pointer"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                <Icon className="text-blue-900" size={20} />
              </div>
              <span className="text-sm font-semibold text-blue-700">{label}</span>
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
            <p className="text-sm text-neutral-600">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
