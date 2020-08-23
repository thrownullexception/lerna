import * as React from 'react';
import { Cursor } from '../../app/types';
import classnames from 'classnames';

interface IProps {
  cursor: Cursor;
  fetchData: (cursor: Cursor) => void;
}

export const CursorPagination: React.SFC<IProps> = ({
  cursor: { beforeCursor, afterCursor },
  fetchData,
}) => {
  return (
    <ul className="pagination  mt-3 justify-content-center">
      <li className="page-item">
        <button
          className={classnames({
            'page-link': true,
            'font-weight-bold': beforeCursor,
          })}
          disabled={!beforeCursor}
          onClick={() => {
            fetchData({
              beforeCursor,
            });
          }}
        >
          Previous
        </button>
      </li>
      <li className="page-item">
        <button
          className={classnames({
            'page-link': true,
            'font-weight-bold': afterCursor,
          })}
          disabled={!afterCursor}
          onClick={() => {
            fetchData({
              afterCursor,
            });
          }}
        >
          Next
        </button>
      </li>
    </ul>
  );
};
