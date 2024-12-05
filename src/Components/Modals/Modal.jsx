import {Html, Scroll} from "@react-three/drei";

export default function Modal({children, modalRef, nameContainer, closeModal}) {

  return (
    <div className={`modal-container-${nameContainer} modal-container`}>
      <div
        id={"modal-cartel"}
        ref={modalRef}
        className={"background"}
        onClick={() => closeModal()}
      >
        <div className={"modal"} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  )
}