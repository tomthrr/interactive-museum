import * as THREE from 'three';

const floorGeometry = new THREE.PlaneGeometry(6, 8);
const wallGeometry = new THREE.PlaneGeometry(6, 2);
const sideWallGeometry = new THREE.PlaneGeometry(8, 2);

const floorMaterial = new THREE.MeshStandardMaterial({
  color: 'orangered',
  side: THREE.DoubleSide
});
const wallMaterial = new THREE.MeshStandardMaterial({
  color: 'powderblue',
  side: THREE.DoubleSide
});

export default function MuseumTest() {

  return (
    <>
    {/* Floor */}
      <mesh
        geometry={floorGeometry}
        material={floorMaterial}
        position={[0, 0, 0]}
        side={THREE.DoubleSide}
        rotation={[-Math.PI / 2, 0, 0]}>
      </mesh>
      {/* Floor */}
      <mesh
        geometry={wallGeometry}
        material={wallMaterial}
        position={[0, 1, -4]}
        receiveShadow
      />
      <mesh
        geometry={sideWallGeometry}
        material={wallMaterial}
        position={[3, 1, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow
      />
      <mesh
        geometry={sideWallGeometry}
        material={wallMaterial}
        position={[-3, 1, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow
      />
    </>
  )
}