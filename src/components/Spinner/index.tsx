import * as React from 'react';

interface IProps {
  isFetching: boolean;
}

export const Spinner: React.SFC<IProps> = ({ isFetching, children }) => {
  if (isFetching) {
    return (
      <div className="dt-loader-container">
        <div className="dt-loader">
          <svg className="circular" viewBox="25 25 50 50">
            <circle
              className="path"
              cx="50"
              cy="50"
              r="20"
              fill="none"
              strokeWidth="2"
              strokeMiterlimit="10"
            />
          </svg>
        </div>
      </div>
    );
  }
  return <>{children}</>;
};
