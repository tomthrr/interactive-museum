import MuseumTest from "@/Components/Scene/MuseumTest";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  ScrollControls,
  useScroll
} from "@react-three/drei";
import Lights from "@/Components/Scene/Lights";
import Painting from "@/Components/Scene/Painting";
import {Museum} from "@/Components/Scene/Museum";
import {useFrame, useThree} from "@react-three/fiber";
import {Suspense, useEffect, useRef, useState} from "react";
import gsap from 'gsap'

export default function Scene({start}) {
  const { camera, controls } = useThree();
  const controlsRef = useRef();

  return (
    <>
      <Suspense fallback={null}>
        <ScrollControls pages={10} damping={0.2}>
          <ScrollContent controlsRef={controlsRef}/>
        </ScrollControls>
      </Suspense>

      <OrbitControls makeDefault enableZoom={false} ref={controlsRef}/>

      <Lights/>
      <directionalLight position={[0, 0, 5]} color="red"/>
      <PerspectiveCamera makeDefault position={[-8.00, 2.75, 16.06]}/>

      <Environment
        background={false}
        preset={"studio"}
        backgroundBlurriness={0.02}
        />
    </>
  )
}

function ScrollContent({ controlsRef }) {
  const scroll = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  // Bouton pour réinitialiser le scroll
  const handleResetScroll = () => {
    scroll.el.scrollTo(0, 0);
  };

  useFrame(() => {
    const offset = scroll.offset; // Offset actuel du scroll
    const button = document.querySelector("#restart")

    if (offset > 0.2 && !isVisible) {
      setIsVisible(true);
      gsap.to(button, { opacity: 1, duration: 1, ease: "power2.out" });
    } else if (offset <= 0.2 && isVisible) {
      setIsVisible(false);
      gsap.to(button, { opacity: 0, duration: 1, ease: "power2.out" });
    }
  });

  useEffect(() => {
    const restartButton = document.getElementById("restart");

    if (restartButton) {
      restartButton.addEventListener("click", handleResetScroll);

      return () => {
        restartButton.removeEventListener("click", handleResetScroll);
      };
    }
  }, []);

  return (
    <>
      <Painting />
      <Museum controlsRef={controlsRef}/>
    </>
  );
}