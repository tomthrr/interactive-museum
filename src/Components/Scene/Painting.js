import * as THREE from 'three';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {Suspense, useRef} from "react";
import gsap from "gsap";
import {PerspectiveCamera, useHelper} from "@react-three/drei";

const picturesNames = [
  {
    name: 'haystack-snow-effect.jpg'
  }
]

function Image({ name, onImageClick }) {
  const texture = useLoader(THREE.TextureLoader, '/pictures_monet/' + name);

  return (
    <mesh
      position={[0, 1, -3.98]} // Position du tableau
      onClick={(e) => onImageClick(e.object)} // Passe l'objet cliqué
    >
      <planeGeometry attach="geometry" args={[1, 3 / 5]} />
      <meshBasicMaterial attach="material" map={texture} toneMapped={false} />
    </mesh>
  );
}

export default function Painting() {
  const { camera } = useThree();
  const cameraRef = useRef();

  const handleImageClick = (mesh) => {
    const position = mesh.position;
    const normalOffset = 2;

    const targetPosition = new THREE.Vector3(
      position.x,
      position.y,
      position.z
    );

    console.log("model", cameraRef.current.position)
    console.log("model", cameraRef.current.rotation)

    gsap.to(camera.position, {
      x: cameraRef.current.position.x,
      y: cameraRef.current.position.y,
      z: cameraRef.current.position.z,
      duration: 1.5,
      ease: "power3.inOut",
      onUpdate: () => {
        camera.updateMatrixWorld()
      },
      onComplete: () => {
        camera.updateMatrixWorld()
        console.log("cam", camera.position)

        gsap.to(camera.rotation, {
          x: cameraRef.current.rotation.x,
          y: cameraRef.current.rotation.y,
          z: cameraRef.current.rotation.z,
          duration: 1.5,
          ease: "power3.inOut",
          onUpdate: () => {
            camera.updateMatrixWorld()
          },
          onComplete: () => {
            camera.updateMatrixWorld()
            console.log("cam", camera.rotation)
          },
        });
      },
    });
  };

  useHelper(cameraRef, THREE.CameraHelper)

  return (
    <>
      <PerspectiveCamera makeDefault={false} ref={cameraRef} near={1} far={4} position={[0, 1, -2]} rotation={[0, 0, 0]}>
        <meshBasicMaterial />
      </PerspectiveCamera>
      <Suspense fallback={null}>
        {
          picturesNames.map((picture, index) => (
            <Image key={index} name={picture.name} onImageClick={handleImageClick} />
          ))
        }
      </Suspense>
    </>
  );
}
