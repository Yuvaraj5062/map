import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,  Row, Col } from 'reactstrap';
import classnames from 'classnames';
import ViewOffer from './ViewOffer';
import PageTitle from '../../components/PageTitle';
import JoinList from './JoinList';
import ViewToBeJoin from './ViewToBeJoin';
import ViewBd from './ViewBD';
import moment from 'moment'
const List = (props) => {
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
                            { label: 'List', path: '/list', active: true },
                        ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>
      <Nav tabs className="requirement-tab pt-3 pb-3 nav nav-tabs row bg-white">
        <NavItem className="col-sm-3">
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
            View Offer
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-3">
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            View to be Join
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-3">
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Join List
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-3">
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            View BD
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
         
             <ViewOffer/>
        </TabPane>
        <TabPane tabId="2">
         <ViewToBeJoin/>
        </TabPane>
        <TabPane tabId="3">
          <JoinList/>
        </TabPane >
        <TabPane tabId="4">
          <ViewBd/>
        </TabPane >
      </TabContent>
      
    </React.Fragment>
  );
}

export default List;