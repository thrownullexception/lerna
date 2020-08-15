import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { IStore } from '../store/rootReducers';

export type ThunkInterface<R> = ThunkAction<R, IStore, void, Action>;
export type IThunkDispatch = ThunkDispatch<IStore, void, Action>;

export interface FormProps<T> {
  onSubmit: (arg0: T) => void;
  initialValues?: Partial<T>;
  isMakingRequest: boolean;
}

interface ITransformationObject {
  text: string;
  value: string;
  color?: string;
}

export interface ITransformation {
  [key: string]: ITransformationObject[];
}
