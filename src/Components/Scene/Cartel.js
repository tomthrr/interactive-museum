import {useState} from "react";
import {useLoader} from "@react-three/fiber";
import * as THREE from "three";
import {Scroll} from "@react-three/drei";

export default function Cartel({ painting }) {
  const [open, setOpen] = useState(false);
  const texture = useLoader(THREE.TextureLoader, '/pictures_monet/' + painting.cartel.cartelPath);

  const openModal = () => {
    setOpen(true);
  }

  const closeModal = () => {
    setOpen(false);
    const container = document.querySelector('.modal-container');
    if (container) container.style.display = 'none';
  }

  return (
    <>
      {
        painting.title === "Haystacks (Effect of Snow and Sun)" &&
        <mesh
          position={[painting.cartel.positionCartel[0], painting.cartel.positionCartel[1], painting.cartel.positionCartel[2]]}
          rotation={[painting.cartel.rotationCartel[0], painting.cartel.rotationCartel[1], painting.cartel.rotationCartel[2]]}
        >
          <boxGeometry args={[1, 1, 1]}/>
          <meshBasicMaterial color={"green"}/>
        </mesh>
      }
      <mesh
        position={[painting.cartel.positionCartel[0], painting.cartel.positionCartel[1], painting.cartel.positionCartel[2]]}
        rotation={[painting.cartel.rotationCartel[0], painting.cartel.rotationCartel[1], painting.cartel.rotationCartel[2]]}
        onClick={(e) => openModal()}
      >
        <planeGeometry attach="geometry" args={[1 / 5, 1 / 5]}/>
        <meshBasicMaterial attach="material" map={texture} toneMapped={false} side={THREE.DoubleSide}/>
      </mesh>
      {
        open && <Scroll html position={painting.position} className={"modal-container"}>
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
        </Scroll>
      }
    </>
  )
}