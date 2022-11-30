import React from 'react';
import { Row, Col } from 'reactstrap';
import PageTitle from '../../../components/PageTitle';
import ViewClient from '../../../pages/master/clientmaster/ViewClient'

const ViewClientList = (props) => {
  
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={6} className="">
                    <PageTitle
                      breadCrumbItems={[
                          { label: 'Dashboard/ViewClient', path: '/ViewClient', active: true },
                      ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>   
            <Row>
            <Col md={12} className="">
                <ViewClient/>
            </Col>
            </Row>         
        </React.Fragment>
    );
};

export default ViewClientList;
