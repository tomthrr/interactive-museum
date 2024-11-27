import * as THREE from 'three';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {Suspense, useRef} from "react";
import gsap from "gsap";
import {PerspectiveCamera, useHelper} from "@react-three/drei";

const paintingsInfos = [
  {
    name: 'haystack-snow-effect.jpg',
    position: [0, 1, -3.98],
    cameraPos: {
      x: 0,
      y: 1,
      z: -3
    }
  }
]

function Image({ painting, onImageClick }) {
  const texture = useLoader(THREE.TextureLoader, '/pictures_monet/' + painting.name);

  return (
    <mesh
      position={painting.position} // Position du tableau
      onClick={(e) => onImageClick(e.object, painting.cameraPos)} // Passe l'objet cliqué
    >
      <planeGeometry attach="geometry" args={[1, 3 / 5]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  );
}

export default function Painting() {
  const { camera, controls } = useThree();
  const cameraRef = useRef();

  const handleImageClick = (mesh, cameraPos) => {
    // Set the correct target of controls
    const __box = new THREE.Box3().setFromObject( mesh )
    const center = __box.getCenter( new THREE.Vector3() )
    controls.target.copy(center);
    controls.update();

    // Set the position
    gsap.to(camera.position, {
      x: cameraPos.x,
      y: cameraPos.y,
      z: cameraPos.z,
      duration: 1,
      ease: "power1.inOut"
    })
  };



  return (
    <>
      <Suspense fallback={null}>
        {
          paintingsInfos.map((painting, index) => (
            <Image key={index} painting={painting} onImageClick={handleImageClick} />
          ))
        }
      </Suspense>
    </>
  );
}
