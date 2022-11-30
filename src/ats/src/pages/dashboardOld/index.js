// @flow
import React from 'react';
import { Row, Col} from 'reactstrap';
//import * as FeatherIcon from 'react-feather';
import PageTitle from '../../components/PageTitle';
//import StatisticsWidget from './StatisticsWidget';
//import ApplicationList from './ApplicationList';
//import Chart from './Chart'
const DashboardOld = () => {
    return (
        <React.Fragment>
            <Row className="page-title">
                <Col md={12}>
                    <PageTitle
                        breadCrumbItems={[
                            { label: 'Working Page', path: '/WP', active: true },
                        ]}
                        title={'Working Page'}
                    />
                </Col>
            </Row>
            <Row>
            <Col md={6} xl={4}>
                {/* <StatisticsWidget description="Calificacion" title="70/100" footerPara="Nivel media Ultima encuesto 1/9/2020"  iconFootClass="icon-dual-warning" icon={FeatherIcon.Smile} iconSmallFootClass="uil-heart-medical icon-dual-warning" iconClass="icon-dual-dark"></StatisticsWidget> */}
            </Col>
            <Col md={6} xl={4}>
                {/* <StatisticsWidget description="Conteo evaluacion alto" title="10/15" footerPara="Nomero de empledados can calificacion alto" icon={FeatherIcon.AlertTriangle} iconClass="icon-dual-danger" iconSmallFootClass="uil-user"></StatisticsWidget> */}
            </Col>
            <Col md={6} xl={4}>
                {/* <StatisticsWidget description="Encuestas pendientes" title="5" footerPara="Ultima encuesta recibida 02/09/2020"  icon={FeatherIcon.FileText} iconClass="icon-dual-success" iconSmallFootClass=" uil-files-landscapes-alt"></StatisticsWidget> */}
            </Col>
            </Row>
            <Row>
                <Col md={6} xl={6}>
                    {/* <ApplicationList/> */}
                </Col>
                <Col md={6} xl={6}>
                    {/* <Chart/> */}
                </Col>
            </Row>
        </React.Fragment>
    );
};

export default DashboardOld;
