import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TabContent, TabPane, Nav, NavItem, NavLink, Alert, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import PageTitle from '../../components/PageTitle';
//import HomeTopbar from '../../components/HomeTopbar';
import TodayDashboard from './TodayDashbord';
import YesterdayDashboard from './YesterdayDashboard';
import WeekDashboard from './WeekDashboard';
import MonthDashboard from './MonthDashboard';
import TillDateDashboard from './TillDateDashboard';
import GeneralDashboard from './General';
import { getNewNotificationList } from '../../redux/notification/actions';
import config from '../../helpers/baseurl';

var urlpattern = config.baseUrl;
const Dashboard = (props) => {
  const [activeTab, setActiveTab] = useState('1');
  let loginDetails = useSelector((state)=> state.Auth.user || [])
  const toggle = tab => {
    if(activeTab !== tab) setActiveTab(tab);
  }
  const [visible, setVisible] = useState(true);

  const dispatch = useDispatch();
  let notifications = useSelector((state) => state.Notification.newnotification || []);
    let userDeatails = useSelector((state) => state.Auth.user || []);
    ////console.log(notifications, 'notifications');
    useEffect(() => {
       // alert('call')
        dispatch(getNewNotificationList(userDeatails.Username));
        //showNotifiication();
        // eslint-disable-next-line
    }, [notifications]);
  
    const onDismiss = (item) => {
      ////console.log(item)
      var axios = require('axios');
           var data = '';
   
           var config = {
           method: 'put',
           url: `${urlpattern}New_NotificationMaster/${item.id}?userName=${userDeatails.Username}`,
           headers: { },
           data : data
           };
   
           axios(config)
           .then(function (response) {
           ////console.log(JSON.stringify(response.data));
           dispatch(getNewNotificationList(userDeatails.Username));
           })
           .catch(function (error) {
           //console.log(error);
           });
    };
    
  return (
    <React.Fragment>
        <Row className="page-title">
                <Col md={6}>
                    <PageTitle
                      breadCrumbItems={[
                          { label: 'Dashboard', path: '/Dashboard/Home', active: true },
                      ]}
                    />
                </Col>
                <Col md={6} className="text-right">
                {/* <Button color="primary"><i className="uil uil-plus"></i>ADD ITEM</Button> */}
                </Col>
            </Row>
            <div className="position-absolute top-0 end-0 por-0">
            {notifications.map((item, i) => {
                                return <Alert key={item.id} className="alertTost" color="info" isOpen={visible} toggle={() =>onDismiss(item,i)} >
                      {item.msg}
              </Alert>
                })}
                </div>
      <Nav tabs className="mt-2 dash-tab">
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '1' })}
            onClick={() => { toggle('1'); }}
          >
           Today
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '2' })}
            onClick={() => { toggle('2'); }}
          >
            Yesterday
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '3' })}
            onClick={() => { toggle('3'); }}
          >
            This Week
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '4' })}
            onClick={() => { toggle('4'); }}
          >
            This Month
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === '5' })}
            onClick={() => { toggle('5'); }}
          >
            Till Date
          </NavLink>
        </NavItem>
        {
          loginDetails.Role === 'Admin' ? 
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '6' })}
              onClick={() => { toggle('6'); }}
            >
              General
            </NavLink>
          </NavItem>
          :null
        }
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <TodayDashboard/>
        </TabPane>
        <TabPane tabId="2">
          <YesterdayDashboard></YesterdayDashboard>
        </TabPane>
        <TabPane tabId="3">
          <WeekDashboard></WeekDashboard>
        </TabPane>
        <TabPane tabId="4">
          <MonthDashboard></MonthDashboard>
        </TabPane>
        <TabPane tabId="5">
          <TillDateDashboard></TillDateDashboard>
        </TabPane>
        {
          loginDetails.Role === 'Admin' ? 
            <TabPane tabId="6">
              <GeneralDashboard></GeneralDashboard>
            </TabPane>
          :null
        }
      </TabContent>
    </React.Fragment>
  );
}
export default Dashboard;