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
      <div>
        <img src={Logo} alt="Logo" />
      </div>
      <MDBListGroup>
        {routes.map(({ path, name, image, className }) => (
          <Link to={path} key={path}>
            <MDBListGroupItem href={null} active={isCurrentRoute(path)}>
              {image && <img src={image} alt="icon" />}
              <span className={className}>{name}</span>
            </MDBListGroupItem>
          </Link>
        ))}
      </MDBListGroup>
    </MDBContainer>
  );
};

export default ContentSidebar;
