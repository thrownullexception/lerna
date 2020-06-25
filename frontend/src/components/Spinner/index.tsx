import * as React from 'react';
import './styles.scss';

interface IProps {
  isFetching: boolean;
}

export const Spinner: React.SFC<IProps> = ({ isFetching, children }) => {
  // if (isFetching) {
  //   return (
  //     <div className="text-center spinner-container">
  //       <div className="spinner-grow" role="status">
  //         <span className="sr-only">Loading</span>
  //       </div>
  //       {children}
  //     </div>
  //   );
  // }
  return <>{children}</>;
};
