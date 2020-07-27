import { createSlice } from '@reduxjs/toolkit';

const DOMAIN = 'requestStatus';

const initial = {
  isMakingFormRequest: false,
  isMakingDataRequest: false,
};

export const requestStatusSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    formRequestStarted: state => {
      state.isMakingFormRequest = true;
    },
    formRequestEnded: state => {
      state.isMakingFormRequest = false;
    },
    dataRequestStarted: state => {
      state.isMakingDataRequest = true;
    },
    dataRequestEnded: state => {
      state.isMakingDataRequest = false;
    },
  },
});
