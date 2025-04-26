" use client"
import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "./loader";

type Location = {
  name: string;
  lat: number;
  lon: number;
};

const locations: Location[] = [
  { name: "Nigeria", lat: 9.0820, lon: 8.6753 },
  { name: "Lagos", lat: 6.5244, lon: 3.3792 },
  { name: "Ghana", lat: 7.9465, lon: -1.0232 },
  { name: "Kenya", lat: -1.2921, lon: 36.8219 },
];

import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";
import { latLongToVector3 } from "@/lib/utils";

const LocationMarker: React.FC<{ position: [number, number, number]; name: string }> = ({
  position,
  name,
}) => {
  const markerRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (markerRef.current) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 4) * 0.05;
      markerRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group ref={markerRef} position={position}>
      <Html center>
        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            padding: '6px 12px',
            borderRadius: '999px',
            background: 'rgba(30, 144, 255, 0.85)', 
            color: '#fff',
            fontSize: '12px',
            fontWeight: 'bold',
            border: '2px solid white',
            boxShadow: '0 0 6px rgba(0, 0, 0, 0.3)',
            transform: hovered ? 'scale(1.2)' : 'scale(1)',
            transition: 'transform 0.2s ease-in-out',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: '40px',
            minHeight: '40px',
            textAlign: 'center',
            pointerEvents: 'auto',
            whiteSpace: 'nowrap',
            zIndex: -200,
          }}
        >
          {name}
        </div>
      </Html>
    </group>
  );
};


const Earth: React.FC = () => {
  const { scene } = useGLTF("/planet/scene.gltf");

  return (
    <group>
      <primitive object={scene} scale={3.0} rotation-y={0} />

      {locations.map((loc, index) => (
        <LocationMarker key={index} position={latLongToVector3(loc.lat, loc.lon)} name={loc.name} />
      ))}
    </group>
  );
};

useGLTF.preload("/planet/scene.gltf");

const EarthCanvas = () => {
  return (
    <Canvas
      shadows
      frameloop="demand"
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
      camera={{
        fov: 45,
        near: 0.1,
        far: 200,
        position: [-4, 3, 6],
      }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          autoRotate
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Earth />
        <Preload all />
      </Suspense>
    </Canvas>
  );
};

export default EarthCanvas;
