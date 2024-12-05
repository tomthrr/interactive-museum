import styles from './styles.module.scss'
import MusicPlayer from "@/Components/MusicPlayer/MusicPlayer";
import {useRef} from "react";
import gsap from "gsap";

export default function OverlayStart() {
  const overlayRef = useRef();
  const musicPlayerRef = useRef();

  const handleStart = () => {
    if (!overlayRef.current) return;
    gsap.to(overlayRef.current, {
      opacity: 0,
      display: "none",
      duration: 1,
      onComplete: () => {
        if (musicPlayerRef.current) {
          musicPlayerRef.current.playMusic();
        }
      },
    })
  }

  return (
    <div className={styles.overlayContainer} id={"overlayStart"} ref={overlayRef}>
      <div className={styles.container}>
        <h1 className={styles.title}>Start the experience</h1>
        <div className={`button ${styles.startButton}`}
            onClick={() => handleStart()}>
          Go
        </div>
        <MusicPlayer ref={musicPlayerRef} />
      </div>
    </div>
  )
}