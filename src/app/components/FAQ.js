"use client";
import React from "react";
import { Canvas } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { motion } from "framer-motion";

const FAQ = () => {
  const faqs = [
    {
      question: "What AI features does the mental health platform offer?",
      answer: "Our platform uses advanced AI to provide personalized emotional support, analyze mood patterns, and offer tailored coping strategies. The AI adapts to your unique needs over time, ensuring a more effective and personalized mental health journey."
    },
    {
      question: "How can I connect with others on the platform?",
      answer: "Our community feature allows you to join support groups, participate in moderated discussions, and even schedule one-on-one virtual meetups with peers. All interactions are monitored by our AI to ensure a safe and supportive environment."
    },
    {
      question: "Is the platform accessible 24/7?",
      answer: "Yes! Our AI-powered support is available round-the-clock, providing instant help whenever you need it. The community features are also accessible at any time, though live interactions depend on other users' availability."
    },
    {
      question: "How is my privacy protected?",
      answer: "We use state-of-the-art encryption and anonymization techniques to protect your data. Our AI is designed with privacy in mind, and all community interactions can be done anonymously if you prefer."
    },
    {
      question: "Can I track my progress over time?",
      answer: "Absolutely! Our AI generates detailed insights and progress reports, allowing you to visualize your mental health journey. You can set goals, track mood changes, and see how different strategies impact your well-being."
    }
  ];

  return (
    <section
      className="relative w-full px-6 py-24 overflow-hidden bg-gray-900"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Canvas>
          <Stars radius={300} depth={60} count={1000} factor={7} saturation={0} fade />
        </Canvas>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-white md:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-xl text-gray-300">
            Get answers to common questions about our AI-powered mental health platform
          </p>
        </motion.div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-8 grid max-w-3xl gap-6"
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg overflow-hidden"
            >
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between p-6 text-lg font-medium text-gray-100">
                  <span>{faq.question}</span>
                  <span className="transition group-open:rotate-180">
                    <svg fill="none" height="24" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24" width="24">
                      <path d="M6 9l6 6 6-6"></path>
                    </svg>
                  </span>
                </summary>
                <div className="px-6 pb-6 text-gray-300">
                  {faq.answer}
                </div>
              </details>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;