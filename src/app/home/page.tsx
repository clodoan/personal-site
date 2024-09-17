"use client";

import { Block, Text, StyledLink } from "@/components";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { Mesh, ShaderMaterial } from "three";

const AuroraBorealis = () => {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      (meshRef.current.material as ShaderMaterial).uniforms.time.value += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[20, 20, 200, 200]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          resolution: { value: new THREE.Vector2() },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec2 resolution;
          varying vec2 vUv;
          
          vec3 hsv2rgb(vec3 c) {
            vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
            vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
            return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
          }
          
          void main() {
            vec2 uv = vUv;
            vec3 finalColor = vec3(0.0);
            
            for(float i = 0.0; i < 3.0; i++) {
              float t = time * (0.5 + i/5.0);
              uv.y += (0.15 * sin(uv.x * 2.0 + i/3.0 + t) + 0.3);
              float aurora = abs(0.15 / (uv.y - 0.5)) * 0.75;
              
              // Vary the hue based on position and time
              float hue = mod(uv.x * 0.1 + t * 0.05 + i * 0.2, 1.0);
              vec3 auroraColor = hsv2rgb(vec3(hue, 0.8, 1.0));
              
              finalColor += auroraColor * aurora;
            }
            
            // Add subtle stars
            if (length(fract(uv * 50.0) - 0.5) < 0.01) {
              finalColor += vec3(0.5);
            }
            
            gl_FragColor = vec4(finalColor, 1.0);
          }
        `}
      />
    </mesh>
  );
};

export const Home = () => {
  return (
    <>
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
        }}
      >
        <AuroraBorealis />
      </Canvas>
      <main className="flex flex-col gap-4 relative z-10">
        <Block>
          <Text variant="label-1">Claudio Angrigiani.</Text>
          <Text variant="body-1">
            Occaecat elit amet officia adipisicing anim Lorem veniam occaecat
            duis irure laboris deserunt tempor quis. Magna ullamco do fugiat
            velit. Irure voluptate velit in occaecat proident quis laborum anim
            aliquip ad. Labore et quis minim nostrud commodo dolor aliquip
            dolore cupidatat exercitation proident exercitation nulla culpa eu.
            Eiusmod est id magna quis. Labore excepteur laborum esse. Aliquip
            mollit cillum exercitation officia anim cillum dolor officia
            reprehenderit. Dolore labore id irure commodo veniam enim pariatur
            commodo ea ipsum sint..
          </Text>
          <StyledLink href="/about" variant="label-1">
            About
          </StyledLink>
        </Block>
      </main>
    </>
  );
};

export default Home;
