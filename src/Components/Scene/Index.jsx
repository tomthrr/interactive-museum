'use client';
import {Canvas} from "@react-three/fiber";
import Scene from "@/Components/Scene/Scene";
import {Loader} from "@react-three/drei";

export default function Index() {

  return (
    <>
      <Canvas shadows dpr={[1, 2]} camera={{ fov: 80 }}>
        <Scene />
      </Canvas>
      <Loader/>
    </>
  )
}