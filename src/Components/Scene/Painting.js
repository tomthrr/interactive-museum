import * as THREE from 'three';
import { useFrame, useLoader, useThree } from "@react-three/fiber";
import {Suspense, useEffect, useRef, useState} from "react";
import gsap from "gsap";
import {paintingsInfos} from "@/data/paintings-infos";

import { extend } from "@react-three/fiber";
import { ShaderMaterial, DoubleSide } from "three";

class GlowMaterial extends ShaderMaterial {
  constructor() {
    super({
      uniforms: {
        uTime: { value: 0 },
        uTexture: { value: null },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uTime;
        uniform sampler2D uTexture;
        varying vec2 vUv;
        
        void main() {
          // Charge la texture
          vec4 textureColor = texture2D(uTexture, vUv);
        
          // Ligne diagonale
          float linePosition = fract(vUv.x + vUv.y - uTime * 0.5); // Position de la ligne
          float line = smoothstep(0.48, 0.52, linePosition);       // Ligne équilibrée
        
          // Ajouter une transition douce autour de la ligne, effet blur
          float glow = smoothstep(0.3, 0.7, linePosition) - smoothstep(0.5, 0.9, linePosition);
        
          // Combiner texture et ligne avec une faible opacité pour l'effet de transparence
          vec3 finalColor = textureColor.rgb + vec3(glow * 0.3); // Glow
        
          gl_FragColor = vec4(finalColor, textureColor.a);
        }
      `,

      side: DoubleSide,
    });
  }
}

extend({ GlowMaterial });

extend({ GlowMaterial });

function Cartel({ painting }) {
  const texture = useLoader(THREE.TextureLoader, '/pictures_monet/' + painting.cartel.cartelPath);
  const materialRef = useRef();
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

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <>
      <mesh
        position={[painting.cartel.positionCartel[0], painting.cartel.positionCartel[1], painting.cartel.positionCartel[2]]}
        rotation={[painting.cartel.rotationCartel[0], painting.cartel.rotationCartel[1], painting.cartel.rotationCartel[2]]}
        onClick={(e) => openModal()}
      >
        <planeGeometry attach="geometry" args={[1 / 5, 1 / 5]}/>
        <glowMaterial ref={materialRef}/>
        <glowMaterial ref={materialRef} attach="material" uniforms-uTexture-value={texture}/>
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
