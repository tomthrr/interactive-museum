import MuseumTest from "@/Components/Scene/MuseumTest";
import {PerspectiveCamera} from "@react-three/drei";
import Lights from "@/Components/Scene/Lights";
import Painting from "@/Components/Scene/Painting";
import {Museum} from "@/Components/Scene/Museum";

export default function Scene() {

  return (
    <>
      <Painting />
      <Museum />
      {/*<MuseumTest />*/}
      <Lights />
      <PerspectiveCamera makeDefault position={[0, 2, 12]}/>
      <directionalLight position={[0, 0, 5]} color="red"/>
    </>
  )
}