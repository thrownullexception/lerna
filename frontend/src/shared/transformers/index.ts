import { SystemValueResponse, DataListResponse } from '../responses';
import { ISelectData } from '../../components/RenderInput';

export const transformSystemValuesToSelectData = (data: SystemValueResponse[]): ISelectData[] => {
  return data.map(({ systemName, displayName }) => ({ value: systemName, label: displayName }));
};

export const transformDataToSelectData = (data: DataListResponse[]): ISelectData[] => {
  return data.map(({ id, name }) => ({ value: id, label: name }));
};
