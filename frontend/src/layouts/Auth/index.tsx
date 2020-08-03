import React from 'react';
import { renderRoutes } from 'react-router-config';
import { ToastContainer } from 'react-toastify';
import { AuthRoutes } from '../../screens/Auth';

export const AuthLayout: React.SFC<{}> = (): JSX.Element => {
  return (
    <div className="main-body">
      <div className="my-auto page page-h">
        <ToastContainer />
        <div className="main-signin-wrapper">
          <div className="main-card-signin d-md-flex wd-100p">
            <div className="wd-md-50p login d-none d-md-block page-signin-style p-5 text-white">
              <div className="my-auto authentication-pages">
                <div>
                  {' '}
                  <img src="/static/images/logo-white.png" className=" m-0 mb-4" alt="logo" />
                  <h5 className="mb-4">Responsive Modern Dashboard &amp; Admin Template</h5>
                  <p className="mb-5">
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem
                    Ipsum has been the industry's standard dummy text ever since the 1500s, when an
                    unknown printer took a galley of type and scrambled it to make a type specimen
                    book. It has survived not only five centuries, but also the leap into electronic
                    typesetting
                  </p>
                  <a href="index.html" className="btn btn-success">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            {renderRoutes(AuthRoutes)}
          </div>
        </div>
      </div>
    </div>
  );
};
