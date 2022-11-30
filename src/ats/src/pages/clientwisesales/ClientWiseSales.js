import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,  Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PageTitle from '../../components/PageTitle';
import AssignClient from './AssignClient';
import ViewSalesClient from './ViewSalesClient';
const ClientWiseSales = (props) => {
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
                            { label: 'Client Wise Sales ', path: '/hr', active: true },
                        ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>
      <Nav tabs className="requirement-tab hr-tab pt-3 pb-3 nav nav-tabs row bg-white">
        <NavItem className="col-sm-3">
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
           Assign Client
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-3">
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            View Client
          </NavLink>
        </NavItem>
       
      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
         
             <AssignClient/>
        </TabPane>
        <TabPane tabId="2">
         <ViewSalesClient/>
        </TabPane>
      </TabContent>
      
    </React.Fragment>
  );
}

export default ClientWiseSales;