import * as React from 'react';
import { Cursor } from '../../app/types';
import { CursorPagination } from '../CursorPagination';
import { DataNotFound } from '../DataNotFound';
import './styles.scss';
import { Spinner } from '../Spinner';

interface IProps {
  isMakingDataRequest: boolean;
  dataFetchingAction: (cursor: Cursor) => void;
  cursor: Cursor;
  emptyText: string;
}

export const RenderListData: React.SFC<IProps> = ({
  isMakingDataRequest,
  cursor,
  dataFetchingAction,
  children,
  emptyText,
}) => {
  let showSpinner = null;
  const childrenCount = React.Children.count(children);
  if (isMakingDataRequest && childrenCount === 0) {
    showSpinner = <Spinner />;
  }
  if (!isMakingDataRequest && childrenCount === 0) {
    return <DataNotFound emptyText={emptyText} />;
  }
  return (
    <>
      {showSpinner}
      {children}
      <CursorPagination
        cursor={cursor}
        fetchData={dataFetchingAction}
        isMakingDataRequest={isMakingDataRequest}
      />
    </>
  );
};
