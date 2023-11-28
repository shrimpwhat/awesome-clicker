import * as THREE from "three";
import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useShallow } from "zustand/react/shallow";
import useStore from "../store";

const randomValue = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

type ExplosionProps = {
  id: number;
  pos: THREE.Vector3;
  radius: number;
  moveSpeed: number;
  rotationMultiplier: number;
  dummy?: THREE.Object3D;
};

const Explosion = ({
  pos,
  radius,
  moveSpeed,
  rotationMultiplier,
  dummy = new THREE.Object3D(),
}: ExplosionProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null!);
  const count = 100;
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; ++i) {
      temp.push({
        ...pos,
        opacity: 1,
        speed: [randomValue(-1, 1), randomValue(-1, 1), randomValue(-1, 1)].map(
          (el) => el * moveSpeed
        ),
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

      const axis = Math.floor(Math.random() * 3);
      const rotationAmount = Math.sin(delta) * rotationMultiplier;
      if (axis === 0) {
        dummy.rotation.x += rotationAmount;
      } else if (axis === 1) {
        dummy.rotation.y += rotationAmount;
      } else {
        dummy.rotation.z += rotationAmount;
      }

      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[radius, 0]} />
      <meshStandardMaterial color="#ff00d4" transparent={true} />
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
    moveSpeed: 0.1, //randomValue(0.2, 0.5),
    pos: new THREE.Vector3(
      randomValue(-10, 0),
      randomValue(-8, 8),
      randomValue(-5, 5)
    ),
    radius: randomValue(0.3, 0.7),
    rotationMultiplier: randomValue(-0.1, 0.1),
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
      <directionalLight position={[20, 20, 20]} intensity={10} />
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
