export type Candidate = {
  uuid: string;
  gender: string;
  name: CandidateName;
  email: string;
  phoneNumber: string,
  thumbnail: string;
  avatar: string;
  status: CandidateStatus | null,
  comment: string | null,
};

export type CandidateName = {
  title: string,
  first: string,
  last: string,
};

export enum CandidateStatus {
  REJECTED = 0,
  ACCEPTED = 1,
}