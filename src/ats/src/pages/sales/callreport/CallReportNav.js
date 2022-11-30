import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import AddCall from './AddCall';
import ViewCall from './ViewCall';

const CallReportNav = (props) => {
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
            Add Call
          </NavLink>
        </NavItem>
        {/* <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            View Call
          </NavLink>
        </NavItem> */}
      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
         
             <AddCall/>
        </TabPane>
        <TabPane tabId="2">
         <ViewCall/> 
        </TabPane>
      </TabContent>
      
    </React.Fragment>
  );
}

export default CallReportNav;