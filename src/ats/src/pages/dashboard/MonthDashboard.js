// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
//import * as FeatherIcon from 'react-feather';
import StatisticsWidget from './StatisticsWidget';
//import ApplicationList from './ApplicationList';
import Chart from './Chart';
import { useDispatch, useSelector } from 'react-redux';
import {
    getMonthGraphData,
    getMonthHireCount,
    getMonthInterviewCount,
    getMonthOfferCount,
    getMonthSubmissionCount,
    getMonthTargetGraph,
    getTargetGraphAdmin,
} from '../../helpers/restApi';
import {
    setMonthAnaysis,
    setMonthGraphAnaysis,
    setMonthTargetGraphAnaysis,
    setMonthTargetGraphAnaysisAdmin,
} from '../../redux/actions';
import HighChart from './HighChart';
import {
    generateAdminPie,
    generateBarChartData,
    generateLineChartData,
    generatePieChartData,
} from '../../helpers/dashboard';
import colors from '../../constants/colors';
import { Link } from 'react-router-dom';
const MonthDashboard = () => {
    let dispatch = useDispatch();
    let loginDetails = useSelector((state) => state.Auth.user || []);
    let DashboardData = useSelector((state) => state.Dashboard.monthAnalysis || '');
    let DashboardGraphData = useSelector((state) => state.Dashboard.monthGraphAnalysis || '');
    let DashboardTargetGraphData = useSelector((state) => state.Dashboard.monthTargetGraphAnalysis || '');
    let DashboardTargetGraphDataAdmin = useSelector((state) => state.Dashboard.monthTargetGraphAnalysisAdmin || '');
    const [dataArr, setDataArr] = useState([0, 0, 0, 0]);
    const [barGraphData, setBarGraphData] = useState([
        {
            type: 'column',
            data: dataArr,
        },
    ]);
    const [lineGraphData, setLineGraphData] = useState([
        {
            type: 'spline',
            data: [],
        },
    ]);
    const [pieChartData, setPieChartData] = useState([
        {
            type: 'pie',
            data: [],
        },
    ]);
    const [adminPieChartData, setAdminPieChartData] = useState([
        {
            type: 'pie',
            data: [],
        },
    ]);
    const bargraphPlots = ['Submission', 'Interview', 'Offer', 'Hire'];
    const [linegraphPlots, setLineGraphPlots] = useState([]);
    useEffect(() => {
        let username = loginDetails.Username;
        getMonthGraphData({ userName: username })
            .then((res) => {
                dispatch(setMonthGraphAnaysis(res.data.Data));
            })
            .catch((err) => {
                //console.log('Error', err);
            });
        getMonthTargetGraph({ userName: username })
            .then((res) => {
                dispatch(setMonthTargetGraphAnaysis(res.data.Data));
            })
            .catch((err) => {
                //console.log('Error:', err);
            });
        if (loginDetails.Role === 'Admin') {
            getTargetGraphAdmin({ userName: username, type: 'Month' })
                .then((res) => {
                    dispatch(setMonthTargetGraphAnaysisAdmin(res.data.Data));
                })
                .catch((err) => {
                    //console.log('Error:', err);
                });
        }
        Promise.all([
            getMonthSubmissionCount({ userName: username }),
            getMonthInterviewCount({ userName: username }),
            getMonthOfferCount({ userName: username }),
            getMonthHireCount({ userName: username }),
        ])
            .then((res) => {
                dispatch(
                    setMonthAnaysis({
                        submissions: res[0].data.Data,
                        interviews: res[1].data.Data,
                        offers: res[2].data.Data,
                        hires: res[3].data.Data,
                    })
                );
            })
            .catch((err) => {
                //console.log('Error', err.response);
            });
    }, []);
    useEffect(() => {
        let barData = generateBarChartData(DashboardGraphData);
        setDataArr(barData);
        setBarGraphData((prev) => {
            let temp = [...prev];
            temp[0].name = 'Status';
            temp[0].data = barData;
            return temp;
        });
    }, [DashboardGraphData]);
    useEffect(() => {
        if (loginDetails.Role === 'Admin') {
            setLineGraphData((prev) => {
                if (DashboardTargetGraphData !== '') {
                    let lineData = generateLineChartData(DashboardTargetGraphData);
                    setLineGraphPlots(lineData.plots);
                    return lineData.temp;
                }
            });
        } else {
            if (DashboardTargetGraphData !== '') {
                let pieData = generatePieChartData(DashboardTargetGraphData);
                setPieChartData((prev) => [...prev, { ...prev[0], data: pieData }]);
            }
        }
    }, [DashboardTargetGraphData]);
    useEffect(() => {
        if (DashboardTargetGraphDataAdmin !== '') {
            let pieData = generateAdminPie(DashboardTargetGraphDataAdmin);
            setAdminPieChartData((prev) => [...prev, { ...prev[0], data: pieData }]);
        }
    }, [DashboardTargetGraphDataAdmin]);
    return (
        <React.Fragment>
            <Row className="mt-3">
                <Col md={6} xl={3} className="pl-3 pr-3">
                    <Link to="/monthSubmission">
                        {' '}
                        <StatisticsWidget
                            description="Submission"
                            title={DashboardData.submissions}
                            footerPara="-"
                            bgColor={colors.themeDark}
                            footdesc="Submission to Interview"></StatisticsWidget>{' '}
                    </Link>
                </Col>
                <Col md={6} xl={3} className="pl-3 pr-3">
                    <Link to="/monthInterview">
                        {' '}
                        <StatisticsWidget
                            description="Interview"
                            title={DashboardData.interviews}
                            footerPara="-"
                            bgColor={colors.themeSaffron}
                            footdesc="Submission to Offer"></StatisticsWidget>{' '}
                    </Link>
                </Col>
                <Col md={6} xl={3} className="pl-3 pr-3">
                    <Link to="/monthOffer">
                        {' '}
                        <StatisticsWidget
                            description="Offer"
                            title={DashboardData.offers}
                            footerPara="-"
                            bgColor={colors.themeDark}
                            footdesc="Submission to Hire"></StatisticsWidget>{' '}
                    </Link>
                </Col>
                <Col md={6} xl={3} className="pl-3 pr-3">
                    <Link to="/monthHire">
                        {' '}
                        <StatisticsWidget
                            description="Hire"
                            title={DashboardData.hires}
                            footerPara="-"
                            bgColor={colors.themeSaffron}
                            footdesc="Pending Approval"></StatisticsWidget>{' '}
                    </Link>
                </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6} xl={6}>
                    <HighChart graphData={barGraphData} XaxisPlots={bargraphPlots} title="" xaxisTitle={''} />
                </Col>
                {loginDetails.Role === 'Admin' ? (
                    <>
                        <Col md={6} xl={6}>
                            <HighChart graphData={adminPieChartData} title="" XaxisPlots={bargraphPlots} />
                        </Col>
                        <Col md={12} xl={12}>
                            <HighChart
                                graphData={lineGraphData}
                                title=""
                                XaxisPlots={linegraphPlots}
                                xaxisTitle={'Name'}
                            />
                        </Col>
                    </>
                ) : (
                    <Col md={6} xl={6}>
                        <HighChart graphData={pieChartData} title="" XaxisPlots={bargraphPlots} />
                    </Col>
                )}
            </Row>
        </React.Fragment>
    );
};

export default MonthDashboard;
