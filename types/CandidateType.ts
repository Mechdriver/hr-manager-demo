export type Candidate = {
  uuid: string;
  gender: string;
  name: CandidateName;
  email: string;
  phoneNumber: string,
  avatar: string;
  status: CandidateStatus,
  comment: string,
};

export type CandidateName = {
  title: string,
  first: string,
  last: string,
};

export enum CandidateStatus {
  NONE = 0,
  REJECTED = 1,
  ACCEPTED = 2,
}