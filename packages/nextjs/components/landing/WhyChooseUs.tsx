'use client';

import { Shield, Eye, Users } from 'lucide-react';
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

const reasons = [
  {
    icon: Shield,
    title: 'Security via Blockchain',
    text:
      'All transactions and ownership records are secured by immutable blockchain technology, ensuring maximum protection and trust.',
  },
  {
    icon: Eye,
    title: 'Full Transparency',
    text:
      'Real-time access to property performance, occupancy rates, and financial data for complete visibility and informed decisions.',
  },
  {
    icon: Users,
    title: 'Strong Community',
    text:
      'Join a global network of property owners, investors, and travelers united by shared interests and collaborative values.',
  },
];

export default function WhyChooseUs() {
  return (
    <motion.section
      id="why-choose-us"
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
        variants={cardVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-blue-900 mb-4"
      >
        Why Choose ToKasa
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={cardVariants}
        className="text-base sm:text-lg text-neutral-600 mb-12 max-w-2xl"
      >
        Built on the principles of security, transparency, and community-driven innovation
      </motion.p>

      {/* Cards */}
      <motion.div
        variants={containerVariants}
        className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-8"
      >
        {reasons.map(({ icon: Icon, title, text }) => (
          <motion.div
            key={title}
            variants={cardVariants}
            whileHover={{ y: -5, boxShadow: '0 15px 25px rgba(0,0,0,0.05)' }}
            className="
              bg-white rounded-2xl shadow-lg p-8
              flex flex-col items-center
              transition-shadow cursor-pointer
            "
          >
            <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-4">
              <Icon className="text-blue-900" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
            <p className="text-sm text-neutral-600">{text}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
