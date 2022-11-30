import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Button, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PageTitle from '../../components/PageTitle';
import { useSelector } from 'react-redux';
import { CreateTask } from './taskmanager/createtask/CreateTask';
import { ViewTask } from './taskmanager/viewtask/ViewTask';
import { ViewProject } from './projectmanager/viewproject/ViewProject';
import CreateProject from './projectmanager/addproject/CreateProject';
import { GenereteReport } from './generatereport/GenereteReport';

const TaskManager = () => {
  const [activeTab, setActiveTab] = useState('1');
  let loginDetails = useSelector((state) => state.Auth.user || [])

  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }


  return (
    <React.Fragment>
      <Row className="page-title">
        <Col md={6}>
          <PageTitle
            breadCrumbItems={[
              { label: 'Task Manager', path: '/task-manager', active: true },
            ]}
          />
        </Col>
        <Col md={6} className="text-right">
          {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
        </Col>
      </Row>
      <Nav tabs className="requirement-tab pt-3 pb-3 nav nav-tabs row bg-white">


        <NavItem className="col-md-3 mt-2">
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Add Tasks
          </NavLink>
        </NavItem>
        <NavItem className="col-md-3 mt-2">
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            View Tasks
          </NavLink>
        </NavItem>

        {
          loginDetails.Role === 'Manager' ?
            <>
              <NavItem className="col-md-3 mt-2">
                <NavLink
                  className={classnames({ active: activeTab === '3' })}
                  onClick={() => { toggle('3'); }}
                >
                  Project Master
                </NavLink>
              </NavItem>

              <NavItem className="col-md-3 mt-2">
                <NavLink
                  className={classnames({ active: activeTab === '4' })}
                  onClick={() => { toggle('4'); }}
                >
                  Generate Reports
                </NavLink>
              </NavItem>
            </>
            : null}


      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>

        <TabPane tabId="1">
          <CreateTask />
        </TabPane>
        <TabPane tabId="2">
          <ViewTask />
        </TabPane>

        <TabPane tabId="3">
          <ViewProject />
        </TabPane >
        <TabPane tabId="4">
          <GenereteReport />
        </TabPane >

      </TabContent>
    </React.Fragment>
  );
}

export default TaskManager;