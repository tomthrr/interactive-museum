import * as THREE from 'three';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {Suspense, useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {Html, PerspectiveCamera, Scroll, useHelper} from "@react-three/drei";
import styles from "@/app/page.module.scss";
import {useControls} from "leva";
import {paintingsInfos} from "@/data/paintings-infos";
import CartelModal from "@/Components/Modals/CartelModal/CartelModal";

function Cartel({ painting }) {
  const texture = useLoader(THREE.TextureLoader, '/pictures_monet/' + painting.cartel.cartelPath);

  const nameContainer = `.modal-container-${painting.id}`

  const openModal = () => {
    const container = document.querySelector(nameContainer);
    if (container) {
      gsap.to(container, {
        opacity: 1,
        display: "flex",
        duration: 1,
        ease: "power2.out"
      });
    }
  }

  return (
    <>
      <mesh
        position={[painting.cartel.positionCartel[0], painting.cartel.positionCartel[1], painting.cartel.positionCartel[2]]}
        rotation={[painting.cartel.rotationCartel[0], painting.cartel.rotationCartel[1], painting.cartel.rotationCartel[2]]}
        onClick={(e) => openModal()}
      >
        <planeGeometry attach="geometry" args={[1 / 5, 1 / 5]}/>
        <meshBasicMaterial attach="material" map={texture} toneMapped={false} side={THREE.DoubleSide}/>
      </mesh>
    </>
  )
}

function Image({painting}) {
  const texture = useLoader(THREE.TextureLoader, '/pictures_monet/' + painting.name);

  return (
    <mesh
      position={[painting.position[0], painting.position[1], painting.position[2]]}
      rotation={[painting.rotation[0], painting.rotation[1], painting.rotation[2]]}
    >
      <planeGeometry attach="geometry" args={[1, 3 / 5]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} side={THREE.DoubleSide} />
    </mesh>
  );
}

export default function Painting() {
  const {camera, controls} = useThree();
  const cameraCopy = useRef();

  const [isFocus, setIsFocus] = useState(false)
  const [_positionCam, setPosition] = useState(new THREE.Vector3())

  // useHelper(cameraCopy, THREE.CameraHelper)

  return (
    <>
      {/*<PerspectiveCamera ref={cameraCopy} position={[7.3, 2.37, -8]}/>*/}
      <Suspense fallback={null}>
        {
          paintingsInfos.map((painting, index) => (
            <group key={index}>
              <Image painting={painting}/>
              <Cartel painting={painting}/>
            </group>
          ))
        }
      </Suspense>
    </>
  );
}
