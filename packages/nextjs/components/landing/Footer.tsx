'use client';

import Link from 'next/link';
import { SiDiscord } from 'react-icons/si';
import { X, Send, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const socials = [
    { label: 'Discord', href: 'https://discord.gg/', icon: SiDiscord },
    { label: 'X', href: 'https://x.com/ToKasa_RWA', icon: X },
    { label: 'Telegram', href: 'https://t.me/', icon: Send },
  ];

  return (
    <footer className="bg-gradient-to-tr from-blue-900 to-indigo-900 text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Branding */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4">ToKasa</h3>
          <p className="text-sm text-blue-300 leading-relaxed">
            Democratizing vacation-rental investment with blockchain-backed fractional ownership and rewards.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-blue-200">
            <li>
              <Link href="/opportunities" className="hover:text-white">
                Explore Opportunities
              </Link>
            </li>
            <li>
              <Link href="#faq" className="hover:text-white">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="#roadmap" className="hover:text-white">
                Roadmap
              </Link>
            </li>
            <li>
              <a
                href="/litepaper.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Litepaper ↗
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
          <ul className="space-y-3 text-sm text-blue-200">
            <li className="flex items-center gap-2">
              <Mail size={16} className="text-blue-400" />
              <a href="mailto:support@tokasa.com" className="hover:text-white">
                support@tokasa.com
              </a>
            </li>
            <li className="flex items-center gap-2">
              <SiDiscord size={16} className="text-blue-400" />
              <a
                href="https://discord.gg/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Discord
              </a>
            </li>
            <li className="flex items-center gap-2">
              <X size={16} className="text-blue-400" />
              <a
                href="https://x.com/ToKasa_RWA"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                X
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Send size={16} className="text-blue-400" />
              <a
                href="https://t.me/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white"
              >
                Telegram
              </a>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Stay Updated</h4>
          <form className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative flex-1 w-full">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300" size={20} />
              <input
                type="email"
                placeholder="Your email"
                className=" w-full pl-10 pr-4 py-2 bg-blue-800 bg-opacity-30 placeholder-blue-300 text-white text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition "
              />
            </div>
            <button
              type="submit"
              className="  inline-flex items-center justify-center  px-6 py-2  bg-white bg-opacity-10  text-white text-sm font-medium  rounded-full  hover:bg-opacity-20  focus:outline-none focus:ring-2 focus:ring-white  transition  "
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Divider & Bottom */}
      <div className="mt-16 border-t border-blue-800 pt-8 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-blue-400">&copy; {new Date().getFullYear()} ToKasa. All rights reserved.</p>
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          {socials.map(({ label, href, icon: Icon }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.2 }}
              className="text-blue-300 hover:text-white transition"
              aria-label={label}
            >
              <Icon size={24} />
            </motion.a>
          ))}
        </div>
      </div>
    </footer>
  );
}
