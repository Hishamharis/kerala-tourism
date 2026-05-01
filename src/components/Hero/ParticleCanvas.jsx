import { useEffect, useRef, useMemo } from 'react';
import * as THREE from 'three';

export default function ParticleCanvas() {
  const canvasRef = useRef(null);

  const isMobile = useMemo(() => typeof window !== 'undefined' && window.innerWidth < 768, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 50;

    const count = isMobile ? 80 : 200;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    const velocities = [];

    const goldColor = new THREE.Color('#F4A228');
    const starColor = new THREE.Color('#ffffff');

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;

      const isFirefly = Math.random() > 0.4;
      const color = isFirefly ? goldColor : starColor;
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.5;

      velocities.push({
        vx: (Math.random() - 0.5) * 0.02,
        vy: Math.random() * 0.03 + 0.01,
        vz: (Math.random() - 0.5) * 0.01,
        phase: Math.random() * Math.PI * 2,
      });
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 1.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let rafId;
    const animate = (time) => {
      rafId = requestAnimationFrame(animate);
      const t = time * 0.001;

      const posArr = geometry.attributes.position.array;
      for (let i = 0; i < count; i++) {
        const v = velocities[i];
        posArr[i * 3] += v.vx + Math.sin(t + v.phase) * 0.005;
        posArr[i * 3 + 1] += v.vy;
        posArr[i * 3 + 2] += v.vz;

        // Reset if particle goes off top
        if (posArr[i * 3 + 1] > 45) {
          posArr[i * 3 + 1] = -45;
          posArr[i * 3] = (Math.random() - 0.5) * 100;
        }
      }
      geometry.attributes.position.needsUpdate = true;

      material.opacity = 0.5 + Math.sin(t * 0.5) * 0.15;

      renderer.render(scene, camera);
    };
    animate(0);

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, [isMobile]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 2,
        pointerEvents: 'none',
      }}
    />
  );
}
