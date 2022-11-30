// @flow
import React, { useEffect } from 'react';
import { Row, Col } from 'reactstrap';
//import * as FeatherIcon from 'react-feather';
import StatisticsWidget from './StatisticsWidget';
//import ApplicationList from './ApplicationList';
import { useDispatch, useSelector } from 'react-redux';
import { getClientCount,getPendingApprovalCount,getPendingOfferDetailsCount,getToBeJoinCount,getTotalRequirementCount,getUserCount } from '../../helpers/restApi';
import { setGeneralAnalysis } from '../../redux/actions';
import swal from 'sweetalert';
import colors from '../../constants/colors';
import { Link } from 'react-router-dom';
const GeneralDashboard = () => {
  let dispatch = useDispatch()
  let loginDetails = useSelector((state)=> state.Auth.user || [])
  
  let DashboardData = useSelector((state) => state.Dashboard.generalAnalysis||'')
    useEffect(() => {
        let username = loginDetails.Username;
        if(loginDetails.Role === 'Admin'){
          Promise.all([
              getUserCount(),
              getClientCount(),
              getPendingApprovalCount({userName:username}),
              getPendingOfferDetailsCount({userName:username}),
              getToBeJoinCount({userName:username}),
              getTotalRequirementCount({type:'Total'}),
              getTotalRequirementCount({type:'Active'}),
              getTotalRequirementCount({type:'Deactive'})
          ]).then((res) => {
            // //console.log("General Response...", res)
            dispatch(setGeneralAnalysis({
              user: res[0].data.Data,
              client: res[1].data.Data,
              pendingapproval: res[2].data.Data,
              pendingoffer: res[3].data.Data,
              tobejoin: res[4].data.Data,
              totalRequirement: res[5].data.Data,
              totalActiveRequirement: res[6].data.Data,
              totalDeactiveRequirement: res[7].data.Data,
          }))
          }).catch((err) => {
            //console.log("Error from general apis: ", err)
          })
        }
    },[])
    return (
        <React.Fragment>
            <Row className="mt-3">
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/viewuser"> <StatisticsWidget description="Users" title={DashboardData.user} footerPara="-" bgColor={colors.themeDark} footdesc="Submission to Interview" ></StatisticsWidget> </Link>
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/viewclient"> <StatisticsWidget description="Client" title={DashboardData.client} footerPara="-" bgColor={colors.themeSaffron} footdesc="Submission to Offer" ></StatisticsWidget> </Link>
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/pendingApproval"> <StatisticsWidget description="Pending Approval" title={DashboardData.pendingapproval} footerPara="-" bgColor={colors.themeDark} footdesc="Submission to Hire" ></StatisticsWidget> </Link>
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/pendingOffer"> <StatisticsWidget description="Pending Offers" title={DashboardData.pendingoffer} footerPara="-" bgColor={colors.themeSaffron} footdesc="Pending Approval"  ></StatisticsWidget></Link> 
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/viewToBeJoin"> <StatisticsWidget description="To Be Join" title={DashboardData.tobejoin} footerPara="-" bgColor={colors.themeSaffron} footdesc="Pending Approval"  ></StatisticsWidget> </Link>
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/viewRequirement"> <StatisticsWidget description="Total Requirement Count" title={DashboardData.totalRequirement} bgColor={colors.themeDark} footerPara="-" footdesc="Pending Approval"  ></StatisticsWidget> </Link>
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/viewActiveRequirement"> <StatisticsWidget description="Total Active Requirement" title={DashboardData.totalActiveRequirement} bgColor={colors.themeSaffron} footerPara="-" footdesc="Pending Approval"  ></StatisticsWidget> </Link>
            </Col>
            <Col md={6} xl={3} className="pl-3 pr-3">
                <Link to="/viewDeActiveRequirement"> <StatisticsWidget description="Total Deactive Requirement" title={DashboardData.totalDeactiveRequirement} bgColor={colors.themeDark} footerPara="-" footdesc="Pending Approval"  ></StatisticsWidget> </Link>
            </Col>
            </Row>
            {/* <Row>
                <Col md={12} xl={12}>
                    <Chart/> 
                </Col>
            </Row> */}
        </React.Fragment>
    );
};

export default GeneralDashboard;
