import * as THREE from 'three';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {Suspense, useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {Html, PerspectiveCamera, useHelper} from "@react-three/drei";
import styles from "@/app/page.module.scss";
import {useControls} from "leva";
import {paintingsInfos} from "@/data/paintings-infos";

function Cartel({ painting }) {
  const [open, setOpen] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/pictures_monet/' + painting.cartel.cartelPath);

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
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
      {
        open && <Html fullscreen={true} position={painting.position}>
          <div
            className={"background"}
            onClick={() => closeModal()}
          >
            <div className={"modal"} onClick={(e) => e.stopPropagation()}>
              <div className={"header"}>
                <h2>{painting.artist}</h2>
                <h3>{painting.artistInfos}</h3>
              </div>
              <div className={"subheader"}>
                <h2>{painting.title}</h2>
                <h3>{painting.medium}, {painting.made}</h3>
                <p>{painting.dimensions}</p>
              </div>
              <div className={"content"}>
                <div className={"description"}>
                  <p>{painting.description}</p>
                </div>
              </div>
              <div className={"footer"}>
                <button
                  onClick={() => closeModal()}
                  className={"button"}
                >Close
                </button>
              </div>
            </div>
          </div>
        </Html>
      }
    </>
  )
}

function Image({painting, onImageClick}) {
  const texture = useLoader(THREE.TextureLoader, '/pictures_monet/' + painting.name);

  return (
    <mesh
      position={[painting.position[0], painting.position[1], painting.position[2]]}
      rotation={[painting.rotation[0], painting.rotation[1], painting.rotation[2]]}
      onClick={(e) => onImageClick(e.object, painting.cameraPos)}
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


  const handleImageClick = (mesh, cameraPos) => {
    // Sauvegarder la position initiale de la caméra au premier clic
    if (!_positionCam.length()) {
      setPosition(camera.position.clone()); // Clone la position initiale
    }

    if (!isFocus) {
      // Zoom sur le tableau
      gsap.to(camera.position, {
        x: cameraPos.x,
        y: cameraPos.y,
        z: cameraPos.z,
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          // Centrer temporairement les contrôles sur le tableau
          const boundingBox = new THREE.Box3().setFromObject(mesh);
          const center = boundingBox.getCenter(new THREE.Vector3());
          controls.target.copy(center);
          controls.update();
        },
        onComplete: () => {
          // Permettre la navigation après le zoom
          setIsFocus(true); // La caméra est maintenant en focus sur le tableau
        }
      });
    } else {
      // Retour à la position initiale
      gsap.to(camera.position, {
        x: _positionCam.x,
        y: _positionCam.y,
        z: _positionCam.z,
        duration: 1,
        ease: "power1.inOut",
        onStart: () => {
          controls.target.set(0, 0, 0);
          controls.update();
        },
        onComplete: () => {
          setIsFocus(false);
        }
      });
    }
  };

  // useHelper(cameraCopy, THREE.CameraHelper)

  const { positionX, positionY, positionZ } = useControls(`Position - Camera`, {
    positionX: { value: paintingsInfos[0].cameraPos.x || 0, min: -20, max: 20, step: 0.01 },
    positionY: { value: paintingsInfos[0].cameraPos.y || 0, min: -20, max: 20, step: 0.01 },
    positionZ: { value: paintingsInfos[0].cameraPos.z || 0, min: -20, max: 20, step: 0.01 },
  });

  return (
    <>
      {/*<PerspectiveCamera ref={cameraCopy} position={[7.3, 2.37, -8]}/>*/}
      <Suspense fallback={null}>
        {
          paintingsInfos.map((painting, index) => (
            <group key={index}>
              <Image painting={painting} onImageClick={handleImageClick}/>
              <Cartel painting={painting}/>
            </group>
          ))
        }
      </Suspense>
    </>
  );
}
