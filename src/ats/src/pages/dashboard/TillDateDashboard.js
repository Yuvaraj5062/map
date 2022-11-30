// @flow
import React, { useEffect, useState } from 'react';
import { Row, Col } from 'reactstrap';
//import * as FeatherIcon from 'react-feather';
import StatisticsWidget from './StatisticsWidget';
//import ApplicationList from './ApplicationList';
import Chart from './Chart'
import { useDispatch, useSelector } from 'react-redux';
import { getTillDateGraphData, getTillDateHireCount, getTillDateInterviewCount, getTillDateOfferCount, getTillDateSubmissionCount } from '../../helpers/restApi';
import { setTillDateAnalysis, setTillDateGraphAnalysis } from '../../redux/actions';
import HighChart from './HighChart';
import { generateBarChartData } from '../../helpers/dashboard';
import colors from '../../constants/colors';
import { Link } from 'react-router-dom';
const TillDateDashboard = () => {
  let dispatch = useDispatch()
  let loginDetails = useSelector((state)=> state.Auth.user || [])
  let DashboardData = useSelector((state) => state.Dashboard.tillDateAnalysis||'')
  let DashboardGraphData = useSelector((state) => state.Dashboard.tillDateGraphAnalysis||'')
  let DashboardTargetGraphData = useSelector((state) => state.Dashboard.tillDateTargetGraphAnalysis||'')
  const [tillData,setTillData]=useState()
    const [dataArr, setDataArr ] = useState([0,0,0,0])
    const [barGraphData,setBarGraphData] = useState([{
        type:'column',
        data:dataArr
    }])


    //console.log(barGraphData,"<><><><>")
    const [lineGraphData,setLineGraphData] = useState([{
        type:"spline",
        data: []
    }]) 
        const [pieChartData,setPieChartData] = useState([{
            type:"pie",
            data: []
        }]) 
      const bargraphPlots = ['Submission', 'Interview','Offer','Hire']
      const [linegraphPlots, setLineGraphPlots] = useState([])
    useEffect(() => {
        let username = loginDetails.Username;
        getTillDateGraphData({ userName: username }).then((res) => {
            ////console.log(">>>>>>????? Till Date/ fbfgbfg///", res)
            setTillData(res.data.Data)
            dispatch(setTillDateGraphAnalysis(res.data.Data))
        }).catch((err) => {
            //console.log("Error", err)
        })

        Promise.all([
            getTillDateSubmissionCount({userName:username}),
            getTillDateInterviewCount({userName:username}),
            getTillDateOfferCount({userName:username}),
            getTillDateHireCount({userName:username})
        ]).then((res) => {
          ////console.log(">>>>>>????? Till Date////", res)
          dispatch(setTillDateAnalysis({
            submissions: tillData.submission,
            interviews: tillData.interview,
            offers: tillData.offer,
            hires:tillData.start
        }))
        }).catch((err) => {
            //console.log("Error", err.response)
        })
    },[])
    useEffect(() => {
        let barData = generateBarChartData(DashboardGraphData)
        setDataArr(barData)
        setBarGraphData((prev) => {
            let temp = [...prev]
            temp[0].name = 'Status'
            temp[0].data = barData
            return temp
        })
    },[DashboardGraphData])

    // useEffect(() => {
    //     if(loginDetails.Role === 'Admin'){
    //     setLineGraphData((prev) => {
    //         if(DashboardTargetGraphData !== ''){
    //                 let lineData = generateLineChartData(DashboardTargetGraphData)
    //                 setLineGraphPlots(lineData.plots)
    //                 return lineData.temp
    //             }
    //         })
    //     }else {
    //         if(DashboardTargetGraphData !== ''){
    //             let pieData = generatePieChartData(DashboardTargetGraphData)
    //             setPieChartData((prev) => [...prev, {...prev[0], data : pieData}])
    //         }
    //     }
    // },[DashboardTargetGraphData])
    // useEffect(() => {
    //     //console.log("Graph Data.... Yesterday", graphData)
    // },[graphData])
    return (
        <React.Fragment>
            <Row className="mt-3">
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/tillDateSubmission">   <StatisticsWidget description="Submission" title={tillData?tillData.submission:0} footerPara="-" bgColor={colors.themeDark} footdesc="Submission to Interview" ></StatisticsWidget> </Link>
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/tillDateInterview">   <StatisticsWidget description="Interview" title={tillData?tillData.interview:0} footerPara="-" bgColor={colors.themeSaffron} footdesc="Submission to Offer" ></StatisticsWidget> </Link>
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                 <Link to="/tillDateOffer">    <StatisticsWidget description="Offer" title={tillData?tillData.offer:0} footerPara="-" bgColor={colors.themeDark} footdesc="Submission to Hire" ></StatisticsWidget> </Link>
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/tillDateHire">    <StatisticsWidget description="Hire" title={tillData?tillData.start:0} footerPara="-" bgColor={colors.themeSaffron} footdesc="Pending Approval"  ></StatisticsWidget> </Link>
            </Col>
            </Row>
            <Row className="mt-3">
                <Col md={6} xl={6}>
                    <HighChart graphData={barGraphData} XaxisPlots={bargraphPlots}/> 
                </Col>
                {/* {
                    loginDetails.Role === 'Admin' ?
                    <>
                        <Col md={6} xl={6}>
                            <HighChart graphData={pieChartData} XaxisPlots={bargraphPlots}/> 
                        </Col>
                        <Col md={12} xl={12}>
                            <HighChart graphData={lineGraphData} XaxisPlots={linegraphPlots}/> 
                        </Col>
                    </>
                    :
                    <Col md={6} xl={6}>
                        <HighChart graphData={pieChartData} XaxisPlots={bargraphPlots}/> 
                    </Col>
                } */}
            </Row>
        </React.Fragment>
    );
};

export default TillDateDashboard;
