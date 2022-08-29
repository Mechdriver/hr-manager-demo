import { Candidate, CandidateName, CandidateStatus } from "./CandidateType"

export const parseCandidate = (data: any): Candidate => {
  let gender = 'O';
  if (data.gender === 'male') {
    gender = 'M';
  } else if (data.gender === 'female') {
    gender = 'F';
  }

  const candidate: Candidate = {
    uuid: data.login.uuid,
    gender: gender,
    name: {...data.name},
    email: data.email,
    phoneNumber: data.phone,
    avatar: data.picture.large,
    status: CandidateStatus.NONE,
    comment: '',
  };

  return candidate;
};