import styles from "./loadingScreen.module.scss";
import { useProgress } from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import OverlayStart from "@/Components/OverlayStart/OverlayStart";
import gsap from "gsap"

export default function LoadingScreen({started, onStarted}) {
  const { progress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);
  const progressBar = useRef();
  const loadingScreenContainer = useRef();
  const [simulatedProgress, setSimulatedProgress] = useState(0); // Progression simulée

  useEffect(() => {
    const fakeProgressSteps = [33, 79, 99];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < fakeProgressSteps.length) {
        const target = fakeProgressSteps[stepIndex];
        gsap.to(progressBar.current, {
          width: `${target}%`,
          duration: 0.8,
          ease: "power2.out",
        });
        setSimulatedProgress(target);
        stepIndex++;
      } else if (progress === 100) {
        // Terminer une fois que le vrai `progress` atteint 100
        gsap.to(progressBar.current, {
          backgroundColor: `rgba(219, 223, 234, 0.6)`,
          duration: 0.5,
          ease: "power2.out",
        });
        gsap.to(loadingScreenContainer.current, {
          width: `100%`,
          duration: 0.5,
          ease: "power2.out",
        });
        setSimulatedProgress(100);
        setIsLoading(false);
      }
    }, 500); // Intervalle entre chaque étape

    return () => clearInterval(interval);
  }, [progress]);

  return (
    <>
      {
        isLoading ? (
          <div className={styles.loadingScreenContainer} ref={loadingScreenContainer}>
            <div className={styles.progressContainer}>
              <div className={styles.progressBar}>
                <div
                  className={styles.progress}
                  ref={progressBar}
                  style={{
                    width: `${simulatedProgress}%`,
                  }}
                ></div>
              </div>
              <p className={styles.progressText}>{Math.floor(simulatedProgress)}%</p>
            </div>
          </div>) : (
          <OverlayStart onStarted={onStarted}/>
        )
      }</>
  );
}
