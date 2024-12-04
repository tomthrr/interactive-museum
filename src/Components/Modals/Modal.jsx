import {Scroll} from "@react-three/drei";

export default function Modal({children, position, closeModal}) {

  return (
    <Scroll html className={"modal-container"} position={position}>
      <div
        className={"background"}
        onClick={() => closeModal()}
      >
        <div className={"modal"} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </Scroll>
  )
}