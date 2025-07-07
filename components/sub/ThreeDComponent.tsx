import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture } from '@react-three/drei';
import { Suspense, useEffect, useState, useRef } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';

function Model() {
  const [fbx, setFbx] = useState<THREE.Group | null>(null);
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<THREE.Group>(null);
  const texture = useTexture('/programmer-3d/generate_a_young_20_y_0527122846_texture_fbx/texture.png');

  useEffect(() => {
    const loader = new FBXLoader();
    loader.load(
      '/programmer-3d/generate_a_young_20_y_0527122846_texture_fbx/programmer-3d.fbx',
      (object: THREE.Group) => {
        try {
          // Ensure geometry is valid
          object.traverse((child: THREE.Object3D) => {
            if (child instanceof THREE.Mesh) {
              const geometry = child.geometry;
              geometry.computeBoundingBox();
              geometry.computeBoundingSphere();
              
              // Apply texture and ensure UV coordinates exist
              if (geometry.attributes.uv) {
                child.material.map = texture;
                child.material.needsUpdate = true;
              }
              
              // Ensure position attribute is valid
              if (geometry.attributes.position) {
                const positions = geometry.attributes.position.array;
                for (let i = 0; i < positions.length; i++) {
                  if (isNaN(positions[i])) {
                    throw new Error('Invalid position data in geometry');
                  }
                }
              }
            }
          });
          
          // Center the model
          const box = new THREE.Box3().setFromObject(object);
          const center = box.getCenter(new THREE.Vector3());
          object.position.sub(center);
          
          setFbx(object);
        } catch (err) {
          console.error('Error processing model:', err);
          setError(err instanceof Error ? err.message : 'Unknown error loading model');
        }
      },
      // Progress callback
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      // Error callback
      (err) => {
        console.error('Error loading model:', err);
        setError('Failed to load 3D model');
      }
    );
  }, [texture]);

  // Add rotation animation
  useFrame((state, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 0.5;
    }
  });

  if (error) return null;
  if (!fbx) return null;
  
  return (
    <primitive 
      ref={modelRef} 
      object={fbx} 
      scale={0.015} 
      position={[0, 0, -1]}
      dispose={null}
    />
  );
}

export const ThreeDComponent = () => {
  return (
    <div className="h-full w-full">
      <Canvas
        camera={{
          position: [4, 2, 4],
          fov: 45
        }}
        shadows
      >
        <ambientLight intensity={1} />
        <directionalLight 
          position={[3, 3, 3]} 
          intensity={1}
          castShadow
        />
        <Suspense fallback={null}>
          <Model />
        </Suspense>
        <OrbitControls 
          enableZoom={true}
          maxDistance={10}
          minDistance={2}
        />
      </Canvas>
    </div>
  );
}
