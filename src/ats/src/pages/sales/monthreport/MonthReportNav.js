import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import AddMonthReport from './AddMonthReport';
import ViewMonthReport from './ViewMonthReport';

const MonthReportNav = (props) => {
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
            Add Month Report
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            View Month Report
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
         
             <AddMonthReport/>
        </TabPane>
        <TabPane tabId="2">
         <ViewMonthReport/> 
        </TabPane>
      </TabContent>
      
    </React.Fragment>
  );
}

export default MonthReportNav;