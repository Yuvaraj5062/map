import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import TeamLeadwise from './TeamLeadwise';
import Datewise from './Datewise';
import Monthcount from './Monthcount';
import Todaycount from './Todaycount';

const ClientReportNav = (props) => {
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
            Team Leadwise
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Datewise
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Monthcount
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Today
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
         
             <TeamLeadwise/>
        </TabPane>
        <TabPane tabId="2">
         <Datewise/> 
        </TabPane>
        <TabPane tabId="3">
         <Monthcount/>
        </TabPane >
        <TabPane tabId="4">
         <Todaycount/>
        </TabPane >
      </TabContent>
      
    </React.Fragment>
  );
}

export default ClientReportNav;