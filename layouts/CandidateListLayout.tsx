import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import CandidateCard from "../components/CandidateCard";
import { dummyData } from "../dummy_data";
import { candidateHistoryListState } from "../stores/CandidateStore";
import { Candidate } from "../types/CandidateType";
import { parseCandidate } from "../types/utils";

function CandidateListLayout() {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const candidateHistory = useRecoilValue(candidateHistoryListState);

  useEffect(() => {
    const parsed: Candidate = parseCandidate(dummyData.results[0]);
    setCandidate(parsed);
    /*
    fetch("https://randomuser.me/api/")
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });*/
  }, []);

  if (!candidate) {
    return <div>Where data</div>;
  }

  return (
    <div>
      <CandidateCard candidate={candidate} />
    </div>
  );
}

export default CandidateListLayout;
