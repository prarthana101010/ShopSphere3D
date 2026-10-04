import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls, Environment, ContactShadows } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Abstract 3D elements for the hero section
const AbstractShape = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} position={[2, 0, 0]} scale={1.5}>
        <torusKnotGeometry args={[1, 0.3, 128, 16]} />
        <meshPhysicalMaterial 
          color="#3b82f6" 
          metalness={0.8}
          roughness={0.2}
          clearcoat={1}
          clearcoatRoughness={0.2}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
};

const SphereShape = () => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh position={[-2, 1, -1]} scale={1.2}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial 
          color="#8b5cf6" 
          metalness={0.9}
          roughness={0.1}
          transmission={0.5}
          thickness={0.5}
          envMapIntensity={2}
        />
      </mesh>
    </Float>
  );
};

const BoxShape = () => {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x -= delta * 0.1;
    meshRef.current.rotation.y += delta * 0.4;
  });

  return (
    <Float speed={3} rotationIntensity={1.5} floatIntensity={1}>
      <mesh ref={meshRef} position={[-1, -1.5, 1]} scale={0.8}>
        <boxGeometry args={[1, 1, 1]} />
        <meshPhysicalMaterial 
          color="#10b981" 
          metalness={0.5}
          roughness={0.4}
          clearcoat={0.5}
        />
      </mesh>
    </Float>
  );
};

const Hero = () => {
  return (
    <div className="relative h-[90vh] flex items-center overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-darker">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10 flex flex-col md:flex-row items-center h-full">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 pt-20 md:pt-0 z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6">
              SHOP THE <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">FUTURE</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-lg">
              Discover products in a new dimension. Experience premium shopping with interactive 3D visualizations and seamless design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="bg-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-full transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] hover:scale-105">
                Shop Now
              </Link>
              <Link to="/products" className="glass hover:bg-white/10 text-white font-medium py-3 px-8 rounded-full transition-all hover:scale-105">
                Explore Categories
              </Link>
            </div>
          </motion.div>
        </div>

        {/* 3D Canvas */}
        <div className="w-full md:w-1/2 h-[50vh] md:h-full absolute md:relative bottom-0 right-0 z-10 opacity-50 md:opacity-100">
          <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <PresentationControls 
              global 
              config={{ mass: 2, tension: 500 }} 
              snap={{ mass: 4, tension: 1500 }} 
              rotation={[0, 0.3, 0]} 
              polar={[-Math.PI / 3, Math.PI / 3]} 
              azimuth={[-Math.PI / 1.4, Math.PI / 2]}
            >
              <AbstractShape />
              <SphereShape />
              <BoxShape />
            </PresentationControls>
            <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
            <Environment preset="city" />
          </Canvas>
        </div>
      </div>
    </div>
  );
};

export default Hero;
