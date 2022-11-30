import React, { useState } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PageTitle from '../../components/PageTitle';
import { useSelector } from 'react-redux';
import { ViweAttendance } from './ViweAttendance';
import UploadAttendance from './UploadAttendance';

const Attendance = (props) => {
    const [activeTab, setActiveTab] = useState('1');
    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    let loginDetails = useSelector((state) => state.Auth.user || []);

    return (
        <React.Fragment>
            <Row className="page-title mb-3">
                <Col md={6}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Attendance', path: '/attendance', active: true },
                        ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                    {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>
            <Nav tabs className="requirement-tab hr-tab pt-3 pb-3 nav nav-tabs row bg-white">
                <NavItem className="col-sm-6 p-1">
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        View Attendance
                    </NavLink>
                </NavItem>
                {loginDetails.Role === "HR" ||loginDetails.Role==="HR Manager"?
                    <NavItem className="col-sm-6 p-1">
                        <NavLink
                            className={classnames({ active: activeTab === '2' })}
                            onClick={() => { toggle('2'); }}
                        >
                            Upload Attendance
                        </NavLink>
                    </NavItem> 
                    : null}

            </Nav>
            <TabContent className="req-tab-content" activeTab={activeTab}>
                <TabPane tabId="1">
                    <ViweAttendance />
                </TabPane>
                <TabPane tabId="2">
                    <UploadAttendance />
                </TabPane>
            </TabContent>
        </React.Fragment>
    );
}

export default Attendance;