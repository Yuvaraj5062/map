import React from 'react';
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';
import * as FeatherIcon from 'react-feather';

import { isUserAuthenticated, getLoggedInUser } from '../helpers/authUtils';
import Hr from '../pages/hr/Hr';
import Attendance from '../pages/attendance/Attedance';
import Activity from '../pages/acyivity/Activity';
import ViewUser from '../pages/dashboard/general/ViewUser';
import ViewClient from '../pages/dashboard/general/ViewClient';
//clientwisesales
import clientwisesales from '../pages/clientwisesales/ClientWiseSales';
import NoAccess from '../pages/noaccess/NoAccess';
import TodaySubmission from '../pages/dashboard/today/TodaySubmission';
import TodayInterview from '../pages/dashboard/today/TodayInterview';
import TodayOffer from '../pages/dashboard/today/TodayOffer';
import TodayHire from '../pages/dashboard/today/TodayHire';

import YesterdaySubmission from '../pages/dashboard/yesterday/YesterdaySubmission';
import YesterdayInterview from '../pages/dashboard/yesterday/YesterdayInterview';
import YesterdayOffer from '../pages/dashboard/yesterday/YesterdayOffer';
import YesterdayHire from '../pages/dashboard/yesterday/YesterdayHire';

import WeekSubmission from '../pages/dashboard/week/WeekSubmission';
import WeekInterview from '../pages/dashboard/week/WeekInterview';
import WeekOffer from '../pages/dashboard/week/WeekOffer';
import WeekHire from '../pages/dashboard/week/WeekHire';

import MonthSubmission from '../pages/dashboard/month/MonthSubmission';
import MonthInterview from '../pages/dashboard/month/MonthInterview';
import MonthOffer from '../pages/dashboard/month/MonthOffer';
import MonthHire from '../pages/dashboard/month/MonthHire';

import DateSubmission from '../pages/dashboard/date/DateSubmission';
import DateInterview from '../pages/dashboard/date/DateInterview';
import DateOffer from '../pages/dashboard/date/DateOffer';
import DateHire from '../pages/dashboard/date/DateHire';

import ViewPendingApprovalList from '../pages/dashboard/general/ViewPendingApprovalList';
import ViewPendingOfferList from '../pages/dashboard/general/ViewOfferDataList'
import ViewToBeJoin from '../pages/dashboard/general/ViewToBeJoin'
import ViewRequirement from '../pages/dashboard/general/ViewRequirement'
import ViewActiveRequirement from '../pages/dashboard/general/viewactiverequirement/ViewRequirement'
import ViewDeActiveRequirement from '../pages/dashboard/general/viewadectiverequirement/ViewRequirement'
import { TaskIcon } from '../components/SvgImages';


// auth
const Login = React.lazy(() => import('../pages/auth/Login'));
const Logout = React.lazy(() => import('../pages/auth/Logout'));
const Register = React.lazy(() => import('../pages/auth/Register'));
const ForgetPassword = React.lazy(() => import('../pages/auth/ForgetPassword'));
const ResetPassword = React.lazy(() => import('../pages/auth/ResetPassword'));
const Confirm = React.lazy(() => import('../pages/auth/Confirm'));
// dashboard
//const DashboardOld = React.lazy(() => import('../pages/dashboardOld'));
//DashboardNew
const Dashboard =React.lazy(()=> import('../pages/dashboard/Dashboard'));
//working page
//const dashboardOld =React.lazy(()=>import('../pages/dashboardOld/index'));

//Requirement
const Requirement =React.lazy(()=>import('../pages/requirement/Requirement'));
//List
const List =React.lazy(()=>import('../pages/list/List'));
//User
const Masters = React.lazy(()=> import('../pages/master/Masters'));
//Report
const Report = React.lazy(()=> import('../pages/report/Report'));
//Report
const Sales = React.lazy(()=> import('../pages/sales/Sales'));
//Hrpolicy
const HrPolicy = React.lazy(()=> import('../pages/hrpolicy/HrPolicy'));
//EmplHandbook
const EmplHandbook = React.lazy(()=> import('../pages/employehandbook/EmplHandbook'));
//Appraisal
const Appraisal = React.lazy(()=> import('../pages/appraisal/Appraisal'));
//Appraisal
const SalrySlip = React.lazy(()=> import('../pages/salaryslip/SalrySlip'));
//Profile
const Profile = React.lazy(()=> import('../pages/profile/profile'));
//ChangePassword
const ChangePassword = React.lazy(()=> import('../pages/changepassword/changepassword'));
//IntensivePolicy
const IntensivePolicy = React.lazy(()=> import('../pages/intensivepolicy/IntensivePolicy'));

