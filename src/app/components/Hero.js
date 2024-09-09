"use client";
import React, { useEffect, useRef } from "react";
import { FiArrowRight } from "react-icons/fi";
import {
  useMotionTemplate,
  useMotionValue,
  motion,
  animate,
} from "framer-motion";
import Link from 'next/link';
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from 'three';

const COLORS_TOP = ["#4A90E2", "#50C878", "#9370DB", "#20B2AA"];

const FuturisticHeart = () => {
  const heartRef = useRef();
  const ecgRef = useRef();

  useFrame((state) => {
    if (heartRef.current) {
      heartRef.current.rotation.y += 0.01;
    }
    if (ecgRef.current) {
      ecgRef.current.material.uniforms.time.value += 0.1;
    }
  });

  useEffect(() => {
    if (heartRef.current) {
      const heartShape = new THREE.Shape();
      heartShape.moveTo(25, 25);
      heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0);
      heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35);
      heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95);
      heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35);
      heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0);
      heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25);

      const extrudeSettings = {
        depth: 8,
        bevelEnabled: true,
        bevelSegments: 2,
        steps: 2,
        bevelSize: 1,
        bevelThickness: 1
      };

      const geometry = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
      const material = new THREE.MeshPhongMaterial({ color: 0xff0000, wireframe: true });
      heartRef.current.geometry = geometry;
      heartRef.current.material = material;
    }
  }, []);

  const ECGLine = () => {
    const ecgMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color(0x00ff00) },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.y += sin(pos.x * 10.0 + time) * 2.0;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    return (
      <line ref={ecgRef}>
        <bufferGeometry attach="geometry">
          <bufferAttribute
            attachObject={['attributes', 'position']}
            count={100}
            array={new Float32Array(300)}
            itemSize={3}
          />
        </bufferGeometry>
        <primitive object={ecgMaterial} attach="material" />
      </line>
    );
  };

  return (
    <>
      <mesh ref={heartRef} position={[0, 0, -10]} scale={[0.1, 0.1, 0.1]}>
        <meshPhongMaterial color={0xff0000} wireframe />
      </mesh>
      <ECGLine />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
    </>
  );
};

export const Hero = () => {
  const color = useMotionValue(COLORS_TOP[0]);

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const border = useMotionTemplate`1px solid ${color}`;
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`;

  return (
    <motion.section
      className="relative grid min-h-screen place-content-center overflow-hidden bg-gray-900 px-4 py-24 text-gray-100"
    >
      <div className="relative z-10 flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full bg-blue-500/20 px-3 py-1.5 text-sm text-blue-300">
          AI-Powered Mental Health Support
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-blue-400 to-purple-400 bg-clip-text text-center text-3xl font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Your Futuristic Companion for Mental Well-being
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed text-gray-300">
          Experience the next generation of mental health support. Our AI-driven platform offers personalized care and real-time emotional analysis.
        </p>
        <Link href="/Signup">
          <motion.button
            style={{
              border,
              boxShadow,
            }}
            whileHover={{
              scale: 1.015,
            }}
            whileTap={{
              scale: 0.985,
            }}
            className="group relative flex w-fit items-center gap-1.5 rounded-full bg-blue-500/20 px-4 py-2 text-blue-300 transition-colors hover:bg-blue-500/30"
          >
            Start Now
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </motion.button>
        </Link>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas>
          <FuturisticHeart />
        </Canvas>
      </div>
    </motion.section>
  );
};

export default Hero;