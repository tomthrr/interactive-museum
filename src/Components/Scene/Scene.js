import Museum from "@/Components/Scene/Museum";
import {PerspectiveCamera} from "@react-three/drei";
import Lights from "@/Components/Scene/Lights";
import Painting from "@/Components/Scene/Painting";

export default function Scene() {

  return (
    <>
      <Painting />
      <Museum />
      <Lights />
      <PerspectiveCamera makeDefault position={[0, 2, 8]}/>
      <directionalLight position={[0, 0, 5]} color="red"/>
    </>
  )
}