import { IStore } from '../../store/rootReducers';

export const rootStateWrap = (DOMAIN: string) => (state: Record<string, unknown>): IStore =>
  (({ [DOMAIN]: state } as unknown) as IStore);
