import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AccountModeType } from './auth.types';
import { SignInResponse } from './responses';

const DOMAIN = 'auth';

interface IState {
  isAuthenticated: boolean;
  accountMode: AccountModeType;
  email: string;
  id: string;
  profile: {
    lastName: string;
    firstName: string;
    picture: string;
  };
  role: string;
}

const initial: IState = {
  isAuthenticated: false,
  accountMode: AccountModeType.Student,
  email: '',
  id: '',
  profile: {
    lastName: '',
    firstName: '',
    picture: '',
  },
  role: '',
};

export const authSlice = createSlice({
  name: DOMAIN,
  initialState: initial,
  reducers: {
    authenticateUser: (state, { payload }: PayloadAction<SignInResponse>) => {
      const { lastName, firstName, email, id, accountMode, picture } = payload;
      state.isAuthenticated = true;
      state.id = id;
      state.email = email;
      state.accountMode = accountMode;
      state.profile = { firstName, lastName, picture };
    },
    setSignUpCredentials: (state, { payload }: PayloadAction<{ id: string; email: string }>) => {
      state.id = payload.id;
      state.email = payload.email;
    },
    changeAccountMode: (state, { payload }: PayloadAction<AccountModeType>) => {
      state.accountMode = payload;
    },
    logOut: state => {
      state.isAuthenticated = false;
    },
  },
});
