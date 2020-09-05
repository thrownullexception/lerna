import * as React from 'react';

export const DataNotFound: React.SFC<{ emptyText: string }> = ({ emptyText }) => {
  return (
    <div className="card">
      <div className="card-body text-center">
        <h4 className="card-title mb-0">{emptyText}</h4>
      </div>
    </div>
  );
};
