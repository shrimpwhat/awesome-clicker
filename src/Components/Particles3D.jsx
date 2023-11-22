import * as THREE from "three";
import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";

const Spheres = () => {
  const meshRef = useRef();
  const { viewport } = useThree();
  const count = 100;
  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    let i = 0;
    const space = 2;
    for (let x = 0; x < 10; x++)
      for (let y = 0; y < 10; y++)
        for (let z = 0; z < 10; z++) {
          const id = i++;
          dummy.position.set(x, y * 2, z * 2);
          dummy.updateMatrix();
          meshRef.current.setMatrixAt(id, dummy.matrix);
        }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color="white" />
    </instancedMesh>
  );
};

const App = () => {
  return (
    <Canvas
      style={{ position: "absolute", inset: "0" }}
      camera={{ fov: 90, position: [1, 0, 0] }}
    >
      <CameraControls />
      <axesHelper args={[1000, 1000, 1000]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Spheres />
    </Canvas>
  );
};

export default App;
