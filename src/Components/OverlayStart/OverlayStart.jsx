import styles from './styles.module.scss'
import MusicPlayer from "@/Components/MusicPlayer/MusicPlayer";
import {useEffect, useRef} from "react";
import gsap from "gsap";

export default function OverlayStart({onStarted}) {
  const overlayRef = useRef();
  const musicPlayerRef = useRef();
  const mainTitle = useRef();
  const subTitle = useRef();

  const handleStart = () => {
    if (!overlayRef.current) return;
    onStarted()
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

  useEffect(() => {
    const tl = gsap.timeline();
    tl.to(mainTitle.current, {
      opacity: 1,
      duration: 1,
      ease: "power3.out",
    })
      .to(
        subTitle.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.5" // Superpose cette animation à la moitié de la précédente
      );
  }, []);

  return (
    <div className={styles.overlayContainer} id={"overlayStart"} ref={overlayRef}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 ref={mainTitle}>CLAUDE MONET</h1>
          <h2 ref={subTitle} className={styles.title}>Start the an amazing experience</h2>
        </div>
        <div className={`button ${styles.startButton}`}
             onClick={() => handleStart()}>
          Go
        </div>
        <MusicPlayer ref={musicPlayerRef} />
      </div>
    </div>
  )
}