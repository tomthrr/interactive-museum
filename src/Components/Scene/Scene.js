import MuseumTest from "@/Components/Scene/MuseumTest";
import {PerspectiveCamera, Stage} from "@react-three/drei";
import Lights from "@/Components/Scene/Lights";
import Painting from "@/Components/Scene/Painting";
import {Model} from "@/Components/Scene/Museum";
import {Suspense} from "react";

export default function Scene() {

  return (
    <>
      <Stage preset="rembrandt" intensity={1}  environment="city">
      <Suspense fallback={null}>
          <Painting />
          <Model />
      </Suspense>
      {/*<MuseumTest />*/}
      <Lights />
      <PerspectiveCamera makeDefault position={[0, 2, 12]}/>
      <directionalLight position={[0, 0, 5]} color="red"/>
      </Stage>
    </>
  )
}