import MuseumTest from "@/Components/Scene/MuseumTest";
import {Environment, PerspectiveCamera, Stage} from "@react-three/drei";
import Lights from "@/Components/Scene/Lights";
import Painting from "@/Components/Scene/Painting";
import {Model} from "@/Components/Scene/Museum";
import {Suspense} from "react";

export default function Scene() {

  return (
    <>
        <Suspense fallback={null}>
            <Painting />
            <Model />
        </Suspense>
        <Lights />
        <directionalLight position={[0, 0, 5]} color="red"/>
        <PerspectiveCamera makeDefault position={[-8.00,
          2.75,
          16.06]}/>
        <Environment
          background={false}
          preset={"city"}
          backgroundBlurriness={0.02}
        />
      <axesHelper position={[0, 1, 0]} args={[5]} />
    </>
  )
}