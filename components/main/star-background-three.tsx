"use client";

import { Points, PointMaterial } from "@react-three/drei";
import { Canvas, type PointsProps, useFrame } from "@react-three/fiber";
import * as random from "maath/random";
import { useRef, useMemo, Suspense } from "react";
import type { Points as PointsType } from "three";

const StarBackground = (props: PointsProps) => {
  const ref = useRef<PointsType | null>(null);
  
  // Memoize sphere generation to prevent recalculation
  const sphere = useMemo(() => {
    try {
      // Reduced particle count for better performance
      const positions = random.inSphere(new Float32Array(3000), { radius: 1.2 }) as Float32Array;
      return positions;
    } catch (error) {
      console.error('Error generating sphere:', error);
      return new Float32Array(3000);
    }
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      // Optimized rotation speed
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled
        {...props}
      >
        <PointMaterial
          transparent
          color="#fff"
          size={0.002}
          sizeAttenuation
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const ThreeComponents = () => {
  return (
    <Canvas
      camera={{ position: [0, 0, 1] }}
      style={{ height: '100vh' }}
      performance={{ min: 0.5 }}
    >
      <Suspense fallback={null}>
        <StarBackground />
      </Suspense>
    </Canvas>
  );
}; 