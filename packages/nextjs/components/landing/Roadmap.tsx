'use client';

import { motion, Variants } from 'framer-motion';
import { Shield, Eye, Users } from 'lucide-react';

interface Milestone {
  quarter: string;
  title: string;
  description: string;
  side: 'left' | 'right';
}

const milestones: Milestone[] = [
  { quarter: 'Q1 2024', title: 'Platform Launch', description: 'Initial release of the ToKasa platform with core tokenization features and marketplace.', side: 'left' },
  { quarter: 'Q2 2024', title: 'Property Marketplace', description: 'Launch of the comprehensive property marketplace for buying and selling tokenized real estate.', side: 'right' },
  { quarter: 'Q3 2024', title: 'Mobile App Release', description: 'Native mobile applications for iOS and Android with enhanced user experience and features.', side: 'left' },
  { quarter: 'Q4 2024', title: 'Global Expansion', description: 'Expansion to new markets across Europe, Asia, and the Caribbean with local partnerships.', side: 'right' },
  { quarter: 'Q1 2025', title: 'DAO Governance', description: 'Implementation of decentralized autonomous organization for community-driven governance.', side: 'left' },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.2,
      ease: 'easeOut',
    },
  },
};

const headerItem: Variants = {
  hidden: { opacity: 0, y: -20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function Roadmap() {
  return (
    <motion.section
      id="roadmap"
      className="bg-gradient-to-br from-white via-gray-50 to-blue-50 snap-start min-h-screen flex flex-col items-center py-20 px-4 sm:px-8 lg:px-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      {/* Heading */}
      <motion.h2
        variants={headerItem}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-2"
      >
        Roadmap
      </motion.h2>
      <motion.p
        variants={headerItem}
        className="text-base sm:text-lg text-neutral-600 mb-12 text-center max-w-2xl"
      >
        Our journey to revolutionize real estate investment through blockchain innovation
      </motion.p>

      {/* Timeline */}
      <div className="relative w-full max-w-5xl">
        {/* Vertical Line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-blue-900/20 -translate-x-1/2" />

        {/* Milestones */}
        <div className="space-y-16">
          {milestones.map((m, idx) => {
            const isLeft = m.side === 'left';
            return (
              <motion.div
                key={m.quarter}
                initial={{ opacity: 0, x: isLeft ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative flex items-center"
              >
                {/* Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-900 rounded-full" />

                {/* Content */}
                <div
                  className={`
                    w-full md:w-1/2
                    ${isLeft ? 'md:pr-8 text-right md:text-left md:order-1' : 'md:pl-8 text-left md:order-3'}
                  `}
                >
                  <div className="inline-block bg-white rounded-lg shadow-lg p-6">
                    <span className="px-3 py-1 bg-blue-100 text-blue-900 text-xs rounded-full mb-2 inline-block">
                      {m.quarter}
                    </span>
                    <h3 className="text-xl font-semibold text-blue-900 mb-1">{m.title}</h3>
                    <p className="text-sm text-neutral-600">{m.description}</p>
                  </div>
                </div>

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2 md:order-2" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
