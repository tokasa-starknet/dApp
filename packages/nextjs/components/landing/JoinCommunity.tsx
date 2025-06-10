'use client';

import { X, Send } from 'lucide-react';
import { SiDiscord } from 'react-icons/si';
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
    href: 'https://discord.gg/', // reemplaza con tu enlace real
    gradient: 'from-indigo-500 to-purple-600',
    Icon: SiDiscord,
  },
  {
    label: 'Follow on X',
    href: 'https://x.com/ToKasa_RWA',
    gradient: 'from-gray-800 to-black',
    Icon: X,
  },
  {
    label: 'Join Telegram',
    href: 'https://t.me/',
    gradient: 'from-teal-400 via-cyan-500 to-cyan-600',
    Icon: Send,
  },
];

export default function JoinCommunity() {
  return (
    <motion.section
      id="join-community"
      className="  bg-gradient-to-br from-[#0A1E3F] to-[#2B4E9C]  text-white snap-start min-h-screen  flex flex-col items-center justify-center  py-20 px-4 sm:px-8 lg:px-16 text-center  "
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
        className="text-base sm:text-lg text-white/80 max-w-2xl mb-12 leading-relaxed"
      >
        Connect with us and be part of the future of real estate investment.
        Join thousands of investors, property owners, and travelers.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        variants={sectionVariants}
        className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12 w-full max-w-md"
      >
        {ctas.map(({ label, href, gradient, Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`  inline-flex items-center justify-center  w-40 h-10  bg-gradient-to-r ${gradient}  text-white text-sm font-semibold  rounded-full  shadow-lg hover:shadow-2xl  focus:outline-none focus:ring-4 focus:ring-white/30  transition-all duration-200 `}
          >
            <Icon className="mr-2" size={18} />
            {label}
          </motion.a>
        ))}
      </motion.div>
    </motion.section>
  );
}
