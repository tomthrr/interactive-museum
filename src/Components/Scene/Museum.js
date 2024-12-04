import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import {useGLTF, useScroll} from "@react-three/drei";
import gsap from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {paintingsInfos} from "@/data/paintings-infos";
import Cartel from "@/Components/Scene/Cartel";
import QuizModal from "@/Components/Modals/QuizModal/QuizModal";

export const LENGTH = 10;
export const NB_PAINTINGS = 10;
export const INITIAL_POS = new THREE.Vector3(-8.00, 2.75, 16.06)
export const FINAL_POS = new THREE.Vector3(4,2.37, -12);

export function Museum({controlsRef}) {
  const museumRef = useRef();
  const paintingL1 = useRef();
  const paintingL2 = useRef();
  const paintingL3 = useRef();
  const paintingL4 = useRef();
  const paintingL5 = useRef();
  const paintingR1 = useRef();
  const paintingR2 = useRef();
  const paintingR3 = useRef();
  const paintingR4 = useRef();
  const paintingR5 = useRef();
  const paintingRefs = useRef([
    paintingL1,
    paintingR1,
    paintingL2,
    paintingR2,
    paintingL3,
    paintingR3,
    paintingL4,
    paintingR4,
    paintingL5,
    paintingR5,
  ]);

  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const { camera, controls } = useThree();
  const tl = useRef();
  const { nodes, materials } = useGLTF("models/museum_room.glb");
  const scroll = useScroll();
  const lastFocus = useRef(paintingRefs.current[0].current);
  const cameraTarget = useRef(INITIAL_POS);

  const rollbackFocus = () => {
    /**
     * Focus automatiquement la bonne cible en fonction de la progression.
     */
    const progress = tl.current.progress();
    const numPaintings = paintingRefs.current.length;
    const step = 1 / numPaintings; // Taille de chaque segment de 1/10
    const index = Math.floor(progress / step); // Indice de l'oeuvre

    const target = paintingRefs.current[index]?.current;
    if (target && lastFocus.current !== target) {
      updateFocus(target);
      lastFocus.current = target;
    }
  };

  const updateFocus = (ref) => {
    /**
     * Met à jour le focus de la caméra.
     */
    const boundingBox = new THREE.Box3().setFromObject(ref);
    const center = boundingBox.getCenter(new THREE.Vector3());
    center.y += 0.62;
    center.x -= 0.15;
    gsap.to(controlsRef.current.target, {
      x: center.x,
      y: center.y,
      z: center.z,
      duration: 1,
      ease: "power1.inOut",
      onUpdate: () => {
        controlsRef.current.update();
      },
    });
  };

  const closeModal = () => {
    setQuizModalOpen(false)
  }

  useFrame(() => {
    if (tl.current) {
      const progress = (scroll.offset * tl.current.duration()) * (1 * 0.23);
      tl.current.progress(Math.min(progress, 1));
      camera.position.lerp(cameraTarget.current, 0.1);
    }
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    paintingRefs.current.forEach((paintingRef, index) => {
      const info = paintingsInfos[index];
      tl.current.to(cameraTarget.current, {
        x: info.cameraPos.x,
        y: info.cameraPos.y,
        z: info.cameraPos.z,
        ease: "power1.inOut",
        onStart: () => {
          if (controlsRef) {
            updateFocus(paintingRef.current);
            lastFocus.current = paintingRef.current;
          }
        },
        onUpdate: rollbackFocus,
      });
    });
  }, []);

  return (
    <>
      {
        quizModalOpen && <QuizModal closeModal={closeModal} position={FINAL_POS} />
      }
      <group
        ref={museumRef}
        dispose={null}
        scale={0.8}
        rotation={[0, 1.20, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Floor.geometry}
          material={nodes.Floor.material}
          position={[-1.961, 0.263, -0.709]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-21.131, -5.164, -13.451]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube004.geometry}
          material={nodes.Cube004.material}
          position={[-1.5, 0.263, -14.419]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-21.797, -0.313, -0.516]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube005.geometry}
          material={nodes.Cube005.material}
          position={[19.803, 0.756, -0.652]}
          rotation={[0, Math.PI / 2, 0]}
          scale={[13.782, 0.516, 0.224]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube006.geometry}
          material={nodes.Cube006.material}
          position={[19.786, 0.263, -0.652]}
          rotation={[Math.PI, -Math.PI / 2, 0]}
          scale={[-13.251, -0.313, -0.516]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={nodes.Cube.material}
          position={[-1.718, 0.89, -14.557]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.616, -0.516, -0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube003.geometry}
          material={nodes.Cube003.material}
          position={[-16.736, 3.042, -14.554]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Roof.geometry}
          material={nodes.Roof.material}
          position={[-1.352, 5.961, -0.709]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-21.922, -5.164, -13.451]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube017.geometry}
          material={nodes.Cube017.material}
          position={[-12.395, 3.042, -14.554]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube018.geometry}
          material={nodes.Cube018.material}
          position={[-8.134, 3.042, -14.554]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube019.geometry}
          material={nodes.Cube019.material}
          position={[-3.793, 3.042, -14.554]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube020.geometry}
          material={nodes.Cube020.material}
          position={[0.448, 3.042, -14.554]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube021.geometry}
          material={nodes.Cube021.material}
          position={[4.79, 3.042, -14.554]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube022.geometry}
          material={nodes.Cube022.material}
          position={[9.05, 3.042, -14.554]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube023.geometry}
          material={nodes.Cube023.material}
          position={[13.392, 3.042, -14.554]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube001.geometry}
          material={nodes.Cube001.material}
          position={[-1.5, 0.263, 13.211]}
          rotation={[-Math.PI, 0, 0]}
          scale={[-21.797, -0.313, -0.516]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube002.geometry}
          material={nodes.Cube002.material}
          position={[-1.718, 0.89, 13.073]}
          rotation={[0, 0, -Math.PI]}
          scale={[-0.616, -0.516, -0.36]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube033.geometry}
          material={nodes.Cube033.material}
          position={[-16.736, 3.042, 13.076]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube034.geometry}
          material={nodes.Cube034.material}
          position={[-12.395, 3.042, 13.076]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube035.geometry}
          material={nodes.Cube035.material}
          position={[-8.134, 3.042, 13.076]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube036.geometry}
          material={nodes.Cube036.material}
          position={[-3.793, 3.042, 13.076]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube037.geometry}
          material={nodes.Cube037.material}
          position={[0.448, 3.042, 13.076]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube038.geometry}
          material={nodes.Cube038.material}
          position={[4.79, 3.042, 13.076]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube039.geometry}
          material={nodes.Cube039.material}
          position={[9.05, 3.042, 13.076]}
          scale={[1.693, 0.111, 0.052]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube040.geometry}
          material={nodes.Cube040.material}
          position={[13.392, 3.042, 13.076]}
          scale={[1.693, 0.111, 0.052]}
        />
        <group>
          <mesh
            ref={paintingL1}
            castShadow
            receiveShadow
            geometry={nodes.Cube007.geometry}
            material={materials.Glass}
            position={[-11.279, 2.196, -6.664]}
            scale={[0.123, 0.516, 1.118]}
          />

      </group>

      <group>
        <mesh
          ref={paintingL2}
          castShadow
          receiveShadow
          geometry={nodes.Cube008.geometry}
          material={materials.Glass}
          position={[-5.082, 2.196, -6.664]}
          scale={[0.123, 0.516, 1.118]}
        />

      </group>

      <group>
        <mesh
          ref={paintingL3}
          castShadow
          receiveShadow
          geometry={nodes.Cube009.geometry}
          material={materials.Glass}
          position={[1.115, 2.196, -6.664]}
          scale={[0.123, 0.516, 1.118]}
        />

      </group>

      <group>
        <mesh
          ref={paintingL4}
          castShadow
          receiveShadow
          geometry={nodes.Cube010.geometry}
          material={materials.Glass}
          position={[7.312, 2.196, -6.664]}
          scale={[0.123, 0.516, 1.118]}
        />

      </group>

      <group>
        <mesh
          ref={paintingL5}
          castShadow
          receiveShadow
          geometry={nodes.Cube011.geometry}
          material={materials.Glass}
          position={[13.509, 2.196, -6.664]}
          scale={[0.123, 0.516, 1.118]}
        />

      </group>

      <group>
        <mesh
          ref={paintingR1}
          castShadow
          receiveShadow
          geometry={nodes.Cube012.geometry}
          material={materials.Glass}
          position={[-11.279, 2.196, 5.103]}
          rotation={[0, -0.454, 0]}
          scale={[0.117, 0.516, 1.217]}
        />

      </group>

      <group>
        <mesh
          ref={paintingR2}
          castShadow
          receiveShadow
          geometry={nodes.Cube013.geometry}
          material={materials.Glass}
          position={[-5.082, 2.196, 5.103]}
          rotation={[0, -0.454, 0]}
          scale={[0.117, 0.516, 1.217]}
        />

      </group>

      <group>
        <mesh
          ref={paintingR3}
          castShadow
          receiveShadow
          geometry={nodes.Cube014.geometry}
          material={materials.Glass}
          position={[1.115, 2.196, 5.103]}
          rotation={[0, -0.454, 0]}
          scale={[0.117, 0.516, 1.217]}
        />

      </group>

      <group>
        <mesh
          ref={paintingR4}
          castShadow
          receiveShadow
          geometry={nodes.Cube015.geometry}
          material={materials.Glass}
          position={[7.312, 2.196, 5.103]}
          rotation={[0, -0.454, 0]}
          scale={[0.117, 0.516, 1.217]}
        />

      </group>

      <group>
        <mesh
          ref={paintingR5}
          castShadow
          receiveShadow
          geometry={nodes.Cube016.geometry}
          material={materials.Glass}
          position={[13.509, 2.196, 5.103]}
          rotation={[0, -0.454, 0]}
          scale={[0.117, 0.516, 1.217]}
        />

      </group>
      </group>
    </>
  )
}

useGLTF.preload('models/museum_room.glb')
