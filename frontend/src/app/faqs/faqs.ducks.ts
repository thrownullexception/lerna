import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FaqResponse } from './responses';

const DOMAIN = 'faqs';

interface IState {
  faqs: FaqResponse[];
}

const initial: IState = {
  faqs: [],
};

export const faqsSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    setFaqs: (state, { payload }: PayloadAction<FaqResponse[]>) => {
      state.faqs = payload;
    },
  },
});
