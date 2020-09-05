import * as React from 'react';
import './styles.scss';

export const Spinner: React.SFC<{}> = () => {
  return (
    <div className="text-center">
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};
