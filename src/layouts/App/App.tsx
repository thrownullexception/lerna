import * as React from 'react';
import { renderRoutes } from 'react-router-config';
import { ToastContainer } from 'react-toastify';
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import classnames from 'classnames';
import { useLocation } from 'react-router-dom';
import { appRoutes } from '../../routes/routes';
import { IProps } from './App.types';
import { NavigationMenu } from './components/NavigationMenu';
import { NavigationService } from '../../services';
import './style.scss';

const togglePreviousState = (prev: boolean) => !prev;

// const TitleAndActions: React.SFC<{}> = (): JSX.Element => {
//   const { pathname } = useLocation();
//   const currentRoute = routes.find(route => route.path === pathname);
//   if (currentRoute) {
//     const { title, actions = [] } = currentRoute;
//     return (
//       <h1 className="dt-page__title">
//         {title}
//         {actions.map(action => (
//           <a
//             href={NavigationService.hash(action.path)}
//             key={action.title}
//             className="btn btn-outline-info btn-xs pull-right"
//           >
//             <span className="dt-side-nav__text">{action.title}</span>
//           </a>
//         ))}
//       </h1>
//     );
//   }
//   return <h1 className="dt-page__title">Untitled</h1>;
// };

export const AppLayout: React.SFC<IProps> = ({
  doLogOut,
  username,
  permissions,
  role,
}): JSX.Element => {
  const [isNotificationDropDownOpen, setNotificationDropDownOpen] = React.useState(false);
  const [isAccountDropDownOpen, setAccountDropDownOpen] = React.useState(false);
  const [isMessagesDropDownOpen, setMessagesDropDownOpen] = React.useState(false);
  const [isAccountModeDropDownOpen, setAccountModeDropDownOpen] = React.useState(false);
  const [isSideBarOpen, setSideBarOpen] = React.useState(false);

  const toggleNotificationDropdown = () => setNotificationDropDownOpen(togglePreviousState);
  const toggleAccountDropDown = () => setAccountDropDownOpen(togglePreviousState);
  const toggleMessagesDropDown = () => setMessagesDropDownOpen(togglePreviousState);
  const toggleAccountModeDropDown = () => setAccountModeDropDownOpen(togglePreviousState);
  const toggleSideBarOpen = () => setSideBarOpen(togglePreviousState);

  const navClassName = classnames({
    'main-body app sidebar-mini sidebar-gone': true,
    'sidenav-toggled': isSideBarOpen,
  });

  return (
    <div className={navClassName}>
      <ToastContainer />
      <div id="global-loader" style={{ display: 'none' }}>
        <img src="../assets/img/loaders/loader-4.svg" className="loader-img" alt="Loader" />
      </div>
      <div className="app-sidebar__overlay" data-toggle="sidebar" />
      <aside className="main-sidebar app-sidebar sidebar-scroll ps ps--active-y">
        <div className="main-sidebar-header">
          <a className="desktop-logo logo-light active" href="index.html">
            <img src="../assets/img/brand/logo.png" alt="" className="main-logo" />
          </a>
          <a className="desktop-logo icon-logo active" href="index.html">
            <img src="../assets/img/brand/favicon.png" alt="" className="logo-icon" />
          </a>
          <a className="desktop-logo logo-dark active" href="index.html">
            <img
              src="../assets/img/brand/logo-white.png"
              className="main-logo dark-theme"
              alt="logo"
            />
          </a>
          <a className="logo-icon mobile-logo icon-dark active" href="index.html">
            <img
              src="../assets/img/brand/favicon-white.png"
              className="logo-icon dark-theme"
              alt="logo"
            />
          </a>
        </div>
        <div className="main-sidebar-loggedin">
          <div className="app-sidebar__user">
            <div className="dropdown user-pro-body text-center">
              <div className="user-pic">
                <img
                  src="../assets/img/faces/6.jpg"
                  alt="user-img"
                  className="rounded-circle mCS_img_loaded"
                />
              </div>
              <div className="user-info">
                <h6 className=" mb-0 text-dark">Petey Cruiser</h6>
                <span className="text-muted app-sidebar__user-name text-sm">Administrator</span>
              </div>
              <button className="btn btn-primary btn-block call-to-action">Consult A Tutor</button>
            </div>
          </div>
        </div>
        <div className="main-sidebar-body active">
          <ul className="side-menu ">
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Dashboard</span>
              </a>
            </li>
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Messages</span>
              </a>
            </li>
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Skills</span>
              </a>
            </li>
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Sessions</span>
              </a>
            </li>
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Payouts</span>
              </a>
            </li>
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Invoice</span>
              </a>
            </li>
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Transactions</span>
              </a>
            </li>
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Support</span>
              </a>
            </li>
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Reviews</span>
              </a>
            </li>
            <li className="slide">
              <a className="side-menu__item" href="/">
                <i className="side-menu__icon fe fe-airplay" />
                <span className="side-menu__label">Disputes</span>
              </a>
            </li>
          </ul>
        </div>
        <div className="ps__rail-x" style={{ left: '0px', top: '251px' }}>
          <div className="ps__thumb-x" tabIndex={0} style={{ left: '0px', width: '0px' }} />
        </div>
        <div className="ps__rail-y" style={{ top: '251px', height: '812px', right: '0px' }}>
          <div className="ps__thumb-y" tabIndex={0} style={{ top: '192px', height: '620px' }} />
        </div>
      </aside>

      <div className="main-content">
        <div className="main-header side-header">
          <div className="container-fluid">
            <div className="main-header-left ">
              <div className="app-sidebar__toggle mobile-toggle" data-toggle="sidebar">
                {isSideBarOpen ? (
                  <button className="link-like" onClick={toggleSideBarOpen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="eva eva-close-outline header-icons"
                    >
                      <g data-name="Layer 2">
                        <g data-name="close">
                          <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
                          <path d="M13.41 12l4.3-4.29a1 1 0 1 0-1.42-1.42L12 10.59l-4.29-4.3a1 1 0 0 0-1.42 1.42l4.3 4.29-4.3 4.29a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l4.29-4.3 4.29 4.3a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42z" />
                        </g>
                      </g>
                    </svg>
                  </button>
                ) : (
                  <button className="link-like" onClick={toggleSideBarOpen}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      className="eva eva-menu-outline header-icons"
                    >
                      <g data-name="Layer 2">
                        <g data-name="menu">
                          <rect width="24" height="24" transform="rotate(180 12 12)" opacity="0" />
                          <rect x="3" y="11" width="18" height="2" rx=".95" ry=".95" />
                          <rect x="3" y="16" width="18" height="2" rx=".95" ry=".95" />
                          <rect x="3" y="6" width="18" height="2" rx=".95" ry=".95" />
                        </g>
                      </g>
                    </svg>
                  </button>
                )}
              </div>
              <div className="responsive-logo">
                <a href="index.html">
                  <img src="../assets/img/brand/logo-white.png" alt="" className="logo-1" />
                </a>
                <a href="index.html">
                  <img src="../assets/img/brand/logo.png" alt="" className="logo-11" />
                </a>
                <a href="index.html">
                  <img src="../assets/img/brand/favicon-white.png" alt="" className="logo-2" />
                </a>
                <a href="index.html">
                  <img src="../assets/img/brand/favicon.png" alt="" className="logo-12" />
                </a>
              </div>
              <ul className="header-megamenu-dropdown  nav">
                <li className="nav-item">
                  <Dropdown
                    isOpen={isAccountModeDropDownOpen}
                    toggle={toggleAccountModeDropDown}
                    tag="div"
                    className="dropdown-menu-rounded btn-group dropdown"
                  >
                    <DropdownToggle tag="button" className="btn btn-link dropdown-toggle">
                      <span>
                        <i className="nav-link-icon fe fe-briefcase" /> Tutor
                      </span>
                    </DropdownToggle>
                    <DropdownMenu left={true} className="dropdown-menu-lg dropdown-menu">
                      <div className="dropdown-menu-header">
                        <div className="dropdown-menu-header-inner header-img p-3">
                          <div className="header-content text-left d-flex">
                            <div className="text-white">
                              <h5 className="menu-header-title">Projects</h5>
                              <h6 className="menu-header-subtitle mb-0">Overview of Projects</h6>
                            </div>
                            <div className="my-auto ml-auto">
                              <span className="badge badge-pill badge-warning float-right">
                                View all
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <button className="link-like dropdown-item  mt-2">
                        <i className="dropdown-icon" />
                        Tutor
                      </button>
                      <button className="link-like dropdown-item">
                        <i className="dropdown-icon" />
                        Student
                      </button>
                    </DropdownMenu>
                  </Dropdown>
                </li>
              </ul>
            </div>
            <div className="main-header-right">
              <div className="nav nav-item  navbar-nav-right ml-auto">
                <Dropdown
                  isOpen={isMessagesDropDownOpen}
                  toggle={toggleMessagesDropDown}
                  tag="div"
                  className="dropdown nav-item main-header-message "
                >
                  <DropdownToggle tag="a" className="new nav-link cursor">
                    <i className="fe fe-mail" />
                    <span className=" pulse-danger" />
                  </DropdownToggle>
                  <DropdownMenu right={true} className="dropdown-menu">
                    <div className="menu-header-content bg-primary-gradient text-left d-flex">
                      <div className="">
                        <h6 className="menu-header-title text-white mb-0">5 new Messages</h6>
                      </div>
                      <div className="my-auto ml-auto">
                        <button className="link-like badge badge-pill badge-warning float-right">
                          Mark All Read
                        </button>
                      </div>
                    </div>
                    <div className="main-message-list chat-scroll ps">
                      <a href="/" className="p-3 d-flex border-bottom">
                        <div
                          className="  drop-img  cover-image  "
                          data-image-src="../assets/img/faces/3.jpg"
                          style={{
                            background: "url('../assets/img/faces/3.jpg') center center;",
                          }}
                        >
                          <span className="avatar-status bg-teal" />
                        </div>
                        <div className="wd-90p">
                          <div className="d-flex">
                            <h5 className="mb-1 name">Paul Molive</h5>
                            <p className="time mb-0 text-right ml-auto float-right">10 min ago</p>
                          </div>
                          <p className="mb-0 desc">I'm sorry but i'm not sure how...</p>
                        </div>
                      </a>
                      <a href="/" className="p-3 d-flex border-bottom">
                        <div
                          className="drop-img cover-image"
                          data-image-src="../assets/img/faces/2.jpg"
                          style={{
                            background: "url('../assets/img/faces/2.jpg') center center;",
                          }}
                        >
                          <span className="avatar-status bg-teal" />
                        </div>
                        <div className="wd-90p">
                          <div className="d-flex">
                            <h5 className="mb-1 name">Sahar Dary</h5>
                            <p className="time mb-0 text-right ml-auto float-right">13 min ago</p>
                          </div>
                          <p className="mb-0 desc">All set ! Now, time to get to you now......</p>
                        </div>
                      </a>
                      <a href="/" className="p-3 d-flex border-bottom">
                        <div
                          className="drop-img cover-image"
                          data-image-src="../assets/img/faces/9.jpg"
                          style={{
                            background: "url('../assets/img/faces/9.jpg') center center;",
                          }}
                        >
                          <span className="avatar-status bg-teal" />
                        </div>
                        <div className="wd-90p">
                          <div className="d-flex">
                            <h5 className="mb-1 name">Khadija Mehr</h5>
                            <p className="time mb-0 text-right ml-auto float-right">20 min ago</p>
                          </div>
                          <p className="mb-0 desc">Are you ready to pickup your Delivery...</p>
                        </div>
                      </a>
                      <a href="/" className="p-3 d-flex border-bottom">
                        <div
                          className="drop-img cover-image"
                          data-image-src="../assets/img/faces/12.jpg"
                          style={{
                            background: "url('../assets/img/faces/12.jpg';) center center;",
                          }}
                        >
                          <span className="avatar-status bg-danger" />
                        </div>
                        <div className="wd-90p">
                          <div className="d-flex">
                            <h5 className="mb-1 name">Barney Cull</h5>
                            <p className="time mb-0 text-right ml-auto float-right">30 min ago</p>
                          </div>
                          <p className="mb-0 desc">Here are some products ...</p>
                        </div>
                      </a>
                      <a href="/" className="p-3 d-flex border-bottom">
                        <div
                          className="drop-img cover-image"
                          data-image-src="../assets/img/faces/5.jpg"
                          style={{
                            background: "url('../assets/img/faces/5.jpg') center center;",
                          }}
                        >
                          <span className="avatar-status bg-teal" />
                        </div>
                        <div className="wd-90p">
                          <div className="d-flex">
                            <h5 className="mb-1 name">Petey Cruiser</h5>
                            <p className="time mb-0 text-right ml-auto float-right">35 min ago</p>
                          </div>
                          <p className="mb-0 desc">I'm sorry but i'm not sure how...</p>
                        </div>
                      </a>
                      <div className="ps__rail-x" style={{ left: '0px; top: 0px;' }}>
                        <div
                          className="ps__thumb-x"
                          tabIndex={0}
                          style={{ left: '0px', width: '0px' }}
                        />
                      </div>
                      <div className="ps__rail-y" style={{ top: '0px', right: '0px' }}>
                        <div
                          className="ps__thumb-y"
                          tabIndex={0}
                          style={{ top: '0px', height: '0px' }}
                        />
                      </div>
                    </div>
                    <div className="text-center dropdown-footer">
                      <a href="/">VIEW ALL</a>
                    </div>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  isOpen={isNotificationDropDownOpen}
                  toggle={toggleNotificationDropdown}
                  tag="div"
                  className="dropdown nav-item main-header-notification "
                >
                  <DropdownToggle tag="a" className="new nav-link cursor">
                    <i className="fe fe-bell" />
                    <span className=" pulse" />
                  </DropdownToggle>
                  <DropdownMenu right={true} className="dropdown-menu">
                    <div className="menu-header-content bg-primary-gradient text-left d-flex">
                      <div className="">
                        <h6 className="menu-header-title text-white mb-0">7 new Notifications</h6>
                      </div>
                      <div className="my-auto ml-auto">
                        <button className="link-like badge badge-pill badge-warning float-right">
                          Mark All Read
                        </button>
                      </div>
                    </div>
                    <div className="main-notification-list Notification-scroll ps">
                      <a className="d-flex p-3 border-bottom" href="/">
                        <div className="notifyimg bg-success-transparent">
                          <i className="la la-shopping-basket text-success" />
                        </div>
                        <div className="ml-3">
                          <h5 className="notification-label mb-1">New Order Received</h5>
                          <div className="notification-subtext">1 hour ago</div>
                        </div>
                        <div className="ml-auto">
                          <i className="las la-angle-right text-right text-muted" />
                        </div>
                      </a>
                      <a className="d-flex p-3 border-bottom" href="/">
                        <div className="notifyimg bg-danger-transparent">
                          <i className="la la-user-check text-danger" />
                        </div>
                        <div className="ml-3">
                          <h5 className="notification-label mb-1">22 verified registrations</h5>
                          <div className="notification-subtext">2 hour ago</div>
                        </div>
                        <div className="ml-auto">
                          <i className="las la-angle-right text-right text-muted" />
                        </div>
                      </a>
                      <a className="d-flex p-3 border-bottom" href="/">
                        <div className="notifyimg bg-primary-transparent">
                          <i className="la la-check-circle text-primary" />
                        </div>
                        <div className="ml-3">
                          <h5 className="notification-label mb-1">Project has been approved</h5>
                          <div className="notification-subtext">4 hour ago</div>
                        </div>
                        <div className="ml-auto">
                          <i className="las la-angle-right text-right text-muted" />
                        </div>
                      </a>
                      <a className="d-flex p-3 border-bottom" href="/">
                        <div className="notifyimg bg-pink-transparent">
                          <i className="la la-file-alt text-pink" />
                        </div>
                        <div className="ml-3">
                          <h5 className="notification-label mb-1">New files available</h5>
                          <div className="notification-subtext">10 hour ago</div>
                        </div>
                        <div className="ml-auto">
                          <i className="las la-angle-right text-right text-muted" />
                        </div>
                      </a>
                      <a className="d-flex p-3 border-bottom" href="/">
                        <div className="notifyimg bg-warning-transparent">
                          <i className="la la-envelope-open text-warning" />
                        </div>
                        <div className="ml-3">
                          <h5 className="notification-label mb-1">New review received</h5>
                          <div className="notification-subtext">1 day ago</div>
                        </div>
                        <div className="ml-auto">
                          <i className="las la-angle-right text-right text-muted" />
                        </div>
                      </a>
                      <a className="d-flex p-3" href="/">
                        <div className="notifyimg bg-purple-transparent">
                          <i className="la la-gem text-purple" />
                        </div>
                        <div className="ml-3">
                          <h5 className="notification-label mb-1">Updates Available</h5>
                          <div className="notification-subtext">2 days ago</div>
                        </div>
                        <div className="ml-auto">
                          <i className="las la-angle-right text-right text-muted" />
                        </div>
                      </a>
                      <div className="ps__rail-x" style={{ left: '0px; top: 0px;' }}>
                        <div
                          className="ps__thumb-x"
                          tabIndex={0}
                          style={{ left: '0px', width: '0px' }}
                        />
                      </div>
                      <div className="ps__rail-y" style={{ top: '0px', right: '0px' }}>
                        <div
                          className="ps__thumb-y"
                          tabIndex={0}
                          style={{ top: '0px', height: '0px' }}
                        />
                      </div>
                    </div>
                    <div className="dropdown-footer">
                      <a href="/">VIEW ALL</a>
                    </div>
                  </DropdownMenu>
                </Dropdown>
                <Dropdown
                  isOpen={isAccountDropDownOpen}
                  toggle={toggleAccountDropDown}
                  tag="div"
                  className="dropdown main-profile-menu nav nav-item nav-link"
                >
                  <DropdownToggle tag="a" className="profile-user d-flex">
                    <img
                      src="../assets/img/faces/6.jpg"
                      alt="user-img"
                      className="rounded-circle mCS_img_loaded"
                    />
                  </DropdownToggle>
                  <DropdownMenu right={true} className="dropdown-menu">
                    <div className="main-header-profile header-img">
                      <div className="main-img-user">
                        <img alt="" src="../assets/img/faces/6.jpg" />
                      </div>
                      <h6>Petey Cruiser</h6>
                      <span>Premium Member</span>
                    </div>
                    <a className="dropdown-item" href="/">
                      <i className="far fa-user" /> My Profile
                    </a>
                    <a className="dropdown-item" href="/">
                      <i className="far fa-edit" /> Edit Profile
                    </a>
                    <a className="dropdown-item" href="/">
                      <i className="far fa-clock" /> Activity Logs
                    </a>
                    <a className="dropdown-item" href="/">
                      <i className="fas fa-sliders-h" /> Account Settings
                    </a>
                    <a className="dropdown-item" href="page-signin.html">
                      <i className="fas fa-sign-out-alt" />
                      Sign Out
                    </a>
                  </DropdownMenu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>

        <div className="container-fluid">
          <div className="breadcrumb-header justify-content-between">
            <div>
              <h4 className="content-title mb-2">Hi, welcome back!</h4>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="breadcrumb-item active" aria-current="page">
                    Faqs
                  </li>
                </ol>
              </nav>
            </div>
            <div className="d-flex my-auto">
              <div className=" d-flex right-page">
                <div className="d-flex justify-content-center mr-5">
                  <div className="">
                    <span className="d-block">
                      <span className="label ">EXPENSES</span>
                    </span>
                    <span className="value"> $53,000 </span>
                  </div>
                  <div className="ml-3 mt-2">
                    <span className="sparkline_bar">
                      <canvas
                        width={52}
                        height={30}
                        style={{
                          display: 'inline-block',
                          width: '52px',
                          height: '30px',
                          verticalAlign: 'top',
                        }}
                      />
                    </span>
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <div className="">
                    <span className="d-block">
                      <span className="label">PROFIT</span>
                    </span>
                    <span className="value"> $34,000 </span>
                  </div>
                  <div className="ml-3 mt-2">
                    <span className="sparkline_bar31">
                      <canvas
                        width={52}
                        height={30}
                        style={{
                          display: 'inline-block',
                          width: '52px',
                          height: '30px',
                          verticalAlign: 'top',
                        }}
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {renderRoutes(appRoutes)}
        </div>
      </div>
      <a href="#top" id="back-to-top" style={{ display: 'none' }}>
        <i className="las la-angle-double-up" />
      </a>
    </div>
  );
};
