export enum SessionStatusTypes {
  Initialized = 'initialized',
  Shortlisting = 'shortlisting',
  SelectedTutor = 'selected_tutor',
}

const StatusesToStopMailingStudentAboutNoResponse = [SessionStatusTypes.SelectedTutor];
