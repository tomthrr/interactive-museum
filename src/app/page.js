"use client";
import dynamic from 'next/dynamic';
import styles from './page.module.scss';
import {useEffect} from "react";
import RestartButton from "@/Components/Buttons/RestartButton";

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
})

export default function Home() {

  return (
    <main className={styles.main}>
      <Scene/>
      <RestartButton />
    </main>
  )
}
