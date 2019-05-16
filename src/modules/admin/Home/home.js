import React from "react";
import SidebarComponent from "../../../components/SidebarComponent";

class HomeScreen extends React.Component {
  render() {
    return (
      <React.Fragment>
        <SidebarComponent>
          <h1>Home</h1>
        </SidebarComponent>
      </React.Fragment>
    );
  }
}

export default HomeScreen;
