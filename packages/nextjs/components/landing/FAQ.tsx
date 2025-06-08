'use client';

import { Disclosure, Transition } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/20/solid';
import { useId } from 'react';
import { motion, Variants } from 'framer-motion';

type FAQ = { question: string; answer: string };

const faqs: FAQ[] = [
  {
    question: 'What is property tokenization and how does it work?',
    answer:
      'Property tokenization converts real estate into blockchain-backed tokens. Each token is a fractional share of a vacation property. Smart contracts automatically distribute rental income and enforce ownership rights.',
  },
  {
    question: 'How do I earn returns on my investment?',
    answer:
      'You earn via:\n• Rental yield, paid out quarterly.\n• Capital appreciation, realized by selling your tokens on our secondary marketplace.',
  },
  {
    question: "What's the minimum investment amount?",
    answer:
      'You can start with just $100 (or crypto equivalent) per property token, allowing you to diversify across multiple assets with minimal capital.',
  },
  {
    question: 'How is property management handled?',
    answer:
      'Professional managers handle maintenance, bookings, and guest support. Smart contracts automate fee collection and payouts—zero hassle for you.',
  },
  {
    question: 'Is my investment legally protected?',
    answer:
      'Yes. On-chain records lock in ownership and off-chain legal agreements ensure compliance with local real estate laws, all backed by top law firms.',
  },
  {
    question: 'How can I sell my tokens?',
    answer:
      'List tokens 24/7 on our integrated marketplace: set your price, confirm the sale, and proceeds hit your wallet instantly.',
  },
];

const containerVariants: Variants = {
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
    transition: { duration: 0.5 },
  },
};

export default function FAQSection() {
  const id = useId();

  return (
    <motion.section
      id="faq"
      className="snap-start min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50 py-20 px-4 sm:px-8 lg:px-16"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        variants={itemVariants}
        className="text-center text-4xl font-extrabold text-blue-900 mb-4"
      >
        Frequently Asked Questions
      </motion.h2>
      <motion.p
        variants={itemVariants}
        className="text-center text-neutral-600 max-w-2xl mx-auto mb-12"
      >
        Find answers to common questions about ToKasa and our tokenization platform.
      </motion.p>

      <div className="max-w-2xl mx-auto space-y-4">
        {faqs.map((faq, idx) => (
          <motion.div key={idx} variants={itemVariants}>
            <Disclosure>
              {({ open }) => (
                <div className="border border-neutral-200 rounded-2xl overflow-hidden shadow-sm">
                  <Disclosure.Button
                    className="w-full flex items-center justify-between px-6 py-4 bg-white hover:bg-neutral-50 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
                    aria-controls={`${id}-panel-${idx}`}
                    id={`${id}-button-${idx}`}
                  >
                    <span className="font-medium text-blue-900">{faq.question}</span>
                    <ChevronUpIcon
                      className={`w-5 h-5 text-neutral-400 transform transition-transform duration-200 ${
                        open ? 'rotate-180' : ''
                      }`}
                    />
                  </Disclosure.Button>

                  <Transition
                    show={open}
                    enter="transition ease-out duration-300"
                    enterFrom="opacity-0 -translate-y-2"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 -translate-y-2"
                  >
                    <Disclosure.Panel
                      as="div"
                      className="px-6 pb-6 bg-white text-neutral-700 whitespace-pre-wrap text-sm"
                      aria-labelledby={`${id}-button-${idx}`}
                      id={`${id}-panel-${idx}`}
                    >
                      {faq.answer}
                    </Disclosure.Panel>
                  </Transition>
                </div>
              )}
            </Disclosure>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}
