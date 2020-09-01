import React, { useState } from 'react';
import classnames from 'classnames';
import { Cursor } from '../../app/types';
import './styles.scss';

interface IProps {
  cursor: Cursor;
  isMakingDataRequest: boolean;
  fetchData: (cursor: Cursor) => void;
}

enum PaginationButtons {
  Left = 'Previous',
  Right = 'Next',
}

export const CursorPagination: React.SFC<IProps> = ({
  cursor: { beforeCursor, afterCursor },
  isMakingDataRequest,
  fetchData,
}) => {
  const [buttonClicked, setButtonClicked] = useState<PaginationButtons | null>(null);

  if (!(beforeCursor || afterCursor)) {
    return null;
  }

  const renderPaginationButton = (
    cursorString: string | undefined,
    cursor: Cursor,
    paginationButton: PaginationButtons,
  ) => {
    const isLoading = isMakingDataRequest && buttonClicked === paginationButton;
    const disableButton = isLoading || !cursorString;
    return (
      <li className="page-item">
        <button
          className={classnames({
            'page-link': true,
            'cursor-pagination__disabled': disableButton,
          })}
          disabled={disableButton}
          onClick={() => {
            setButtonClicked(paginationButton);
            fetchData(cursor);
          }}
        >
          {isLoading ? 'Loading...' : paginationButton}
        </button>
      </li>
    );
  };

  return (
    <ul className="pagination  mt-3 justify-content-center">
      {renderPaginationButton(beforeCursor, { beforeCursor }, PaginationButtons.Left)}
      {renderPaginationButton(afterCursor, { afterCursor }, PaginationButtons.Right)}
    </ul>
  );
};
