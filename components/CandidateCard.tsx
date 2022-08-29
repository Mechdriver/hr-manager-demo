import { useState } from "react";
import Image from "next/image";
import { Candidate, CandidateStatus } from "../types/CandidateType";
import styles from "../styles/Candidate.module.css";
import { useRecoilState } from "recoil";
import { candidateHistoryListState } from "../stores/CandidateStore";
import { replaceItemAtIndex } from "../stores/utils";

type CandidateCardPropsType = {
  candidate: Candidate;
  fetchNewCandidate: () => void;
  isNewCandidate?: boolean;
};

function CandidateCard({
  candidate,
  fetchNewCandidate,
  isNewCandidate,
}: CandidateCardPropsType) {
  const [comment, setComment] = useState<string>(candidate.comment);
  const [candidateHistoryList, setCandidateHistoryList] = useRecoilState(
    candidateHistoryListState
  );

  const onCommentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.currentTarget.value);
  };

  const replaceCandidateWithStatus = (status: CandidateStatus) => {
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
    if (isNewCandidate) {
      setCandidateHistoryList([
        { ...candidate, status: CandidateStatus.ACCEPTED, comment: comment },
        ...candidateHistoryList,
      ]);
      setComment("");
      fetchNewCandidate();
    } else {
      replaceCandidateWithStatus(CandidateStatus.ACCEPTED);
    }
  };

  const onReject = () => {
    if (isNewCandidate) {
      setCandidateHistoryList([
        { ...candidate, status: CandidateStatus.REJECTED, comment: comment },
        ...candidateHistoryList,
      ]);
      setComment("");
      fetchNewCandidate();
    } else {
      replaceCandidateWithStatus(CandidateStatus.REJECTED);
    }
  };

  const onUndo = () => {
    replaceCandidateWithStatus(CandidateStatus.NONE);
  };

  return (
    <div data-testid={'candidate-card'} className={styles.card}>
      <div className={styles.cardBody}>
        <Image src={candidate.avatar} width="60" height="60" />
        <div className={styles.cardTextContainer}>
          <div>{`${candidate.name.first} ${candidate.name.last} (${candidate.gender})`}</div>
          <div>{candidate.email}</div>
          <div>{candidate.phoneNumber}</div>
        </div>
      </div>
      {candidate.status === CandidateStatus.NONE && (
        <div className={styles.cardTextArea}>
          <textarea
            className={styles.cardInput}
            rows={5}
            onChange={onCommentChange}
            placeholder="Enter a comment... (optional)"
            value={comment || ""}
          />
        </div>
      )}
      {candidate.status !== CandidateStatus.NONE && (
        <div
          className={
            `${styles.cardStatusText}` +
            ` ${
              candidate.status === CandidateStatus.ACCEPTED
                ? styles.accepted
                : styles.rejected
            }`
          }
        >
          {candidate.status === CandidateStatus.ACCEPTED
            ? "Accepted"
            : "Rejected"}
        </div>
      )}
      {candidate.status !== CandidateStatus.NONE &&
        candidate.comment.length > 0 && (
          <div className={styles.cardCommentArea}>{candidate.comment}</div>
        )}
      <div className={styles.cardButtonContainer}>
        {candidate.status === CandidateStatus.NONE && (
          <>
            <button
              data-testid="accept-button"
              className={`${styles.cardButton} ${styles.accept}`}
              onClick={onAccept}
            >
              Accept
            </button>
            <button
              data-testid="reject-button"
              className={`${styles.cardButton} ${styles.reject}`}
              onClick={onReject}
            >
              Reject
            </button>
          </>
        )}
        {candidate.status !== CandidateStatus.NONE && (
          <button
            data-testid="undo-button"
            className={`${styles.cardButton} ${styles.undo}`}
            onClick={onUndo}
          >
            Undo
          </button>
        )}
      </div>
    </div>
  );
}

export default CandidateCard;
