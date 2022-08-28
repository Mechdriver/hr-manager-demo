import Image from 'next/image'
import { Candidate } from '../types/CandidateType';

type CandidateCardPropsType = {
  candidate: Candidate;
};

function CandidateCard({candidate}: CandidateCardPropsType) {
  return (
    <div>
      {`${candidate.name.first} ${candidate.name.last}`}
    </div>
  );
}

export  default CandidateCard;
