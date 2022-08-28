import type { NextPage } from 'next'
import Head from 'next/head'
import CandidateListLayout from '../layouts/CandidateListLayout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>HR Demo</title>
        <meta name="description" content="Powered by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Candidate Reviewer
        </h1>
        <CandidateListLayout />
      </main>
    </div>
  )
}

export default Home
