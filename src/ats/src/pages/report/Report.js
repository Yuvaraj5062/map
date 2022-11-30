import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,  Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PageTitle from '../../components/PageTitle';
import Revenureport from './revenureport/Revenureport';
import ClientReportNav from './clientreport/ClientReportNav';
import ViewRequirement from './ViewRequirement';
const Report = (props) => {
  const [activeTab, setActiveTab] = useState('1');

  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }

  return (
    <React.Fragment>
      <Row className="page-title">
                <Col md={6}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Report', path: '/report', active: true },
                        ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>
      <Nav tabs className="requirement-tab pt-3 pb-3 nav nav-tabs row bg-white">
        <NavItem className="col-sm-4">
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            Client Report
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-4">
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Revenue
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-4">
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Requirement
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
         
             <ClientReportNav/>
        </TabPane>
        <TabPane tabId="2">
         <Revenureport/>
        </TabPane>
        <TabPane tabId="3">
          <ViewRequirement/>
        </TabPane >
      </TabContent>
      
    </React.Fragment>
  );
}

export default Report;