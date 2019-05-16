import React from "react";
import Sidebar from "react-sidebar";
import ContentSidebar from "./ContentSidebar";
import HomeIcon from "../assets/img/home.png";
import ProfileIcon from "../assets/img/profile.png";
import SalesIcon from "../assets/img/cart.png";
import NotificationIcon from "../assets/img/notifications.png";
import InvetoryIcon from "../assets/img/invetory.png";

const mql = window.matchMedia(`(min-width: 800px)`);

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    return (
      <React.Fragment>
        <Sidebar
          sidebar={
            <ContentSidebar
              routes={[
                {
                  path: "/home",
                  name: "Home",
                  image: HomeIcon
                },
                { path: "/profile", name: "Profile", image: ProfileIcon },
                { path: "/sales", name: "Sales", image: SalesIcon },
                {
                  path: "/notifications",
                  name: "Notifications",
                  image: NotificationIcon
                },
                { path: "/invetory", name: "Sales", image: InvetoryIcon }
              ]}
            />
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          sidebarClassName={"sidebarStyles"}
        >
          {this.props.children}
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default SidebarComponent;
