import React from 'react';

export const NotFound: React.SFC<{}> = (): JSX.Element => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body">
            <div className="main-error-wrapper  page page-h ">
              <h1 className="">
                400<span className="tx-20">error</span>
              </h1>
              <h2>Oopps. The page you were looking for doesn't exist.</h2>
              <h6>You may have mistyped the address or the page may have moved.</h6>
              <a className="btn btn-outline-indigo" href="/">
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
