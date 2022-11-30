// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
//import * as FeatherIcon from 'react-feather';
import StatisticsWidget from './StatisticsWidget';
//import ApplicationList from './ApplicationList';
// import Chart from './Chart'
import { useDispatch, useSelector } from 'react-redux';
import {
    getTargetGraphAdmin,
    getWeekGraphData,
    getWeekHireCount,
    getWeekInterviewCount,
    getWeekOfferCount,
    getWeekSubmissionCount,
    getWeekTargetGraph,
} from '../../helpers/restApi';
import {
    setWeekAnaysis,
    setWeekGraphAnaysis,
    setWeekTargetGraphAnaysis,
    setWeekTargetGraphAnaysisAdmin,
} from '../../redux/actions';
import {
    generateAdminPie,
    generateBarChartData,
    generateLineChartData,
    generatePieChartData,
} from '../../helpers/dashboard';
import HighChart from './HighChart';
import colors from '../../constants/colors';
import { Link } from 'react-router-dom';
const WeekDashboard = () => {
    let dispatch = useDispatch();
    let loginDetails = useSelector((state) => state.Auth.user || []);
    let DashboardData = useSelector((state) => state.Dashboard.weekAnalysis || '');
    let DashboardGraphData = useSelector((state) => state.Dashboard.weekGraphAnalysis || '');
    let DashboardTargetGraphData = useSelector((state) => state.Dashboard.weekTargetGraphAnalysis || '');
    let DashboardTargetGraphDataAdmin = useSelector((state) => state.Dashboard.weekTargetGraphAnalysisAdmin || '');
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
        getWeekGraphData({ userName: username })
            .then((res) => {
                dispatch(setWeekGraphAnaysis(res.data.Data));
            })
            .catch((err) => {
                //console.log('Error', err);
            });
        getWeekTargetGraph({ userName: username })
            .then((res) => {
                dispatch(setWeekTargetGraphAnaysis(res.data.Data));
            })
            .catch((err) => {
                //console.log('Error:', err);
            });
        if (loginDetails.Role === 'Admin') {
            getTargetGraphAdmin({ userName: username, type: 'Week' })
                .then((res) => {
                    dispatch(setWeekTargetGraphAnaysisAdmin(res.data.Data));
                })
                .catch((err) => {
                    //console.log('Error:', err);
                });
        }
        Promise.all([
            getWeekSubmissionCount({ userName: username }),
            getWeekInterviewCount({ userName: username }),
            getWeekOfferCount({ userName: username }),
            getWeekHireCount({ userName: username }),
        ])
            .then((res) => {
                dispatch(
                    setWeekAnaysis({
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
    // useEffect(() => {
    //     //console.log("Graph Data.... Yesterday", graphData)
    // },[graphData])
    return (
        <React.Fragment>
            <Row className="mt-3">
                <Col md={6} xl={3} className="pl-3 pr-3">
                    <Link to="/weekSubmission">
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
                    <Link to="/weekInterview">
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
                    <Link to="/weekOffer">
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
                    <Link to="/weekHire">
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

export default WeekDashboard;
