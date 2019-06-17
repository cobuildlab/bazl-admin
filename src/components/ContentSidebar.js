import React from 'react';
import { MDBListGroup, MDBListGroupItem, MDBContainer } from 'mdbreact';
import { Link } from 'react-router-dom';
import { onLogout } from '../modules/landing/landing-actions';
import Logo from '../assets/img/Bazl-logo-w.png';
import { landingStore, LOGOUT_EVENT } from '../modules/landing/landing-store';
import PropTypes from 'prop-types';
import logouticon from '../assets/img/logout.png'

const ContentSidebar = ({ routes }) => {
  React.useEffect(() => {
    const logOutsubscription = landingStore.subscribe(LOGOUT_EVENT, () => {
      window.location.href = '/';
    });
    return () => {
      logOutsubscription.unsubscribe();
    };
  });

  function isCurrentRoute(pathname) {
    return pathname === window.location.pathname;
  }

  return (
    <MDBContainer className="p-0">
      <div className="pl-3 pb-4 pt-3">
        <img src={Logo} alt="Logo" width="140" />
      </div>
      <MDBListGroup>
        {routes.map(({ path, name, image, className }) => (
          <Link to={path} key={path}>
            <MDBListGroupItem href={null} active={isCurrentRoute(path)}>
              {image && (
                <img src={image} alt="icon" className="icon-list-item" />
              )}
              <span className={className}>{name}</span>
            </MDBListGroupItem>
          </Link>
        ))}
        <MDBListGroupItem
          color="info"
          active={false}
          className="link-logout text-left"
          onClick={onLogout}>
          < img src = {logouticon}
            alt = "icon"
            className = "icon-list-item" />
          <span>Log out</span>
        </MDBListGroupItem>
      </MDBListGroup>
    </MDBContainer>
  );
};

ContentSidebar.propTypes = {
  routes: PropTypes.array.isRequired,
};

export default ContentSidebar;
