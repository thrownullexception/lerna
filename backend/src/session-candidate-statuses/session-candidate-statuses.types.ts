export enum SessionCandidateStatusTypes {
  Sent = 'sent',
  Opened = 'opened',
  NoResponse = 'no_response',
  Rejected = 'rejected',
  Interested = 'interested',
  PassedQuiz = 'passed_quiz',
  FailedQuiz = 'failed_quiz',
  Selected = 'selected',
  AlreadyFilled = 'already_filled',
}

export const StatusesToReduceToAlreadyFilled = [
  SessionCandidateStatusTypes.PassedQuiz,
  SessionCandidateStatusTypes.Sent,
  SessionCandidateStatusTypes.Opened,
  SessionCandidateStatusTypes.Interested,
];

export const StatusesToReduceToNoResponse = [
  SessionCandidateStatusTypes.Sent,
  SessionCandidateStatusTypes.Opened,
  SessionCandidateStatusTypes.Interested,
];

// TODO When a session candidate is created then you will send a notification to the user
// about rhe session detaile and rhe no response duration
// Accpeted or Reject
// Once they accept then you ask them to take the questions
// Telling them the question duration, pass percenage and number of questions
// If they start the quiz
// Grade them
// If they fail/pass nofity srudent
// if fail/rejected/no_response then allow the student to add more candidate
// if pass quiz
// unlock their messaging && and the student should book a meeting
