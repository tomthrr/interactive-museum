import { useState } from "react";
import styles from "./styles.module.scss";

export default function MusicPlayer() {
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

  return (
    <div className="player">
      {!isPlaying ? (
        <>
          <button className={styles.startButton} onClick={() => handlePlay()}>
            Play
          </button>
        </>
      ) : (
        <button className={styles.startButton} onClick={() => handleStop()}>
          Stop
        </button>
      )}
      <audio
        id="classic-audio"
        src="./sound/gnossienne1.mp4"
        loop
        preload="auto"
      ></audio>
    </div>
  );
}
