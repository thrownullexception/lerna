export enum SessionCandidateStatusTypes {
  Sent = 'sent',
  Opened = 'opened',
  NoResponse = 'no_response', // from sent
  Rejected = 'rejected',
  Interested = 'interested',
  TakingQuiz = 'taking_quiz',
  PassedQuiz = 'passed_quiz',
  FailedQuiz = 'failed_quiz',
}
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
