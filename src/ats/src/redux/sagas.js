// @flow
import { all } from 'redux-saga/effects';
import authSaga from './auth/saga';
import layoutSaga from './layout/saga';
import appMenuSaga from './appMenu/saga';
import userSaga from './user/sagas';
import requirementSagas from './requirement/sagas';
import clientSagas from './client/sagas';
import recruiterSagas from './recruiter/sagas';
import attendanceSagas from './attendance/sagas';
import attendanceHrSagas from './attendancehr/sagas';
import listSagas from './list/sagas';
import activitySagas from './activity/sagas';
import teamSagas from './teammaster/sagas';
import roleSagas from './role/sagas';
import leaveSagas from './leave/sagas';
import holidaySagas from './holiday/sagas';
import cwsSagas from './clientwisesales/sagas';
import salesUserSagas from './salesuser/sagas';
import reqReportSagas from './allreport/sagas';
import teamLeadSagas from './teamLead/sagas';
import revenueSagas from './salesrevenue/sagas';
import monthSagas from './salesmonthreport/sagas';
import callSagas from './salescallreport/sagas'
import reportingManSagas from './reportingmanager/sagas'
import reqSagas from './req/sagas'
import salarySlipSagas from './salaryslip/sagas'
import profileSagas from './profile/sagas';
import empReviewSagas from './appraisal/sagas';
import todayListSagas from './dashboardTables/today/sagas';
import yesterdayListSagas from './dashboardTables/yesterday/sagas';
import weekListSagas from './dashboardTables/week/sagas';
import monthListSagas from './dashboardTables/month/sagas';
import dateListSagas from './dashboardTables/date/sagas';
import pendingApprovalSagas from './dashboardTables/general/sagas';
import notificationSagas from './notification/sagas';
import birthdaySagas from './monthbirthday/sagas';
import docsSagas from './uploaddocs/sagas';
export default function* rootSaga(getState: any): any {
    yield all( [
        authSaga(), 
        layoutSaga(), 
        appMenuSaga(), 
        userSaga(),
        requirementSagas(),
        clientSagas(),
       recruiterSagas(),
       attendanceSagas(),
       listSagas(),
       activitySagas(),
       teamSagas(),
       roleSagas(),
       leaveSagas(),
       holidaySagas(),
       cwsSagas(),
       salesUserSagas(),
       reqReportSagas(),
       teamLeadSagas(),
       revenueSagas(),
       monthSagas(),
       callSagas(),
       reportingManSagas(),
       reqSagas(),
       salarySlipSagas(),
       attendanceHrSagas(),
       profileSagas(),
       empReviewSagas(),
       todayListSagas(),
       yesterdayListSagas(),
       weekListSagas(),
       monthListSagas(),
       dateListSagas(),
       pendingApprovalSagas(),
       notificationSagas(),
       birthdaySagas(),
       docsSagas()
    ] );
}
