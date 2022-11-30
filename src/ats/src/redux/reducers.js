// @flow

import { combineReducers } from 'redux';
import Layout from './layout/reducers';
import Auth from './auth/reducers';
import AppMenu from './appMenu/reducers';
import Users from './user/reducers'
import Requirements from './requirement/reducers';
import Client from './client/reducers';
import Recruiter from './recruiter/reducers';
import Attendance from './attendance/reducers';
import AttendanceHr from './attendancehr/reducers';
import List from './list/reducers';
import Activity from './activity/reducers';
import Teams from './teammaster/reducers';
import Role from './role/reducers';
import Leave from './leave/reducers';
import Holiday from './holiday/reducers';
import CWS from './clientwisesales/reducers';
import SalesUser from './salesuser/reducers';
import Report from'./allreport/reducers';
import TeamLead from'./teamLead/reducers';
import SalesRevenue from'./salesrevenue/reducers';
import SalesMonthReport from'./salesmonthreport/reducers';
import SalesCallReport from'./salescallreport/reducers';
import ReportingManager from './reportingmanager/reducers'
import Req from './req/reducers'
import SalarySlip from './salaryslip/reducers';
import Profile from './profile/reducers';
import Dashboard from './dashboard/reducers';
import EmpReview from './appraisal/reducers';
import todayList from './dashboardTables/today/reducers'
import yesterdayList from './dashboardTables/yesterday/reducers';
import weekList from './dashboardTables/week/reducers'
import monthList from './dashboardTables/month/reducers'
import dateList from './dashboardTables/date/reducers'
import PendingApproval from './dashboardTables/general/reducers'
import Notification from './notification/reducers'
import Birthday from './monthbirthday/reducers'
import Docs from './uploaddocs/reducers'
export default combineReducers({
    Auth,
    AppMenu,
    Layout,
    Users,
    Requirements,
    Client,
    Recruiter,
    Attendance,
    List,
    Activity,
    Teams,
    Role,
    Leave,
    Holiday,
    CWS,
    SalesUser,
    Report,
    TeamLead,
    SalesRevenue,
    SalesMonthReport,
    SalesCallReport,
    ReportingManager,
    Req,
    SalarySlip,
    AttendanceHr,
    Profile,
    Dashboard,
    EmpReview,
    todayList,
    yesterdayList,
    weekList,
    monthList,
    dateList,
    PendingApproval,
    Notification,
    Birthday,
    Docs
});
