import { Candidate, CandidateName } from "./CandidateType"

export const parseCandidate = (data: any): Candidate => {
  let gender = 'O';
  if (data.gender === 'male') {
    gender = 'M';
  } else if (data.gender === 'femail') {
    gender = 'F';
  }

  const candidate: Candidate = {
    uuid: data.login.uuid,
    gender: gender,
    name: {...data.name},
    email: data.email,
    phoneNumber: data.phone,
    thumbnail: data.picture.thumbnail,
    avatar: data.picture.large,
    status: null,
    comment: null,
  };

  return candidate;
};