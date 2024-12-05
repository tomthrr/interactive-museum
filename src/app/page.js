"use client";
import dynamic from 'next/dynamic';
import styles from './page.module.scss';
import {useEffect} from "react";
import RestartButton from "@/Components/Buttons/RestartButton";
import CartelModal from "@/Components/Modals/CartelModal/CartelModal";
import {paintingsInfos} from "@/data/paintings-infos";
import MusicPlayer from "@/Components/MusicPlayer/MusicPlayer";
import OverlayStart from "@/Components/OverlayStart/OverlayStart";

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
})

export default function Home() {

  return (
    <main className={styles.main}>
      <Scene/>
      <OverlayStart />
      <RestartButton />
      {
        paintingsInfos.map((painting, index) => (
          <CartelModal key={index} data={painting}/>
        ))
      }
    </main>
  )
}
