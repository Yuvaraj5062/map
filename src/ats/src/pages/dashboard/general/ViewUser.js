import React from 'react';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../../components/PageTitle';
import ViewUser from '../../../pages/master/usermaster/ViewUser'

const ViewUserList = (props) => {
  
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={6} className="">
                    <PageTitle
                      breadCrumbItems={[
                          { label: 'Dashboard/ViewUser', path: '/ViewUser', active: true },
                      ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>   
            <Row>
            <Col md={12} className="">
                <ViewUser/>
            </Col>
            </Row>         
        </React.Fragment>
    );
};

export default ViewUserList;
