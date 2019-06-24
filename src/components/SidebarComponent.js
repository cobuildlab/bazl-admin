import React from 'react';
import Sidebar from 'react-sidebar';
import ContentSidebar from './ContentSidebar';
import HomeIcon from '../assets/img/home.png';
import ProfileIcon from '../assets/img/profile.png';
import SalesIcon from '../assets/img/cart.png';
import ReportIcon from '../assets/img/report.png';
// import NotificationIcon from '../assets/img/notifications.png';
import InvetoryIcon from '../assets/img/invetory.png';

const mql = window.matchMedia(`(min-width: 800px)`);

class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
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
                  path: '/home',
                  name: 'Home',
                  image: HomeIcon,
                  className: 'title-list-item',
                },
                {
                  path: '/profile',
                  name: 'Profile',
                  image: ProfileIcon,
                  className: 'title-list-item',
                },
                {
                  path: '/sales',
                  name: 'Sales',
                  image: SalesIcon,
                  className: 'title-list-item',
                },
                // {
                //   path: "/notifications",
                //   name: "Notifications",
                //   image: NotificationIcon,
                //   className: "title-list-item"
                // },
                {
                  path: '/inventory',
                  name: 'Inventory',
                  image: InvetoryIcon,
                  className: 'title-list-item',
                },
                {
                  path: '/privacy-policy',
                  name: 'Privacy Policy',
                  image: ReportIcon,
                  className: 'title-list-item',
                },
                {
                  path: '/terms-and-conditions',
                  name: 'Terms and Conditions',
                  image: ReportIcon,
                  className: 'title-list-item',
                },
              ]}
            />
          }
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          sidebarClassName={'sidebarStyles'}
          transitions={false}>
          {this.props.children}
        </Sidebar>
      </React.Fragment>
    );
  }
}

export default SidebarComponent;
