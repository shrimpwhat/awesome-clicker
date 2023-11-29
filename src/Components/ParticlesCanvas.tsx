import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useShallow } from "zustand/react/shallow";
import useStore from "../store";

const { randFloat } = THREE.MathUtils;

type ExplosionProps = {
  id: number;
  pos: THREE.Vector3;
  radius: number;
  moveSpeed: number;
  rotationMultiplier: number;
  count: number;
  color: THREE.Color;
  dummy?: THREE.Object3D;
};

const colors = ["#f7bd45", "#F02D3A", "#63C132", "#B118C8"].map(
  (color) => new THREE.Color(color)
);

const randColor = () => colors[Math.floor(Math.random() * colors.length)];

const Explosion = ({
  pos,
  radius,
  moveSpeed,
  rotationMultiplier,
  count,
  color,
  dummy = new THREE.Object3D(),
}: ExplosionProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; ++i) {
      temp.push({
        ...pos,
        speed: [randFloat(-1, 1), randFloat(-1, 1), randFloat(-1, 1)].map(
          (el) => el * moveSpeed
        ),
        rotation: { x: 0, y: 0, z: 0 },
      });
    }
    return temp;
  }, []);

  useFrame((_, delta) => {
    for (let i = 0; i < count; i++) {
      const particle = particles[i];
      particle.x += particle.speed[0];
      particle.y += particle.speed[1];
      particle.z += particle.speed[2];
      dummy.position.set(particle.x, particle.y, particle.z);

      const rotationAmount = Math.sin(delta) * rotationMultiplier;

      particle.rotation.x += rotationAmount;
      particle.rotation.y += rotationAmount;
      particle.rotation.z += rotationAmount;

      dummy.rotation.x = particle.rotation.x;
      dummy.rotation.y = particle.rotation.y;
      dummy.rotation.z = particle.rotation.z;

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[radius, 0]} />
      <meshStandardMaterial color={color} />
    </instancedMesh>
  );
};

const ParticlesCanvas = () => {
  const clicks = useStore(useShallow((state) => state.clicks));
  const [effects, setEffects] = useState<ExplosionProps[]>([]);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const counter = useRef(0);

  const getNewExplosion = (): ExplosionProps => ({
    id: counter.current++,
    moveSpeed: randFloat(0.3, 0.6),
    pos: new THREE.Vector3(
      randFloat(-10, 0),
      randFloat(-8, 8),
      randFloat(-5, 5)
    ),
    radius: randFloat(0.3, 1),
    rotationMultiplier: randFloat(0.5, 2),
    count: randFloat(20, 40),
    color: randColor(),
  });

  useEffect(() => {
    if (!isFirstRender) {
      setEffects((prev) => prev.concat([getNewExplosion()]));
      setTimeout(() => {
        setEffects((prev) => prev.slice(1));
      }, 2000);
    } else setIsFirstRender(false);
  }, [clicks]);

  return (
    <Canvas
      style={{ position: "absolute", inset: "0" }}
      camera={{ fov: 90, position: [10, 0, 0], near: 0.1, far: 100 }}
    >
      {/* <CameraControls /> */}
      {/* <axesHelper args={[1000]} /> */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 0]} intensity={10} />
      {effects.map((props) => (
        <Explosion key={props.id} {...props} />
      ))}
      <EffectComposer>
        <Bloom intensity={0.15} luminanceThreshold={0} mipmapBlur />
      </EffectComposer>
    </Canvas>
  );
};

export default ParticlesCanvas;
