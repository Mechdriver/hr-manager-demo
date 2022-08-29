import { useState } from "react";
import Image from "next/image";
import { Candidate, CandidateStatus } from "../types/CandidateType";
import styles from "../styles/Candidate.module.css";
import { useRecoilState } from "recoil";
import { candidateHistoryListState } from "../stores/CandidateStore";
import { replaceItemAtIndex } from "../stores/utils";

type CandidateCardPropsType = {
  candidate: Candidate;
  setCandidate: (candidate: Candidate | null) => void;
  newCandidate?: boolean;
};

function CandidateCard({
  candidate,
  setCandidate,
  newCandidate,
}: CandidateCardPropsType) {
  const [comment, setComment] = useState<string | null>(candidate.comment);
  const [candidateHistoryList, setCandidateHistoryList] = useRecoilState(
    candidateHistoryListState
  );

  const onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.currentTarget.value);
  };

  const replaceCandidateWithStatus = (status: CandidateStatus | null) => {
    const index = candidateHistoryList.findIndex(
      (oldCandidate: Candidate) => oldCandidate.uuid === candidate.uuid
    );

    const newList = replaceItemAtIndex(candidateHistoryList, index, {
      ...candidate,
      status: status,
      comment: comment,
    });
    setCandidateHistoryList(newList);
  };

  const onAccept = () => {
    if (newCandidate) {
      candidate.status = CandidateStatus.ACCEPTED;
      candidate.comment = comment;
      setCandidateHistoryList([candidate, ...candidateHistoryList]);
      setCandidate(null);
    } else {
      replaceCandidateWithStatus(CandidateStatus.ACCEPTED);
    }
  };

  const onReject = () => {
    if (newCandidate) {
      candidate.status = CandidateStatus.REJECTED;
      candidate.comment = comment;
      setCandidateHistoryList([candidate, ...candidateHistoryList]);
      setCandidate(null);
    } else {
      replaceCandidateWithStatus(CandidateStatus.REJECTED);
    }
  };

  const onUndo = () => {
    replaceCandidateWithStatus(null);
  };

  return (
    <div className={styles.card}>
      <div className={styles.cardBody}>
        <Image src={candidate.avatar} width="60" height="60" />
        <div className={styles.cardTextContainer}>
          <div>{`${candidate.name.first} ${candidate.name.last}`}</div>
          <div>{candidate.email}</div>
          <div>{candidate.phoneNumber}</div>
        </div>
      </div>
      {candidate.status === null && (
        <div>
          <textarea
            className={styles.cardInput}
            rows={5}
            onChange={onCommentChange}
            placeholder="Enter a comment... (optional)"
            value={comment || ""}
          />
        </div>
      )}
      {candidate.status !== null && candidate.comment && (
        <div className={styles.cardCommentArea}>{candidate.comment}</div>
      )}
      <div className={styles.cardButtonContainer}>
        {candidate.status === null && (
          <>
            <button className={styles.acceptButton} onClick={onAccept}>
              Accept
            </button>
            <button className={styles.rejectButton} onClick={onReject}>
              Reject
            </button>
          </>
        )}
        {candidate.status !== null && (
          <button className={styles.undoButton} onClick={onUndo}>
            Undo
          </button>
        )}
      </div>
    </div>
  );
}

export default CandidateCard;
