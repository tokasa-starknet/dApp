'use client';

import Link from 'next/link';
import { SiDiscord } from 'react-icons/si';
import { Twitter, Instagram, Github, Send, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Footer() {
  const socials = [
    { label: 'Discord', href: 'https://discord.gg/your-server', icon: SiDiscord },
    { label: 'Twitter', href: 'https://twitter.com/your-handle', icon: Twitter },
    { label: 'Instagram', href: 'https://instagram.com/your-profile', icon: Instagram },
    { label: 'GitHub', href: 'https://github.com/your-repo', icon: Github },
    { label: 'Telegram', href: 'https://t.me/your-channel', icon: Send },
  ];

  return (
    <footer className="bg-gradient-to-tr from-blue-900 to-indigo-900 text-white py-16 px-6 md:px-12 lg:px-24">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">
        {/* Branding */}
        <div>
          <h3 className="text-2xl font-extrabold mb-4">ToKasa</h3>
          <p className="text-sm text-blue-300 leading-relaxed">
            Empowering global investors with fractional ownership of
            premium vacation properties via blockchain tokenization.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-3 text-sm text-blue-200">
            <li><Link href="/opportunities" className="hover:text-white">Explore Opportunities</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/roadmap" className="hover:text-white">Roadmap</Link></li>
            <li><Link href="/litepaper.pdf" className="hover:text-white" target="_blank" rel="noopener noreferrer">Litepaper ↗</Link></li>
          </ul>
        </div>

        {/* Community */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Community</h4>
          <ul className="space-y-3 text-sm text-blue-200">
            <li><a href="https://discord.gg/your-server" target="_blank" rel="noopener noreferrer" className="hover:text-white">Discord</a></li>
            <li><a href="https://twitter.com/your-handle" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a></li>
            <li><a href="https://t.me/your-channel" target="_blank" rel="noopener noreferrer" className="hover:text-white">Telegram</a></li>
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
                className="
                  w-full pl-10 pr-4 py-2
                  bg-blue-800 bg-opacity-30
                  placeholder-blue-300
                  text-white text-sm
                  rounded-full
                  focus:outline-none focus:ring-2 focus:ring-indigo-500
                  transition
                "
              />
            </div>
            <button
              type="submit"
              className="
                inline-flex items-center justify-center
                px-6 py-2
                bg-white bg-opacity-10
                text-white text-sm font-medium
                rounded-full
                hover:bg-opacity-20
                focus:outline-none focus:ring-2 focus:ring-white
                transition
              "
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
