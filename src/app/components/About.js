"use client";
import React, { useEffect, useRef } from 'react';
import { FaBrain, FaHeartbeat, FaShieldAlt, FaUserFriends } from 'react-icons/fa';
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const COLORS = ["#4A90E2", "#50C878", "#9370DB", "#20B2AA"];

const AnimatedSphere = () => {
  const meshRef = useRef();
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });
  return (
    <Sphere ref={meshRef} visible args={[1, 100, 200]} scale={2}>
      <MeshDistortMaterial
        color="#4A90E2"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0}
      />
    </Sphere>
  );
};

const FeatureItem = ({ icon: Icon, title, description }) => (
  <motion.div
    className="relative"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <dt>
      <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500/20 text-blue-300">
        <Icon className="h-6 w-6" />
      </div>
      <p className="font-heading ml-16 text-lg leading-6 font-bold text-gray-100">{title}</p>
    </dt>
    <dd className="mt-2 ml-16 text-base text-gray-400">{description}</dd>
  </motion.div>
);

const About = () => {
  const color = useMotionValue(COLORS[0]);

  useEffect(() => {
    const animateColors = async () => {
      while (true) {
        for (const c of COLORS) {
          await animate(color, c, { duration: 2 });
        }
      }
    };
    animateColors();
  }, []);

  const borderColor = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <section id = "aboutUs" className="relative overflow-hidden bg-gray-900 text-gray-100">
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-heading mb-4 bg-blue-500/20 text-blue-300 px-4 py-2 rounded-lg md:w-64 md:mx-auto text-xs font-semibold tracking-widest uppercase inline-block"
            >
              Why choose us?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-heading mt-2 text-3xl leading-8 font-semibold tracking-tight bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-transparent sm:text-4xl"
            >
              Empowering Mental Well-being Through AI
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 max-w-2xl text-lg text-gray-300 lg:mx-auto"
            >
              We combine cutting-edge AI technology with mental health expertise to provide personalized, accessible support for your emotional well-being.
            </motion.p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <FeatureItem
                icon={FaBrain}
                title="AI-Powered Insights"
                description="Our advanced AI analyzes your emotions and provides personalized strategies for mental wellness."
              />
              <FeatureItem
                icon={FaHeartbeat}
                title="24/7 Emotional Support"
                description="Access compassionate support anytime, anywhere, helping you navigate life's challenges with confidence."
              />
              <FeatureItem
                icon={FaShieldAlt}
                title="Privacy Focused"
                description="Your mental health data is encrypted and protected, ensuring your privacy and confidentiality at all times."
              />
              <FeatureItem
                icon={FaUserFriends}
                title="Community Connection"
                description="Join a supportive community of individuals on similar journeys, fostering growth and understanding."
              />
            </dl>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 -z-10">
        <Canvas>
          <ambientLight intensity={0.5} />
          <AnimatedSphere />
        </Canvas>
      </div>
    </section>
  );
};

export default About;