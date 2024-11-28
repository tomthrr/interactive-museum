import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Museum(props) {
  const { nodes, materials } = useGLTF('/models/museum_room.glb')
  return (
    <group {...props} dispose={null} scale={0.5} rotation={[0, Math.PI/2, 0]}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Floor.geometry}
        material={nodes.Floor.material}
        position={[1.774, 0.263, -0.709]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-17.497, -5.164, -13.451]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube004.geometry}
        material={nodes.Cube004.material}
        position={[1.774, 0.263, -14.419]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-18.13, -0.313, -0.516]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube005.geometry}
        material={nodes.Cube005.material}
        position={[19.788, 0.756, -0.652]}
        rotation={[0, Math.PI / 2, 0]}
        scale={[13.782, 0.516, 0.171]}
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
        position={[1.774, 0.89, -14.557]}
        rotation={[0, 0, -Math.PI]}
        scale={[-0.516, -0.516, -0.36]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={nodes.Cube001.material}
        position={[1.774, 0.263, 13.057]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-18.13, -0.313, -0.516]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube002.geometry}
        material={nodes.Cube002.material}
        position={[1.774, 0.89, 12.919]}
        rotation={[0, 0, -Math.PI]}
        scale={[-0.516, -0.516, -0.36]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube003.geometry}
        material={nodes.Cube003.material}
        position={[-10.796, 3.05, -14.561]}
        scale={[1.419, 0.111, 0.052]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube007.geometry}
        material={nodes.Cube007.material}
        position={[-11.279, 2.196, -6.664]}
        scale={[0.123, 0.516, 1.118]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008.geometry}
        material={nodes.Cube008.material}
        position={[-5.082, 2.196, -6.664]}
        scale={[0.123, 0.516, 1.118]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube009.geometry}
        material={nodes.Cube009.material}
        position={[1.115, 2.196, -6.664]}
        scale={[0.123, 0.516, 1.118]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube010.geometry}
        material={nodes.Cube010.material}
        position={[7.312, 2.196, -6.664]}
        scale={[0.123, 0.516, 1.118]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube011.geometry}
        material={nodes.Cube011.material}
        position={[13.509, 2.196, -6.664]}
        scale={[0.123, 0.516, 1.118]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube012.geometry}
        material={nodes.Cube012.material}
        position={[-11.279, 2.196, 5.103]}
        rotation={[0, -0.454, 0]}
        scale={[0.117, 0.516, 1.217]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube013.geometry}
        material={nodes.Cube013.material}
        position={[-5.082, 2.196, 5.103]}
        rotation={[0, -0.454, 0]}
        scale={[0.117, 0.516, 1.217]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube014.geometry}
        material={nodes.Cube014.material}
        position={[1.115, 2.196, 5.103]}
        rotation={[0, -0.454, 0]}
        scale={[0.117, 0.516, 1.217]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube015.geometry}
        material={nodes.Cube015.material}
        position={[7.312, 2.196, 5.103]}
        rotation={[0, -0.454, 0]}
        scale={[0.117, 0.516, 1.217]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube016.geometry}
        material={nodes.Cube016.material}
        position={[13.509, 2.196, 5.103]}
        rotation={[0, -0.454, 0]}
        scale={[0.117, 0.516, 1.217]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Roof.geometry}
        material={nodes.Roof.material}
        position={[1.774, 5.961, -0.709]}
        rotation={[-Math.PI, 0, 0]}
        scale={[-17.497, -5.164, -13.451]}
      />
    </group>
  )
}

useGLTF.preload('/museum_room.glb')