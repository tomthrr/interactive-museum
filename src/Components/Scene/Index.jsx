'use client';
import {Canvas} from "@react-three/fiber";
import Scene from "@/Components/Scene/Scene";
import {OrbitControls} from "@react-three/drei";

export default function Index() {


  return (
    <Canvas>
      <OrbitControls makeDefault />
      <Scene />
    </Canvas>
  )
}