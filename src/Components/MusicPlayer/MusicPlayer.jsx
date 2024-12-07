import { useState, forwardRef, useImperativeHandle } from "react";
import styles from "./styles.module.scss";
import AnimatedWaveButton from "@/Components/MusicPlayer/AnimatedWaveButton";

const MusicPlayer = forwardRef((props, ref) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    const myAudio = document.querySelector("#classic-audio");
    if (myAudio) {
      myAudio.play()
        .then(() => {
          setIsPlaying(true);
          console.log("Audio is playing");
        })
        .catch((error) => {
          console.error("Audio play failed", error);
        });
    }
  };

  const handleStop = () => {
    const myAudio = document.querySelector("#classic-audio");
    if (myAudio) {
      myAudio.pause();
      myAudio.currentTime = 0;
      setIsPlaying(false);
    }
  };

  // Expose la méthode playMusic à travers la référence
  useImperativeHandle(ref, () => ({
    playMusic: handlePlay,
  }));

  return (
    <div className="player">
      {!isPlaying ? (
        <>
          <div className={styles.startButton} onClick={handlePlay}>
            <AnimatedWaveButton intensity={60} />
          </div>
        </>
      ) : (
        <div className={styles.startButton} onClick={handleStop}>
          <AnimatedWaveButton intensity={180} />
        </div>
      )}
      <audio
        id="classic-audio"
        src="./sound/gnossienne1.mp4"
        loop
        preload="auto"
      ></audio>
    </div>
  );
});

export default MusicPlayer;
