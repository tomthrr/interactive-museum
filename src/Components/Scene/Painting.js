import * as THREE from 'three';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {Suspense, useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {Html, PerspectiveCamera, useHelper} from "@react-three/drei";
import styles from "@/app/page.module.scss";
import {useControls} from "leva";

const paintingsInfos = [
  {
    name: 'haystack-snow-effect.jpg',
    title: 'Haystacks',
    made: '1891',
    description: 'Between 1890 and 1891 Monet devoted some thirty paintings to the haystacks in a field near his house\n' +
      '                    at\n' +
      '                    Giverny. In the midst of this effort, he wrote to the critic Gustave Geoffroy: "I am working very\n' +
      '                    hard,\n' +
      '                    struggling with a series of different effects (haystacks), but at this season the sun sets so fast I\n' +
      '                    cannot follow it. . . . The more I continue, the more I see that a great deal of work is necessary in\n' +
      '                    order to succeed in rendering what I seek." Haystacks was the first group of paintings that Monet\n' +
      '                    exhibited as a series; in 1891, fifteen were shown at the Galerie Durand-Ruel in Paris.',
    position: [-8.39, 2.37, 6.59],
    rotation: [0,0,0],
    cartel: {
      positionCartel: [-7.74  , 2.37, 6.59],
    },
    cameraPos: {
      x: -8.39,
      y: 2.37,
      z: 7.59
    }
  }
]

function Cartel({ painting }) {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
  }

  const { positionX, positionY, positionZ } = useControls(`Position - cartel`, {
    positionX: { value: painting.cartel.positionCartel[0] || 0, min: -20, max: 20, step: 0.01 },
    positionY: { value: painting.cartel.positionCartel[1] || 0, min: -20, max: 20, step: 0.01 },
    positionZ: { value: painting.cartel.positionCartel[2] || 0, min: -20, max: 20, step: 0.01 },
  });

  return (
    <>
      <mesh
        position={[positionX, positionY, positionZ]}
        onClick={(e) => openModal()}
      >
        <planeGeometry args={[1 / 5, 1 / 5]}/>
        <meshBasicMaterial color={"limegreen"} side={THREE.DoubleSide}/>
      </mesh>
      {
        open && <Html fullscreen={true} position={painting.position}>
          <div
            className={"background"}
            onClick={() => closeModal()}
          >
            <div className={"modal"} onClick={(e) => e.stopPropagation()}>
              <div className={"header"}>
                <h2>{painting.title}</h2>
              </div>
              <div className={"content"}>
                <div className={"description"}>
                  <p>{painting.description}</p>
                </div>
                <div className={"infos"}>
                  <p>Made in {painting.made}.</p>
                </div>
              </div>
              <div className={"footer"}>
                <button
                  onClick={() => closeModal()}
                  className={"button"}
                >Close</button>
              </div>
            </div>
          </div>
        </Html>
      }
    </>
  )
}

function Image({ painting, onImageClick }) {
  const texture = useLoader(THREE.TextureLoader, '/pictures_monet/' + painting.name);

  const { positionX, positionY, positionZ } = useControls(`Position - tableau`, {
    positionX: { value: painting.position[0] || 0, min: -20, max: 20, step: 0.01 },
    positionY: { value: painting.position[1] || 0, min: -20, max: 20, step: 0.01 },
    positionZ: { value: painting.position[2] || 0, min: -20, max: 20, step: 0.01 },
  });

  return (
    <mesh
      position={[positionX, positionY, positionZ]}
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
      <PerspectiveCamera ref={cameraCopy} far={4} position={[
        positionX,
        positionY,
        positionZ
      ]} />
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
