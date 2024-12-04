import styles from "./styles.module.scss"

export default function RestartButton() {

  return (
    <div
      id={"restart"}
      className={styles.restartButton}
    >
      <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 6V18M12 6L7 11M12 6L17 11" stroke="#000000"/>
      </svg>
    </div>
  )
}