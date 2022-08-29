import { useRecoilValue } from "recoil";
import CandidateCard from "../components/CandidateCard";
import { candidateHistoryListState } from "../stores/CandidateStore";
import { Candidate } from "../types/CandidateType";
import styles from "../styles/Candidate.module.css";

type CandidateListLayoutPropsType = {
  candidate: Candidate;
  fetchNewCandidate: () => void;
};

function CandidateListLayout({
  candidate,
  fetchNewCandidate,
}: CandidateListLayoutPropsType) {
  const candidateHistoryList = useRecoilValue(candidateHistoryListState);

  return (
    <div className={styles.container}>
      {candidate && (
        <div data-testid="new-candidate">
          <CandidateCard
            candidate={candidate}
            fetchNewCandidate={fetchNewCandidate}
            isNewCandidate
          />
        </div>
      )}
      {candidateHistoryList.length > 0 && (
        <h2 className={styles.title}>History</h2>
      )}
      {candidateHistoryList.map((candidate) => {
        return (
          <div data-testid="old-candidate" key={candidate.uuid}>
            <CandidateCard
              candidate={candidate}
              fetchNewCandidate={fetchNewCandidate}
            />
          </div>
        );
      })}
    </div>
  );
}

export default CandidateListLayout;
