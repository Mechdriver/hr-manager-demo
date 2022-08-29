import { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import CandidateListLayout from "../layouts/CandidateListLayout";
import styles from "../styles/Home.module.css";
import { Candidate } from "../types/CandidateType";
import { parseCandidate } from "../types/utils";

const Home: NextPage = () => {
  // Because of SSR, fetching the candidate here allows us to safely use sessionStorage
  const [candidate, setCandidate] = useState<Candidate | null>(null);

  const fetchNewCandidate = () => {
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        const parsed: Candidate = parseCandidate(data.results[0]);
        setCandidate(parsed);
      });
  };

  useEffect(() => {
    fetchNewCandidate();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>HR Demo</title>
        <meta name="description" content="Powered by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Candidate Reviewer</h1>
        {candidate && (
          <CandidateListLayout
            candidate={candidate}
            fetchNewCandidate={fetchNewCandidate}
          />
        )}
      </main>
    </div>
  );
};

export default Home;
