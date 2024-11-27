import dynamic from 'next/dynamic'
import styles from './page.module.scss'

const Scene = dynamic(() => import('@/components/Scene'), {
  ssr: false,
})

const Cross = ({props}) => (
  <svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 8L8 16M8.00001 8L16 16" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>
)

export default function Home() {
  return (
    <main className={styles.main}>
      <Scene />
    </main>
  )
}
