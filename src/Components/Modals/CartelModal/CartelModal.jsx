import Modal from "@/Components/Modals/Modal";
import {useRef, useState} from "react";
import gsap from "gsap";

export default function CartelModal({ data }) {
  const modalRef = useRef()
  const [open, setOpen] = useState(true)

  const nameContainer = `.modal-container-${data.id}`

  const closeModal = () => {
    setOpen(false);
    const container = document.querySelector(nameContainer);
    if (container) {
      gsap.to(container, {
        opacity: 0,
        display: "none",
        top: 0,
        duration: 1,
        ease: "power2.out"
      })
    }
  }

  return (
    <Modal closeModal={closeModal} modalRef={modalRef} nameContainer={data?.id}>
      <div className={"header"}>
        <h2>{data?.artist || "Default Artist"}</h2>
        <h3>{data?.artistInfos || "Default Infos"}</h3>
      </div>
      <div className={"subheader"}>
        <h2>{data?.title || "Default Title"}</h2> v
        <h3>{data?.medium || "Default Medium"}, {data?.made || "Default Made"}</h3>
        <p>{data?.dimensions || "Default Title"}</p>
      </div>
      <div className={"content"}>
        <div className={"description"}>
          <p>{data?.description || "Default Description"}</p>
        </div>
      </div>
      <div className={"footer"}>
        <button
          onClick={() => closeModal()}
          className={"button"}
        >
          Close
        </button>
      </div>
    </Modal>
  )
}