import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CandidateCard from "../components/CandidateCard";
import { dummyData } from "../dummy_data";
import { candidateHistoryListState } from "../stores/CandidateStore";
import { Candidate } from "../types/CandidateType";
import { parseCandidate } from "../types/utils";
import styles from "../styles/Candidate.module.css";

function CandidateListLayout() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const candidateHistoryList = useRecoilValue(candidateHistoryListState);

  useEffect(() => {
    if (!candidate) {
      const parsed: Candidate = parseCandidate(dummyData.results[0]);
      setCandidate(parsed);
      /*
      fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((data) => {
          const parsed: Candidate = parseCandidate(data.results[0]);
          setCandidate(parsed);
        });*/
    }
    /*
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        const parsed: Candidate = parseCandidate(dummyData.results[0]);
        setCandidate(parsed);
      });*/
  }, [candidate]);

  return (
    <div className={styles.container}>
      {candidate && (
        <CandidateCard candidate={candidate} setCandidate={setCandidate} newCandidate />
      )}
      {candidateHistoryList.length > 0 && (
        <h1 className={styles.title}>History</h1>
      )}
      {candidateHistoryList.map((candidate) => {
        return (
          <CandidateCard key={candidate.uuid} candidate={candidate} setCandidate={setCandidate} />
        );
      })}
    </div>
  );
}

export default CandidateListLayout;
