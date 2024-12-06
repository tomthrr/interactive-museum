"use client";
import dynamic from 'next/dynamic';
import styles from './page.module.scss';
import {useEffect, useState} from "react";
import RestartButton from "@/Components/Buttons/RestartButton";
import CartelModal from "@/Components/Modals/CartelModal/CartelModal";
import {paintingsInfos} from "@/data/paintings-infos";
import MusicPlayer from "@/Components/MusicPlayer/MusicPlayer";
import OverlayStart from "@/Components/OverlayStart/OverlayStart";
import {Loader} from "@react-three/drei";
import LoadingScreen from "@/Components/LoadingScreen/LoadingScreen";

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
})

export default function Home() {
  const [start, setStart] = useState(false)

  return (
    <main className={styles.main}>
      <Scene/>
      <LoadingScreen started={start} onStarted={() => setStart(true)}/>

      <RestartButton />
      {
        paintingsInfos.map((painting, index) => (
          <CartelModal key={index} data={painting}/>
        ))
      }
    </main>
  )
}
