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

  const fetchNewCandidate = () => {
    const parsed: Candidate = parseCandidate(dummyData.results[0]);
    setCandidate(parsed);
    /*
      fetch("https://randomuser.me/api/")
        .then((response) => response.json())
        .then((data) => {
          const parsed: Candidate = parseCandidate(data.results[0]);
          setCandidate(parsed);
        });*/
  };

  useEffect(() => {
    fetchNewCandidate();
  }, []);

  return (
    <div className={styles.container}>
      {candidate && (
        <CandidateCard
          candidate={candidate}
          fetchNewCandidate={fetchNewCandidate}
          isNewCandidate
        />
      )}
      {candidateHistoryList.length > 0 && (
        <h2 className={styles.title}>History</h2>
      )}
      {candidateHistoryList.map((candidate) => {
        return (
          <CandidateCard
            key={candidate.uuid}
            candidate={candidate}
            fetchNewCandidate={fetchNewCandidate}
          />
        );
      })}
    </div>
  );
}

export default CandidateListLayout;
