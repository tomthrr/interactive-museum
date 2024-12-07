import styles from "./loadingScreen.module.scss";
import { useProgress } from "@react-three/drei";
import {useEffect, useRef, useState} from "react";
import OverlayStart from "@/Components/OverlayStart/OverlayStart";
import gsap from "gsap";
import Signature from "@/Components/LoadingScreen/Signature";

export default function LoadingScreen({started, onStarted}) {
  const { progress } = useProgress();
  const [isLoading, setIsLoading] = useState(true);
  const loaderRef = useRef();
  const loadingScreenContainer = useRef();
  const [simulatedProgress, setSimulatedProgress] = useState(0); // Progression simulée

  useEffect(() => {
    const fakeProgressSteps = [33, 79, 99];
    let stepIndex = 0;

    const interval = setInterval(() => {
      if (stepIndex < fakeProgressSteps.length) {
        const target = fakeProgressSteps[stepIndex];
        gsap.to(loaderRef.current, {
          clipPath: `inset(0 ${100-target}% 0 0)`,
          duration: 0.8,
          ease: "power2.out",
        });
        setSimulatedProgress(target);
        stepIndex++;
      } else if (progress === 100 && loaderRef.current) {
        // Terminer une fois que le vrai `progress` atteint 100
        clearInterval(interval); // Arrête l'intervalle
        const tl = gsap.timeline({
          onComplete: () => {
            setIsLoading(false);
            setSimulatedProgress(100);
          },
        });

        tl.to(loaderRef.current, {
          clipPath: `inset(0 0 0 0)`,
          duration: 0.5,
          ease: "power2.out",
        })
          .to(loadingScreenContainer.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
          });
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
              <Signature loaderRef={loaderRef}/>
            </div>
          </div>
        ) : (
          <OverlayStart onStarted={onStarted}/>
        )
      }</>
  );
}
