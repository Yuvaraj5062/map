import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import AddTeam from './AddTeam';
import ViewTeam from './ViewTeam';

const TeamTabs = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <React.Fragment>
      <Nav tabs className="second-level-tab nav nav-tabs justify-content-end">
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Create Team
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            View Team
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
         
             <AddTeam/>
        </TabPane>
        <TabPane tabId="2">
         <ViewTeam/> 
        </TabPane>
      </TabContent>
      
    </React.Fragment>
  );
}

export default TeamTabs;