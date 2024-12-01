import React, { useLayoutEffect, useRef } from "react";
import { useGLTF, useScroll } from "@react-three/drei";
import gsap from "gsap";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {paintingsInfos} from "@/data/paintings-infos";

export const LENGTH = 10;
export const NB_PAINTINGS = 10;
export const INITIAL_POS = new THREE.Vector3(-8.00, 2.75, 16.06)

export function Museum({controlsRef}) {
  const museumRef = useRef();
  const paintingL1 = useRef();
  const paintingL2 = useRef();
  const paintingR1 = useRef();
  const { camera, controls } = useThree();
  const tl = useRef();
  const { nodes, materials } = useGLTF("models/museum_room.glb");
  const scroll = useScroll();
  const lastFocus = useRef(paintingL1.current);
  const cameraTarget = useRef(INITIAL_POS);

  const rollbackFocus = () => {
    /**
     * Focus la bonne cible si on revient en arrière
     */
    const progress = tl.current.progress();
    if (progress < 0.5 && lastFocus.current !== paintingL1.current) { // L1
      updateFocus(paintingL1.current);
      lastFocus.current = paintingL1.current
    } else if (progress < 1 && progress > 0.5 && lastFocus.current !== paintingR1.current) { // L2
      updateFocus(paintingR1.current);
    }
  }

  const updateFocus = (ref) => {
    /**
     * Focus la bonne cible quand on avance
     */
    const boundingBox = new THREE.Box3().setFromObject(ref);
    const center = boundingBox.getCenter(new THREE.Vector3());
    center.y += 0.62;
    center.x -= 0.15;
    controlsRef.current.target.copy(center);
    controlsRef.current.update();
  }

  useFrame(() => {
    if (tl.current) {
      const progress = scroll.offset * tl.current.duration();
      tl.current.progress(Math.abs(progress));
      camera.position.lerp(cameraTarget.current, 0.1);
    }
  });

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(cameraTarget.current, {
      x: paintingsInfos[0].cameraPos.x,
      y: paintingsInfos[0].cameraPos.y,
      z: paintingsInfos[0].cameraPos.z,
      ease: "power1.inOut",
      onStart: () => {
        if (controlsRef) {
          updateFocus(paintingL1.current)
          lastFocus.current = paintingL1.current
        }
      },
      onUpdate: () => {
        rollbackFocus()
      }
    });

    tl.current.to(cameraTarget.current, {
      x: paintingsInfos[5].cameraPos.x,
      y: paintingsInfos[5].cameraPos.y,
      z: paintingsInfos[5].cameraPos.z,
      ease: "power1.inOut",
      onStart: () => {
        if (controlsRef) {
          updateFocus(paintingR1.current)
          lastFocus.current = paintingR1.current
        }
      },
      onUpdate: () => {
        rollbackFocus()
      }
    });
  }, []);


  return (
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
                <mesh
                  ref={paintingL1}
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube007.geometry}
                  material={materials.Glass}
                  position={[-11.279, 2.196, -6.664]}
                  scale={[0.123, 0.516, 1.118]}
                />
                <mesh
                  ref={paintingL2}
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube008.geometry}
                  material={materials.Glass}
                  position={[-5.082, 2.196, -6.664]}
                  scale={[0.123, 0.516, 1.118]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube009.geometry}
                  material={materials.Glass}
                  position={[1.115, 2.196, -6.664]}
                  scale={[0.123, 0.516, 1.118]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube010.geometry}
                  material={materials.Glass}
                  position={[7.312, 2.196, -6.664]}
                  scale={[0.123, 0.516, 1.118]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube011.geometry}
                  material={materials.Glass}
                  position={[13.509, 2.196, -6.664]}
                  scale={[0.123, 0.516, 1.118]}
                />
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
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube013.geometry}
                  material={materials.Glass}
                  position={[-5.082, 2.196, 5.103]}
                  rotation={[0, -0.454, 0]}
                  scale={[0.117, 0.516, 1.217]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube014.geometry}
                  material={materials.Glass}
                  position={[1.115, 2.196, 5.103]}
                  rotation={[0, -0.454, 0]}
                  scale={[0.117, 0.516, 1.217]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube015.geometry}
                  material={materials.Glass}
                  position={[7.312, 2.196, 5.103]}
                  rotation={[0, -0.454, 0]}
                  scale={[0.117, 0.516, 1.217]}
                />
                <mesh
                  castShadow
                  receiveShadow
                  geometry={nodes.Cube016.geometry}
                  material={materials.Glass}
                  position={[13.509, 2.196, 5.103]}
                  rotation={[0, -0.454, 0]}
                  scale={[0.117, 0.516, 1.217]}
                />
        </group>
      )
}

useGLTF.preload('models/museum_room.glb')
