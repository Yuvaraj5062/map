import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink,  Row, Col } from 'reactstrap';
import classnames from 'classnames';
import TargetSubmission from './TargetSubmission';
import PageTitle from '../../components/PageTitle';
import OfferAndHire from './OfferAndHire';
import Graph from './Graph';
import AtsActivity from './AtsActivity';
import SearchResume from './SearchResume';
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
                            { label: 'Activity', path: '/activity', active: true },
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
            Target / Submission
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-2">
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Offer / Hire
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-2">
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            Graph
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-2">
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            ATS Activity
          </NavLink>
        </NavItem>
        <NavItem className="col-sm-3">
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }}
          >
            Search Resume
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent className="req-tab-content" activeTab={activeTab}>
        <TabPane tabId="1">
         
             <TargetSubmission/>
        </TabPane>
        <TabPane tabId="2">
         <OfferAndHire/>
        </TabPane>
        <TabPane tabId="3">
          <Graph/>
        </TabPane >
        <TabPane tabId="4">
          <AtsActivity/>
        </TabPane >
        <TabPane tabId="5">
          <SearchResume/>
        </TabPane >
      </TabContent>
      
    </React.Fragment>
  );
}

export default List;