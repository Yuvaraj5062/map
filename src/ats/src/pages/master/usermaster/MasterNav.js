import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink} from 'reactstrap';
import classnames from 'classnames';
import AddUser from './AddUser';
import ViewUser from './ViewUser';
import AssignRole from './AssignRole';
import ViewUserRole from './ViewUserRole';
import UploadDocument from './UploadDocument';
import ViewDocument from './ViewDocument';
import { InActiveUser } from './InActiveUser';

const MastersTabs = (props) => {
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
            Add User
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            View User
          </NavLink>
        </NavItem>

        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            InActive User
          </NavLink>
        </NavItem>

        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            Assign Role
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }}
          >
            View Role
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '6' })}
            onClick={() => { toggle('6'); }}
          >
            Upload Document
          </NavLink>
        </NavItem>
        <NavItem >
          <NavLink
            className={classnames({ active: activeTab === '7' })}
            onClick={() => { toggle('7'); }}
          >
            View Document
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
         
             <AddUser/>
        </TabPane>
        <TabPane tabId="2">
         <ViewUser/> 
        </TabPane>
        <TabPane tabId="3">
         <InActiveUser/> 
        </TabPane>

        <TabPane tabId="4">
         <AssignRole/>
        </TabPane >
        <TabPane tabId="5">
         <ViewUserRole/>
        </TabPane >
        <TabPane tabId="6">
         <UploadDocument/>
        </TabPane >
        <TabPane tabId="7">
         <ViewDocument/>
        </TabPane >
      </TabContent>
      
    </React.Fragment>
  );
}

export default MastersTabs;