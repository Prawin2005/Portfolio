import { useEffect, useRef } from "react";
import * as THREE from "three";

export const NeuralCore = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const isMobile = window.innerWidth < 768;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = isMobile ? 9 : 7;

    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    container.appendChild(renderer.domElement);

    // Group for all core structures
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // 1. Central Icosahedron Wireframe / Neural Lattice
    const geometry = new THREE.IcosahedronGeometry(2.2, 2);
    const wireframeGeo = new THREE.WireframeGeometry(geometry);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.35
    });
    const wireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    coreGroup.add(wireframe);

    // 2. Vertex Nodes (Points of the Neural Network)
    const pointsMat = new THREE.PointsMaterial({
      color: 0x67e8f9,
      size: 0.08,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });
    const points = new THREE.Points(geometry, pointsMat);
    coreGroup.add(points);

    // 3. Inner Glowing Tensor Core
    const innerGeo = new THREE.OctahedronGeometry(1.1, 1);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0x0891b2,
      emissive: 0x00f0ff,
      emissiveIntensity: 0.4,
      wireframe: true,
      transparent: true,
      opacity: 0.7
    });
    const innerCore = new THREE.Mesh(innerGeo, innerMat);
    coreGroup.add(innerCore);

    // 4. Orbital Data Rings
    const ringGeo = new THREE.RingGeometry(2.8, 2.85, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.3
    });
    const ring1 = new THREE.Mesh(ringGeo, ringMat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2 = new THREE.Mesh(ringGeo, ringMat.clone());
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    (ring2.material as THREE.MeshBasicMaterial).color.setHex(0x10b981);
    coreGroup.add(ring2);

    // 5. Floating Ambient Particle Field
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 12;
      positions[i + 1] = (Math.random() - 0.5) * 12;
      positions[i + 2] = (Math.random() - 0.5) * 8;
    }
    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const ambientPointsMat = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.04,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending
    });
    const ambientParticles = new THREE.Points(particleGeo, ambientPointsMat);
    scene.add(ambientParticles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x00f0ff, 2, 20);
    pointLight.position.set(3, 4, 5);
    scene.add(pointLight);

    const purpleLight = new THREE.PointLight(0x6366f1, 1.8, 20);
    purpleLight.position.set(-3, -3, 3);
    scene.add(purpleLight);

    // Mouse Tracking for subtle interactive reaction
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.targetX = (e.clientX / innerWidth - 0.5) * 2;
      mouse.targetY = -(e.clientY / innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // Scroll Tracking for Hero scroll transition
    let scrollY = window.scrollY;
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener("resize", handleResize);

    // Animation Loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Base idle rotation
      coreGroup.rotation.y = elapsed * 0.15 + mouse.x * 0.5;
      coreGroup.rotation.x = elapsed * 0.08 + mouse.y * 0.4;

      innerCore.rotation.y = -elapsed * 0.3;
      innerCore.rotation.z = elapsed * 0.2;

      ring1.rotation.z = elapsed * 0.1;
      ring2.rotation.z = -elapsed * 0.12;

      ambientParticles.rotation.y = elapsed * 0.02;

      // Subtle breathing pulse
      const pulse = 1 + Math.sin(elapsed * 2) * 0.03;
      innerCore.scale.set(pulse, pulse, pulse);

      // Scroll transition effect (scales and shifts seamlessly as user scrolls down)
      const scrollProgress = Math.min(scrollY / 800, 1.2);
      coreGroup.position.y = -scrollProgress * 1.5;
      coreGroup.position.z = scrollProgress * 1.8;
      wireframeMat.opacity = Math.max(0.35 - scrollProgress * 0.2, 0.1);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationId);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none w-full h-full opacity-90 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
};
