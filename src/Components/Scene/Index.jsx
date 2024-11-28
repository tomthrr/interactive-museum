'use client';
import {Canvas} from "@react-three/fiber";
import Scene from "@/Components/Scene/Scene";
import {OrbitControls} from "@react-three/drei";

export default function Index() {


  return (
    <Canvas shadows dpr={[1, 2]} camera={{ fov: 50 }}>
      <OrbitControls makeDefault />
      <Scene />
    </Canvas>
  )
}