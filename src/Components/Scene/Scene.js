import MuseumTest from "@/Components/Scene/MuseumTest";
import {Environment, OrbitControls, PerspectiveCamera, Scroll, ScrollControls, Stage} from "@react-three/drei";
import Lights from "@/Components/Scene/Lights";
import Painting from "@/Components/Scene/Painting";
import {Museum} from "@/Components/Scene/Museum";
import { useThree } from "@react-three/fiber";
import {useEffect, Suspense, useRef} from "react";
import * as THREE from "three";
import ReactDOM from "react-dom/client";


export default function Scene() {
  const { camera, controls } = useThree();
  const controlsRef = useRef();

  return (
    <>
      <Suspense fallback={null}>
          <ScrollControls pages={10} damping={0.2}>
            <Painting />
            <Museum controlsRef={controlsRef}/>
          </ScrollControls>
      </Suspense>

      <OrbitControls makeDefault enableZoom={false} ref={controlsRef}/>

      <Lights />
      <directionalLight position={[0, 0, 5]} color="red"/>
      <PerspectiveCamera makeDefault position={[-8.00, 2.75, 16.06]}/>

      <Environment
          background={false}
          preset={"studio"}
          backgroundBlurriness={0.02}
        />

      <axesHelper position={[0, 1, 0]} args={[5]} />
    </>
  )
}