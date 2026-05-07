import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Text, PerspectiveCamera, Environment } from '@react-three/drei';
import * as THREE from 'three';

import { useTheme } from '../../context/ThemeContext';

export const FloatingItem = ({ color, position, speed = 1, rotation = [0, 0, 0] }: any) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { theme } = useTheme();

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += 0.01 * speed;
    meshRef.current.rotation.x += 0.005 * speed;
  });

  return (
    <Float speed={2 * speed} rotationIntensity={1} floatIntensity={2}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[1, 1, 1]} />
        <MeshDistortMaterial
          color={hovered ? theme.colors.primary : color}
          speed={3}
          distort={0.4}
          radius={1}
        />
      </mesh>
    </Float>
  );
};

export const FuturisticCity = () => {
  const { theme } = useTheme();
  
  return (
    <group>
      {Array.from({ length: 40 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 50, 
            Math.random() * 5, 
            (Math.random() - 0.5) * 50
          ]}
        >
          <boxGeometry args={[Math.random() * 2 + 1, Math.random() * 10 + 2, Math.random() * 2 + 1]} />
          <meshStandardMaterial 
            color={Math.random() > 0.8 ? theme.colors.secondary : theme.colors.background} 
            emissive={Math.random() > 0.8 ? theme.colors.primary : '#000000'}
            emissiveIntensity={2}
          />
        </mesh>
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={theme.colors.background} />
      </mesh>
      <gridHelper args={[100, 50, theme.colors.primary, theme.colors.border]} position={[0, -0.49, 0]} />
    </group>
  );
};

export const DeliveryTracker = () => {
  const bikeRef = useRef<THREE.Group>(null);
  const clock = useRef(new THREE.Clock());
  const { theme } = useTheme();
  
  useFrame(() => {
    if (!bikeRef.current) return;
    const t = clock.current.getElapsedTime();
    bikeRef.current.position.z = Math.sin(t * 0.5) * 15;
    bikeRef.current.position.x = Math.cos(t * 0.5) * 15;
    bikeRef.current.rotation.y = -t * 0.5 + Math.PI / 2;
  });

  return (
    <group ref={bikeRef}>
      {/* Representing a bike with futuristic shapes */}
      <mesh>
        <boxGeometry args={[0.5, 1, 1.5]} />
        <meshStandardMaterial color={theme.colors.primary} emissive={theme.colors.primary} emissiveIntensity={0.5} />
      </mesh>
      <mesh position={[0, -0.4, -0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color={theme.id === 'light' ? '#333' : '#111'} />
      </mesh>
      <mesh position={[0, -0.4, 0.5]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
        <meshStandardMaterial color={theme.id === 'light' ? '#333' : '#111'} />
      </mesh>
      {/* Light trail */}
      <mesh position={[0, -0.2, -1.5]}>
        <boxGeometry args={[0.1, 0.1, 2]} />
        <meshStandardMaterial color={theme.colors.secondary} emissive={theme.colors.secondary} transparent opacity={0.6} />
      </mesh>
    </group>
  );
};
