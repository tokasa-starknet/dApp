'use client';

import { SiDiscord } from 'react-icons/si';
import { Twitter, Send } from 'lucide-react';
import { motion, Variants } from 'framer-motion';

const sectionVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      ease: 'easeOut',
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 },
  },
};

const ctas = [
  {
    label: 'Join Discord',
    href: 'https://discord.gg/tu-servidor',
    gradient: 'from-indigo-500 via-purple-500 to-pink-500',
    Icon: SiDiscord,
  },
  {
    label: 'Follow on Twitter',
    href: 'https://twitter.com/tu-handle',
    gradient: 'from-blue-400 via-blue-500 to-blue-700',
    Icon: Twitter,
  },
  {
    label: 'Join Telegram',
    href: 'https://t.me/tu-canal',
    gradient: 'from-teal-400 via-cyan-500 to-cyan-600',
    Icon: Send,
  },
];

export default function JoinCommunity() {
  return (
    <motion.section
      id="join-community"
      className="
        bg-gradient-to-br from-[#0A1E3F] to-[#2B4E9C]
        text-white snap-start min-h-screen
        flex flex-col items-center justify-center
        py-20 px-4 sm:px-8 lg:px-16 text-center
      "
      variants={sectionVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
    >
      {/* Heading */}
      <motion.h2
        variants={itemVariants}
        className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4"
      >
        Join the Community
      </motion.h2>

      {/* Subheading */}
      <motion.p
        variants={itemVariants}
        className="text-base sm:text-lg text-white/80 max-w-2xl mb-12"
      >
        Connect with us and be part of the future of real estate investment.
        Join thousands of investors, property owners, and travelers.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={sectionVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 w-full max-w-lg"
      >
        {ctas.map(({ label, href, gradient, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
            whileTap={{ scale: 0.95 }}
            className={`
              inline-flex items-center justify-center
              w-44 h-12
              bg-gradient-to-r ${gradient}
              text-white text-sm font-medium
              rounded-full
              shadow-md
              hover:shadow-xl
              focus:outline-none focus:ring-4 focus:ring-white/30
              transition-all
            `}
          >
            <Icon className="mr-2" size={18} />
            {label}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}
