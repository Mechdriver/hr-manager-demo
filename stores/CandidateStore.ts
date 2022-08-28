import {atom} from 'recoil';
import { Candidate } from '../types/CandidateType';

export const candidateHistoryListState = atom({
  key: 'CandidateHistoryList',
  default: [] as Candidate[],
});