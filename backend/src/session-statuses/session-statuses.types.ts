export enum SessionStatusTypes {
  Initialized = 'initialized',
  Shortlisting = 'shortlisting',
  SelectedTutor = 'selected_tutor',
}

export const StatusesToStopMailingStudentAboutNoResponse = [SessionStatusTypes.SelectedTutor];
