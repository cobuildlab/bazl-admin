import React from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";

const TabComponent = ({ defaultTab = "0", tabs }) => {
  const [currentTab, setCurrentTab] = React.useState(defaultTab);

  function toggleTab(tabIndex) {
    const tabIndexString = tabIndex.toString();
    if (tabIndexString !== currentTab) {
      return setCurrentTab(tabIndexString);
    }
  }

  function getCurrentTab(tabIndex) {
    const tabIndexString = tabIndex.toString();
    return tabIndexString === currentTab ? "active" : "";
  }

  return (
    <>
      <Nav tabs>
        {tabs.map(({ tabName }, tabIndex) => (
          <NavItem key={tabName}>
            <NavLink
              to="#"
              className={getCurrentTab(tabIndex)}
              onClick={() => toggleTab(tabIndex)}
            >
              {tabName}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
      <TabContent activeTab={currentTab}>
        {tabs.map(({ JSX }, tabIndex) => (
          <TabPane tabId={tabIndex.toString()} key={tabIndex}>
            {JSX}
          </TabPane>
        ))}
      </TabContent>
    </>
  );
};

export default TabComponent;
