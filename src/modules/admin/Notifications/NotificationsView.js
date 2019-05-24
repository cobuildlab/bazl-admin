import React from "react";
import { Link } from "react-router-dom";
import { MDBIcon } from "mdbreact";
import SidebarComponent from "../../../components/SidebarComponent";

class NotificationsView extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <div className="d-flex justify-content-between nav-admin body">
            <div>
              <h2 className="m-0">Notification</h2>
            </div>
            <div>
              <Link
                to="/new-product"
                className="btn btn-circle btn-circle-link"
              >
                Upload <MDBIcon icon="upload" className="ml-1" />
              </Link>
            </div>
          </div>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default NotificationsView;
