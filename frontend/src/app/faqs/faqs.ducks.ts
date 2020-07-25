// import { createSlice, PayloadAction, configureStore, combineReducers } from '@reduxjs/toolkit';
// import { FaqResponse } from './responses';
// import { IFaqState, FaqsActionType, ActionType } from './faqs.types';

// const initial: IFaqState = {
//   faqs: [],
//   faq: new FaqResponse({}),
//   isFetching: false,
// };

// const faqsSlice = createSlice({
//   name: 'faqs',
//   initialState: initial,
//   reducers: {
//     setFaqs: (state, { payload }: PayloadAction<FaqResponse[]>) => {
//       state.faqs = payload;
//     },
//   },
// });

// const reducer = combineReducers({
//   faqs: faqsSlice.reducer,
// });

// export const store = configureStore({
//   reducer,
// });

export const kiss = 'foo';
