import { atom } from "recoil";
import { Candidate } from "../types/CandidateType";

const sessionStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const { sessionStorage } = window;
    const savedValue = sessionStorage.getItem(key);
    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: Candidate, _: any, isReset: boolean) => {
      isReset
        ? sessionStorage.removeItem(key)
        : sessionStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const candidateHistoryListState = atom({
  key: "CandidateHistoryList",
  default: [] as Candidate[],
  effects: [sessionStorageEffect("candidate_history_list")],
});
