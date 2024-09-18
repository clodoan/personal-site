"use client";

import { Block, Text, StyledLink } from "@/components";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { Mesh, ShaderMaterial, Vector2 } from "three";

const SkyBackground = () => {
  const meshRef = useRef<Mesh>(null);
  const [resolution, setResolution] = useState(new Vector2(1, 1));

  useEffect(() => {
    const handleResize = () => {
      setResolution(new Vector2(window.innerWidth, window.innerHeight));
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      const material = meshRef.current.material as ShaderMaterial;
      material.uniforms.time.value += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        uniforms={{
          time: { value: 0 },
          resolution: { value: resolution },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float time;
          uniform vec2 resolution;
          varying vec2 vUv;

          void main() {
            vec2 uv = gl_FragCoord.xy / resolution.xy;
            
            // More noticeable sunset orange
            vec3 skyBlue = vec3(0.843, 0.922, 0.961);  // Lighter blue
            vec3 sunsetOrange = vec3(0.980, 0.882, 0.884);  // Lighter, closer to skyBlue
            
            // Moving wave effect for the orange color
            float wave = sin(uv.y + time * 0.4) * cos(uv.y * time * 0.8) * 0.1;
            float orangePosition = smoothstep(0.0, 0.6, uv.y + wave + sin(time * 0.2) * 0.1);
            vec3 skyColor = mix(sunsetOrange, skyBlue, orangePosition);
            
            // Subtle movement
            float movement = sin(uv.y * 10.0 + time * 0.05) * 0.05;
            skyColor = mix(skyColor, vec3(1.0), movement);
            
            gl_FragColor = vec4(skyColor, 1.0);
          }
        `}
      />
    </mesh>
  );
};

const Home = () => {
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
        <SkyBackground />
      </Canvas>
      <main className="flex flex-col gap-4 relative z-10">
        <Block>
          <Text variant="label-1" className="text-purple-100">
            Claudio Angrigiani.
          </Text>
          <Text variant="body-1" className="text-blue-100">
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
