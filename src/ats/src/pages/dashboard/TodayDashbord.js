// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
//import * as FeatherIcon from 'react-feather';
import StatisticsWidget from './StatisticsWidget';
//import ApplicationList from './ApplicationList';
import Chart from './Chart';
// import Chart from 'react-apexcharts';
import {
    getHireCount,
    getInterviewCount,
    getOfferCount,
    getSubmissionCount,
    getTargetGraphAdmin,
    getTodaysGraphData,
    getTodayTargetGraph,
    getYesterdaysGraphData,
} from '../../helpers/restApi';
import * as api from './../../helpers/restApi'
import { useDispatch, useSelector } from 'react-redux';
import { formatDate } from '../../constants/dateFormat';
import {
    getLeaveBalanceList,
    setTodayAnaysis,
    setTodayGraphAnalysisAdmin,
    setTodayGraphAnaysis,
    setTodayTargetGraphAnalysis,
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
import config from '../../helpers/baseurl';
var urlpattern = config.baseUrl;
const TodayDashbord = () => {
    let dispatch = useDispatch();
    let loginDetails = useSelector((state) => state.Auth.user || []);
    let DashboardData = useSelector((state) => state.Dashboard.todayAnalysis || '');
    let DashboardGraphData = useSelector((state) => state.Dashboard.todayGraphAnalysis || '');
    let DashboardTargetGraphData = useSelector((state) => state.Dashboard.todayTargetGraphAnalysis || '');
    let DashboardTargetGraphDataAdmin = useSelector((state) => state.Dashboard.todayTargetGraphAnalysisAdmin || '');
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
        getTodaysGraphData({ userName: username })
            .then((res) => {
                dispatch(setTodayGraphAnaysis(res.data.Data));
            })
            .catch((err) => {
                //console.log('Error', err);
            });
        getTodayTargetGraph({ userName: username })
            .then((res) => {
                dispatch(setTodayTargetGraphAnalysis(res.data.Data));
            })
            .catch((err) => {
                //console.log('Error:', err);
            });
        if (loginDetails.Role === 'Admin') {
            getTargetGraphAdmin({ userName: username, type: 'Today' })
                .then((res) => {
                    dispatch(setTodayGraphAnalysisAdmin(res.data.Data));
                })
                .catch((err) => {
                    //console.log('Error:', err);
                });
        }
        Promise.all([
            getSubmissionCount({ userName: username }),
            getInterviewCount({ userName: username }),
            getOfferCount({ userName: username }),
            getHireCount({ userName: username }),
        ])
            .then((res) => {
                dispatch(
                    setTodayAnaysis({
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
            temp[0].colorKey = 'colorValue';
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

   // let leaveBalance = useSelector((state) => state.Leave.leavebalance || []);
    const [birthdayList, setbirthdayList] = useState([]);
    const [leaveBalance,setVeaveBalance]=useState()
    // useEffect(() => {
    //     let username = loginDetails.Username;
    //    // dispatch(getLeaveBalanceList(username))
    //     getMonthBirthday();
    // }, [])


    useEffect(() => {
        api.getEmpLeaveBalance(loginDetails)
        .then((res) => {
           setVeaveBalance(res.data.Data)
           //console.log(res.data.Data,"res.data.Data")
        })
        getMonthBirthday();
        
        // dispatch(getLeaveBalanceList(username))
 
     }, []);
    const getMonthBirthday = () => {
        var axios = require('axios');
        return new Promise((resolve, reject) => {
            axios.get(`${urlpattern}MonthBirthday`)
                .then(function ({ data }) {
                    ////console.log(data.Data.Leave_Balance, 'data');
                    resolve(data);
                    setbirthdayList(data.Data)
                })
                .catch(function (error) {
                    resolve();
                });
        });
    }
    // //console.log(birthdayList,"birthdayList");
    return (
        <React.Fragment>
            <Row className="mt-3">
                <Col md={6} xl={3} className="pl-3 pr-3">
                    <Link to="/todaySubmission">
                        {' '}
                        <StatisticsWidget
                            description="Submission"
                            title={DashboardData.submissions}
                            footerPara="-"
                            footdesc="Submission to Interview"
                            bgColor={colors.themeDark}></StatisticsWidget>{' '}
                    </Link>
                </Col>
                <Col md={6} xl={3} className="pl-3 pr-3">
                    <Link to="/todayInterview">
                        {' '}
                        <StatisticsWidget
                            description="Interview"
                            title={DashboardData.interviews}
                            footerPara="-"
                            footdesc="Submission to Offer"
                            bgColor={colors.themeSaffron}></StatisticsWidget>{' '}
                    </Link>
                </Col>
                <Col md={6} xl={3} className="pl-3 pr-3">
                    <Link to="/todayOffer">
                        {' '}
                        <StatisticsWidget
                            description="Offer"
                            title={DashboardData.offers}
                            footerPara="-"
                            footdesc="Submission to Hire"
                            bgColor={colors.themeDark}></StatisticsWidget>{' '}
                    </Link>
                </Col>
                <Col md={6} xl={3} className="pl-3 pr-3">
                    <Link to="/todayHire">
                        {' '}
                        <StatisticsWidget
                            description="Hire"
                            title={DashboardData.hires}
                            footerPara="-"
                            footdesc="Pending Approval"
                            bgColor={colors.themeSaffron}></StatisticsWidget>{' '}
                    </Link>
                </Col>
            </Row>
            <Row>
                <Col md={6} xl={6}>
                    <div className="dash-leave-details">Total Leave Balance - {leaveBalance?leaveBalance.ClosingLeaveBalance:0} </div>
                </Col>
                <Col md={6} xl={6}>
                    <div className="dash-leave-details text-left">
                      Current  Month Birthday - &nbsp;&nbsp;
                        {birthdayList != null && birthdayList.length !== 0 ?
                            <marquee width="70%" direction="left" height="17px"> {birthdayList.map((birthday, index) =>
                                <label key={index}>{birthday.Fullname}&nbsp;&nbsp;{birthday.DOB}{(index + 1 !== birthdayList.length)?',':null} &nbsp;&nbsp;</label>
                            )}</marquee>
                            : null
                        }

                    </div>
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

export default TodayDashbord;
