import Modal from "@/Components/Modals/Modal";

export default function CartelModal({painting, closeModal}) {

  console.log(painting.position)
  return (
    <Modal closeModal={closeModal} position={painting.position}>
      <div className={"header"}>
        <h2>{painting.artist}</h2>
        <h3>{painting.artistInfos}</h3>
      </div>
      <div className={"subheader"}>
        <h2>{painting.title}</h2> v
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
    </Modal>
  )
}