"use client";
import dynamic from 'next/dynamic';
import styles from './page.module.scss';
import {useEffect} from "react";
import RestartButton from "@/Components/Buttons/RestartButton";
import CartelModal from "@/Components/Modals/CartelModal/CartelModal";
import {paintingsInfos} from "@/data/paintings-infos";

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
})

export default function Home() {

  return (
    <main className={styles.main}>
      <Scene/>
      <RestartButton />
      {
        paintingsInfos.map((painting, index) => (
          <CartelModal key={index} data={painting}/>
        ))
      }
    </main>
  )
}
