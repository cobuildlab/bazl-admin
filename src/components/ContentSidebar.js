import React from "react";
import { MDBListGroup, MDBListGroupItem, MDBContainer } from "mdbreact";
import { Link } from "react-router-dom";

import Logo from "../assets/img/Bazl-logo-w.png";

const ContentSidebar = ({ routes }) => {
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
      </MDBListGroup>
      <Link to="/" className="link-logout">
        Go Out
      </Link>
    </MDBContainer>
  );
};

export default ContentSidebar;