//task manager

const TaskManager =React.lazy(()=>import('../pages/dailyworkreports/TaskManager'));

//Assets Management

// handle auth and authorization
const PrivateRoute = ({ component: Component, roles, ...rest }) => (
    <Route
        {...rest}
        render={props => {
            if (!isUserAuthenticated()) {
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/account/login', state: { from: props.location } }} />;
            }

            const loggedInUser = getLoggedInUser();
           // //console.log('loggedInUser=',loggedInUser);
            ////console.log('roles',roles);
            ////console.log(' roles.indexOf(loggedInUser.role) ', roles.indexOf(loggedInUser.Role) )
            // check if route is restricted by role
            if (roles && roles.indexOf(loggedInUser.Role) === -1) {
               //  //console.log('user role check', roles);
                // role not authorised so redirect to home page
                return <Redirect to={{ pathname: '/noaccess' }} />;
            }

            // authorised so return component
            return <Component {...props} />;
        }}
    />
);

// root routes
const rootRoute = {
    path: '/',
    exact: true,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: () => <Redirect to="/dashboard" />,
    route: PrivateRoute,
};
//dashboard
const dashboardRoutes = {
    path: '/dashboard',
    name: 'Dashboard',
    icon: FeatherIcon.Home,
    component: Dashboard,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const todaySubmissionRoutes = {
    path: '/todaySubmission',
    name: 'todaySubmission',
    icon: FeatherIcon.Home,
    component: TodaySubmission,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const todayInterviewRoutes = {
    path: '/todayInterview',
    name: 'todayInterview',
    icon: FeatherIcon.Home,
    component: TodayInterview,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const todayOfferRoutes = {
    path: '/todayOffer',
    name: 'todayOffer',
    icon: FeatherIcon.Home,
    component: TodayOffer,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const todayHireRoutes = {
    path: '/todayHire',
    name: 'todayHire',
    icon: FeatherIcon.Home,
    component: TodayHire,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const yesterdaySubmissionRoutes = {
    path: '/yesterdaySubmission',
    name: 'yesterdaySubmission',
    icon: FeatherIcon.Home,
    component: YesterdaySubmission,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const yesterdayInterviewRoutes = {
    path: '/yesterdayInterview',
    name: 'yesterdayInterview',
    icon: FeatherIcon.Home,
    component: YesterdayInterview,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const yesterdayOfferRoutes = {
    path: '/yesterdayOffer',
    name: 'yesterdayOffer',
    icon: FeatherIcon.Home,
    component: YesterdayOffer,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const yesterdayHireRoutes = {
    path: '/yesterdayHire',
    name: 'yesterdayHire',
    icon: FeatherIcon.Home,
    component: YesterdayHire,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const weekSubmissionRoutes = {
    path: '/weekSubmission',
    name: 'weekSubmission',
    icon: FeatherIcon.Home,
    component: WeekSubmission,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const weekInterviewRoutes = {
    path: '/weekInterview',
    name: 'weekInterview',
    icon: FeatherIcon.Home,
    component: WeekInterview,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const weekOfferRoutes = {
    path: '/weekOffer',
    name: 'weekOffer',
    icon: FeatherIcon.Home,
    component: WeekOffer,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const weekHireRoutes = {
    path: '/weekHire',
    name: 'weekHire',
    icon: FeatherIcon.Home,
    component: WeekHire,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const monthSubmissionRoutes = {
    path: '/monthSubmission',
    name: 'monthSubmission',
    icon: FeatherIcon.Home,
    component: MonthSubmission,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const monthInterviewRoutes = {
    path: '/monthInterview',
    name: 'monthInterview',
    icon: FeatherIcon.Home,
    component: MonthInterview,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const monthOfferRoutes = {
    path: '/monthOffer',
    name: 'monthOffer',
    icon: FeatherIcon.Home,
    component: MonthOffer,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const monthHireRoutes = {
    path: '/monthHire',
    name: 'monthHire',
    icon: FeatherIcon.Home,
    component: MonthHire,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const tillDateSubmissionRoutes = {
    path: '/tillDateSubmission',
    name: 'tillDateSubmission',
    icon: FeatherIcon.Home,
    component: DateSubmission,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const tillDateInterviewRoutes = {
    path: '/tillDateInterview',
    name: 'tillDateInterview',
    icon: FeatherIcon.Home,
    component: DateInterview,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const tillDateOfferRoutes = {
    path: '/tillDateOffer',
    name: 'tillDateOffer',
    icon: FeatherIcon.Home,
    component: DateOffer,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const tillDateHireRoutes = {
    path: '/tillDateHire',
    name: 'tillDateHire',
    icon: FeatherIcon.Home,
    component: DateHire,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const pendingApprovalRoutes = {
    path: '/pendingApproval',
    name: 'ViewPendingApprovalList',
    icon: FeatherIcon.Home,
    component: ViewPendingApprovalList,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const pendingOfferRoutes = {
    path: '/pendingOffer',
    name: 'ViewPendingOfferList',
    icon: FeatherIcon.Home,
    component: ViewPendingOfferList,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const viewToBeJoinRoutes = {
    path: '/viewToBeJoin',
    name: 'ViewToBeJoin',
    icon: FeatherIcon.Home,
    component: ViewToBeJoin,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const viewRequirementRoutes = {
    path: '/viewRequirement',
    name: 'ViewRequirement',
    icon: FeatherIcon.Home,
    component: ViewRequirement,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const viewActiveRequirementRoutes = {
    path: '/viewActiveRequirement',
    name: 'ViewActiveRequirement',
    icon: FeatherIcon.Home,
    component: ViewActiveRequirement,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
const viewDeActiveRequirementRoutes = {
    path: '/viewDeActiveRequirement',
    name: 'ViewDeActiveRequirement',
    icon: FeatherIcon.Home,
    component: ViewDeActiveRequirement,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};

//Requirement
const requirementRoutes= {
    path: '/reqirement',
    name: 'Requirement',
    roles:["Admin","Manager","Teamlead","Recruiter"],
    component: Requirement,
    route: PrivateRoute,
};

const taskManagerRoute= {
    path: '/task-manager',
    name: 'Task Manager',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","Account","Contract",],
    component: TaskManager,
    icon: TaskIcon,
    route: PrivateRoute,
};

//List
const listRoutes= {
    path: '/list',
    name: 'List',
    component: List,
    roles:["Admin","Manager"],
    route: PrivateRoute,
};
//Attendance
const attendanceRoutes= {
    path: '/attendance',
    name: 'Attendance',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: Attendance,
    route: PrivateRoute,
};
//HrPolicy
const hrpolicyRoutes= {
    path: '/hrpolicy',
    name: 'HrPolicy',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: HrPolicy,
    route: PrivateRoute,
};
//EmplHandbook
const emphandbookRoutes= {
    path: '/employeehandbook',
    name: 'EmployeeHandbook',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: EmplHandbook,
    route: PrivateRoute,
};



//IntensivePolicy
const intensivePolicyRoutes= {
    path: '/intensivePolicy',
    name: 'IntensivePolicy',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: IntensivePolicy,
    route: PrivateRoute,
};

//activity
const activityRoutes = {
    path: '/activity',
    name: 'Activity',
    icon: FeatherIcon.Activity,
    component: Activity,
    roles:["Admin","HR","HR Manager", "Manager"],
    route: PrivateRoute
};
//Hr
const hrRoutes = {
    path: '/hr',
    name: 'HR',
    icon: FeatherIcon.Aperture,
    component: Hr,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    route: PrivateRoute
};
// Master

const masterRoutes = {
    path: '/master',
    name: 'Master',
    icon: FeatherIcon.FileText,
    component: Masters,
    route: PrivateRoute,
    roles:["Admin","Manager","HR","HR Manager","Teamlead"],
};
//View user
const viewUserRoutes= {
    path: '/viewuser',
    name: 'View User',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: ViewUser,
    route: PrivateRoute,
};
const viewclientRoutes= {
    path: '/viewclient',
    name: 'View Client',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: ViewClient,
    route: PrivateRoute,
};
//clientwisesales
const clientWiseSalesRoutes = {
    path: '/clientwisesales',
    name: 'Client Wise Sales',
    icon: FeatherIcon.User,
    component: clientwisesales,
    route: PrivateRoute,
    roles:["Admin","Sales","HR","HR Manager",],
};
//Report
const reportRoutes = {
    path: '/report',
    name: 'Report',
    icon: FeatherIcon.FileText,
    component: Report,
    route: PrivateRoute,
    roles:["Admin","Manager"],
};
//Revenue
const revenueRoutes = {
    path: '/sales',
    name: 'Sales',
    icon: FeatherIcon.Shield,
    component: Sales,
    route: PrivateRoute,
    roles:["Admin","Sales","HR","HR Manager",],
};



   

//Aspl
const asplRoutes = {
    path: '/salaryslip',
    name: 'Salary Slip',
    icon: FeatherIcon.Download,
    component: SalrySlip,
    route: PrivateRoute,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract"],
};
//Aspl
const appraisalRoutes = {
    path: '/appraisal',
    name: 'Appraisal',
    icon: FeatherIcon.Star,
    component: Appraisal,
    route: PrivateRoute,
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract"],
};
const profileRoutes= {
    path: '/profile',
    name: 'Profile',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: Profile,
    route: PrivateRoute,
};
const noaccessRoutes= {
    path: '/noaccess',
    name: 'NoAccess',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: NoAccess,
    route: PrivateRoute,
};
const changePasswodRoutes= {
    path: '/changepassword',
    name: 'ChangePassword',
    roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
    component: ChangePassword,
    route: PrivateRoute,
};
//Rt
// const rtRoutes = {
//     path: '/rt',
//     name: 'RT',
//     icon: FeatherIcon.Download,
//     component: dashboardOld,
//     route: PrivateRoute,
//     roles:["Admin","Manager","Sales","Teamlead","Recruiter","IT","HR","HR Manager","Account","Contract",],
// };

// auth
const authRoutes = {
    path: '/account',
    name: 'Auth',
    children: [
        {
            path: '/account/login',
            name: 'Login',
            component: Login,
            route: Route,
        },
        {
            path: '/account/logout',
            name: 'Logout',
            component: Logout,
            route: Route,
        },
        {
            path: '/account/register',
            name: 'Register',
            component: Register,
            route: Route,
        },
        {
            path: '/account/confirm',
            name: 'Confirm',
            component: Confirm,
            route: Route,
        },
        {
            path: '/account/forget-password',
            name: 'Forget Password',
            component: ForgetPassword,
            route: Route,
        },

      {
            path: '/account/reset-password',
            name: 'Reset Password',
            component: ResetPassword,
            route: Route,
           // roles:["Admin","Sales","HR","HR Manager",],
        }
      
    ],
};


// flatten the list of all nested routes
const flattenRoutes = routes => {
    let flatRoutes = [];

    routes = routes || [];
    routes.forEach(item => {
        flatRoutes.push(item);

        if (typeof item.children !== 'undefined') {
            flatRoutes = [...flatRoutes, ...flattenRoutes(item.children)];
        }
    });
    return flatRoutes;
};

// All routes
const allRoutes = [    
    authRoutes,
    rootRoute,
    dashboardRoutes,
    todaySubmissionRoutes,
    todayInterviewRoutes,
    todayOfferRoutes,
    todayHireRoutes,
    yesterdaySubmissionRoutes,
    yesterdayInterviewRoutes,
    yesterdayOfferRoutes,
    yesterdayHireRoutes,
    weekSubmissionRoutes,
    weekInterviewRoutes,
    weekOfferRoutes,
    weekHireRoutes,
    monthSubmissionRoutes,
    monthInterviewRoutes,
    monthOfferRoutes,
    monthHireRoutes,
    tillDateSubmissionRoutes,
    tillDateInterviewRoutes,
    tillDateOfferRoutes,
    tillDateHireRoutes,
    pendingApprovalRoutes,
    pendingOfferRoutes,
    viewRequirementRoutes,
    viewActiveRequirementRoutes,
    viewDeActiveRequirementRoutes,
    activityRoutes,
    hrRoutes,
    masterRoutes,
    clientWiseSalesRoutes,
    reportRoutes,
    changePasswodRoutes,
    revenueRoutes,
    asplRoutes,
    noaccessRoutes,
    viewToBeJoinRoutes,
    //rtRoutes,
    requirementRoutes,
    profileRoutes,
    attendanceRoutes,
    listRoutes,
    viewUserRoutes,
    viewclientRoutes,
    hrpolicyRoutes,
    emphandbookRoutes,
    appraisalRoutes,
    intensivePolicyRoutes,
    taskManagerRoute,

];

const authProtectedRoutes = [dashboardRoutes, activityRoutes, hrRoutes, masterRoutes, clientWiseSalesRoutes,reportRoutes,revenueRoutes,asplRoutes, appraisalRoutes,taskManagerRoute];
const allFlattenRoutes = flattenRoutes(allRoutes);
export { allRoutes, authProtectedRoutes, allFlattenRoutes };
