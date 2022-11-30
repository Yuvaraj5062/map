
import axios from 'axios';
import api from './axios';
import baseUrl from './baseurl'


let newBaseUrl="https://atsdevelopmentapi.archesoftronix.in/"


export const getRequirementList = () => {
   return api.get('/Requirement_Master');
};
export const setRequirement = (req) => {
   return api.post('/Requirement_Master', req);
};
export const updateRequirement = (req) => {
   return api.put('/Requirement_Master', req);
};
export const getCriticleRequirementList = () => {
   return api.get('/CriticalRequirement');
};

export const editRequirement = () => {
   return api.get(`/Requirement_Master`);
};
//Client
export const getClientList = () => {
   return api.get('/client_master');
};
export const setClient = (createclients) => {
   return api.post('/client_master', createclients);
};
export const updateClient = (client) => {
   return api.put('/client_master', client);
};
export const deleteClient = (id) => {
   return api.delete('/client_master/' + id);
};

// recruter master
export const getRecruiterList = () => {
   return api.get('/Recruiter_Mst');
};

export const setRecruiter = (recruiters) => {
   return api.post('/Recruiter_Mst', recruiters);
};


/** Puestos endpoints */

export const getRqsList = () => {
   return api.get('/Recruiter_Mst');
};

export const setRqs = (puesto) => {
   return api.post('/Recruiter_Mst', puesto);
};
export const getAttendance = () => {
   return api.get(`/Attendance_Master`);
};
export const getProfile = (id) => {
   return api.get(`/User_Master/${id}`);
};
//Profile
export const setProfileImage = (data) => {
   //return api.post( 'http://192.168.1.84:323/api/UserProfileImage',data);
   return api.post('/UserProfileImage', data);

};
export const getUserProfile = (id) => {
   //return api.get( `http://192.168.1.84:323/api/user_master/${id}` );
   return api.get(`/user_master/${id}`);
};


export const getAttendanceHr = (username, month, year) => {
   return api.get(`/Attendance_Master?username=${username}&month=${month}&year=${year}`);
};
export const setAttendance = (attendance) => {
   return api.post('Attendance_Master', attendance);
};

export const getListList = () => {
   return api.get('/OfferList');
};

//offer List
export const getOfferList = () => {
   return api.get('/OfferList');
};
//ViewToBeJoin
export const getViewToBeJoinList = (username) => {
   return api.get(`/TobeJoinList?userName=${username}`);
};
//JoinList
export const getJoinList = () => {
   return api.get('/GetStartList');
};
//BDList
export const getBDList = () => {
   return api.get('/BDList');
};

//ACtivity Pages Daily Target 
//Daily Target List
export const getDailyTargetList = () => {
   return api.get('/DailyTarget');
};
//TodaysInterview
export const getTodaysInterviewtList = () => {
   return api.get('/TodaysInterview');
};
//Month Offer
export const getMonthOfferList = () => {
   return api.get('/MonthOffer');
};
//Month to Be Join
export const getMonthToBeJoinList = () => {
   return api.get('/MonthToBeJoin');
};
//ATS Activity
export const getAtsActivityList = () => {
   return api.get('/ActivityMaster');
};
//Graph api
export const getAtsGraphList = (username) => {
   return api.get(`/GraphMaster?userName=${username}`);
};
//Team master
export const getTeamList = () => {
   return api.get('/TeamMaster');
};

//Reporting manager list getReportingMan
export const getReportingMan = () => {
   return api.get('/ReportingManager');
};
export const setTeam = (createteam) => {
   return api.post('/TeamMaster', createteam);
};
export const updateTeam = (team) => {
   return api.put('/TeamMaster', team);
};
export const deleteTeam = (id) => {
   return api.delete('/TeamMaster/' + id);
};
//User master 
export const getUserList = () => {
   return api.get('/User_Master');
};
export const setUser = (user) => {
   return api.post('/User_Master', user);
};

export const updateUser = (user) => {
   return api.put('/User_Master', user);
};

export const deleteUser = (user) => {
   return api.delete('/User_Master', {
      headers: { 'Content-Type': 'application/json' },
      data: user
   });
};
// Team Lead Master 
export const getTeamLead = () => {
   return api.get('/TeamLead_Master');
};
//Role master 
export const getRoleList = () => {
   return api.get('/UserRole_Master');
};
//Role master 
export const createRole = (createrole) => {
   return api.post('/UserRole_Master', createrole);
};
//leave
export const getLeave = (username) => {

   if (username.getUserrole === 'Manager') {
      return api.get(`ReportingMangagerLeaveStatus?Username=${username.getUsername}`,);
   }
   else if (username.getUserrole === 'HR') {
      return api.get(`HRLeaveStatus?Username=${username.getUsername}`,);
   }
   else {
      return api.get(`LeaveMaster?username=${username.getUsername}`,)
   }

};
export const getLeaveBalance = (username) => {

   return api.get(`LeaveBalance2?username=${username}`,);
};
//holiday
export const getHoliday = () => {
   return api.get('/HolidayMaster',);
};
export const setHoliday = (holiday) => {
   return api.post('/HolidayMaster', holiday);
};
export const deleteHoliday = (id) => {
   return api.delete('/HolidayMaster/' + id);
};
//client wise sales
export const getCwsList = () => {
   return api.get('/SalesClientMaster');
};
export const setCws = (createcws) => {
   return api.post('/SalesClientMaster', createcws);
};
//sales user list
export const getSalesUserList = () => {
   return api.get('/SalesUser');
}
//requirement progress report 
export const getReqReport = () => {
   return api.get('/RequirementProgressReport');
}
//datewsie report 
export const getDatewiseReport = (username, startdate, enddate, clientId) => {
   return api.get(`/DateWiseCountReportMaster?username=${username}&ssd=${startdate}&eed=${enddate}&clientId=${clientId}`);
}
// month count report 
//datewsie report 
export const getMonthCountReport = (username) => {
   return api.get(`/MonthReport?username=${username}`);
}
//today report 
export const getTodayReport = (username) => {
   return api.get(`/TodayReport?username=${username}`);
}
//today report 
export const getRevenuReport = (username, startdate, enddate) => {
   return api.get(`/RevenueReportDateWise?username=${username}&ssd=${startdate}&eed=${enddate}`);
}
// Sales Revenue 
export const getRevenueList = () => {
   return api.get('/SalesMonthlyRevenueReport');
};
export const setRevenue = (revenue) => {
   return api.post('/SalesMonthlyRevenueReport', revenue);
};
// Sales Month Report 
export const getMonthList = () => {
   return api.get('/SalesMonthlyReport');
};
export const setMonth = (month) => {
   return api.post('/SalesMonthlyReport', month);
};
// Sales Call Report 
export const getCallList = (username) => {
   return api.get(`/SalesClientCallRecordMaster?username=${username}`);
};
export const setCall = (call) => {
   return api.post('/SalesClientCallRecordMaster', call);
};
/** Departamentos endpoints */
export const getDepartamentosList = () => {
   return api.get('/Requirement_Master');
};

export const setDepartamento = (departamento) => {
   return api.post('/Requirement_Master', departamento);
};

/** Auth */
export const loginUser = (username, password) => {
   return api.post('/login', { username, password });
};

export const getUserImage = (userId) => {
   return api.post('/auth/userimage', { 'id': userId });
}

/** Validate windows focus */
export const getWindowFocusRequest = (token) => {
   return api.get(`/auth/verifysession/${token}`);
};
export const changePass = (changepass) => {
   return api.put('/ChangePassword', changepass);
};
// Salary Slip
export const getSalarySlips = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/DownloadSalarySlip', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
};

// Dashboard Today

export const getSubmissionCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/SubmissionCount', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getInterviewCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/InterviewCount', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getOfferCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/OfferCount', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getHireCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/StartCount', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}

export const getTodaysGraphData = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/TodayGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getTodayTargetGraph = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/DailyTargetGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getTargetGraphAdmin = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/PieChart', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}

// Dashboard Yesterday

export const getYesterdaySubmissionCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/SubmissionCountYesterday', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getYesterdayInterviewCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/InterviewCountYesterday', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getYesterdayOfferCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/OfferCountYesterday', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getYesterdayHireCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/StartCountYesterday', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getYesterdaysGraphData = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/YesterdayGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getYesterdayTargetGraph = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/YesterdayTargetGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}


// Dashboard Week

export const getWeekSubmissionCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/SubmissionCountWeek', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getWeekInterviewCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/InterviewCountWeek', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getWeekOfferCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/OfferCountWeek', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getWeekHireCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/StartCountWeek', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getWeekGraphData = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/WeekGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}

export const getWeekTargetGraph = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/WeekTargetGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}

// Dashboard Month

export const getMonthSubmissionCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/SubmissionCountMonth', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getMonthInterviewCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/InterviewCountMonth', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getMonthOfferCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/OfferCountMonth', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getMonthHireCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/StartCountMonth', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getMonthGraphData = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/MonthGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}

export const getMonthTargetGraph = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/MonthTargetGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}

// Dashboard TillDate

export const getTillDateSubmissionCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/SubmissionCountTillDate', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getTillDateInterviewCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/InterviewCountTillDate', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getTillDateOfferCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/OfferCountTillDate', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getTillDateHireCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/StartCountTillDate', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getTillDateGraphData = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/TilldateGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getTillDateTargetGraph = (params) => {
   return new Promise((resolve, reject) => {
      api.get('/TillDateTargetGraph', { params: params }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}

//General Tab
export const getUserCount = () => {
   return new Promise((resolve, reject) => {
      api.get('/UserCount').then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getClientCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/ClientCount', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getPendingApprovalCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/PendingApporvalCount', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getPendingOfferDetailsCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/PendingOfferDetailsCount', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getToBeJoinCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/ToBeJoinCount', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}
export const getTotalRequirementCount = (data) => {
   return new Promise((resolve, reject) => {
      api.get('/TotalRequirementCount', { params: data }).then((res) => {
         resolve(res)
      }).catch((err) => {
         reject(err)
      })
   })
}

//appraisal

export const getEmpReview = (empcode) => {
   return api.get(`/EmployeeReview?empcode=${empcode}`);
}
//dashboard tables
//todayList
export const getTodaySubmission = (username) => {
   return api.get(`SubmissionListToday?username=${username}`,);
};
export const getTodayInterview = (username) => {
   return api.get(`InterviewListToday?username=${username}`,);
};
export const getTodayOffer = (username) => {
   return api.get(`OfferListToday?username=${username}`,);
};
export const getTodayHire = (username) => {
   return api.get(`StartListToday?username=${username}`,);
};
//yesterdayList
export const getYesterdaySubmission = (username) => {
   return api.get(`SubmissionListYesterday?username=${username}`,);
};
export const getYesterdayInterview = (username) => {
   return api.get(`InterviewListYesterday?username=${username}`,);
};
export const getYesterdayOffer = (username) => {
   return api.get(`OfferListYesterday?username=${username}`,);
};
export const getYesterdayHire = (username) => {
   return api.get(`StartListYesterday?username=${username}`,);
};
//weekList
export const getWeekSubmission = (username) => {
   return api.get(`SubmissionListWeek?username=${username}`,);
};
export const getWeekInterview = (username) => {
   return api.get(`InterviewListWeek?username=${username}`,);
};
export const getWeekOffer = (username) => {
   return api.get(`OfferListWeek?username=${username}`,);
};
export const getWeekHire = (username) => {
   return api.get(`StartListWeek?username=${username}`,);
};
//monthList
export const getMonthSubmission = (username) => {
   return api.get(`SubmissionListMonth?username=${username}`,);
};
export const getMonthInterview = (username) => {
   return api.get(`InterviewListMonth?username=${username}`,);
};
export const getMonthOffer = (username) => {
   return api.get(`OfferListMonth?username=${username}`,);
};
export const getMonthHire = (username) => {
   return api.get(`StartListMonth?username=${username}`,);
};
//tillDateList
export const getDateSubmission = (username) => {
   return api.get(`SubmissionListTillDate?username=${username}`,);
};
export const getDateInterview = (username) => {
   return api.get(`InterviewListTillDate?username=${username}`,);
};
export const getDateOffer = (username) => {
   return api.get(`OfferListTillDate?username=${username}`,);
};
export const getDateHire = (username) => {
   return api.get(`StartListTillDate?username=${username}`,);
};

//general

export const getPendingApproval = (username) => {
   return api.get(`PendingApporvalList?username=${username}`,);
};
export const getPendingOffer = (username) => {
   return api.get(`PendingOfferList?username=${username}`,);
};
export const getActiveRequirement = () => {
   return api.get(`ActiveRequirementList`,);
};
export const getDeActiveRequirement = () => {
   return api.get(`DeactiveRequirement`,);
};
//notification

export const getNotification = (username) => {
   return api.get(`Notification_Master?userName=${username}`,);
};

export const getNewNotification = (username) => {
   return api.get(`New_NotificationMaster?userName=${username}`,);
};
//monthBirthday 

export const getBirthday = () => {
   return api.get(`MonthBirthday`,);
};

//user document upload

export const getDocs = () => {
   return api.get(`FileAPI/GetFiles`,);
};

export const getCalculatedCtc = (data) => { 
     // return api.get(`SalaryCTCCalculation?ctc=${data.ctc}&with_Pf=${data.with_Pf?1:0}&without_Pf=${data.without_Pf?1:0}&with_Esic=${data.with_Esic?1:0}&without_Esic=${data.without_Esic?1:0}`);
     return api.get(`SalaryCTCCalculation?ctc=${data.ctc}&with_Pf=${data.with_Pf?1:0}&with_Esic=${data.with_Esic?1:0}`);
   };

// export const getCertficates = (employeeid) => {
//    return api.get(`ExperienceAndRelievingLetter?employeeid=${employeeid}`);
// };

export const getConfirmationCertficates = (employeeid) => {
   return api.get(`ConfirmationLetterDownload?employeeid=${employeeid}`);
};

// export const getInternShipLetter = (data) => { 
//    return api.get(`InternshipLetter?employeeid=${data.employeeid}&startdate=${data.startdate}&enddate=${data.endDate}`);
// };



export const getInActiveEmp = () => {
   return api.get(`InActiveEmployeeDetails`,);
};


export const generateSalarySlip = (data) => { 
   return api.post(`GenerateSalaryArcheEmployees?month=${data.month}&year=${data.year}&companyname=${data.companyname}`);
};


//GenerateSalaryArcheEmployees?month={month}&year={year}&companyname={companyname}



export const getAllLeaveBalance = () => {
      return api.get(`LeaveBalance2`); 
 
};

export const getEmpLeaveBalance = (loginDetails) => {
   
 return api.get(`LeaveBalance2?ECode=${loginDetails.EmployeeCode}`,);

};

export const editSalarySlip = (data) => { 
   return api.post(`GenerateSalaryArcheEmployees`,data);
};

export const getEditedSalaryData = (data) => { 
   return api.get(`GenerateSalaryArcheEmployees?month=${data.month}&year=${data.year}&companyname=${data.companyname}`);
};


export const sendWelcomeEMail = (ecode) => { 
   return api.get(`NewEmployee?E_Code=${ecode}`);
}


export const editLeaves = (data) => { 
   return api.post(`UpdateLeaveBalanceByHR`,data);
};


export const downloadDocuments = (row) => { 
   return api.get(`FileAPI/GetFile?fileId=${row.id}`);
};

export const getAssignedProjectList = (userId) => { 
   return api.get(`Project?UserId=${userId}`);
};

export const getProjectsList = () => { 
   return api.get(`Project?ProjectId=0`);
};

export const getProjectList = () => { 
   return api.get(`Project?UserId=0`);
};
export const addDailyTask = (data) => { 
   return api.post(`DailyTask`,data);
};


export const getDailyWorkProgress = (data) => { 
   return api.get(`DailyTask?TaskId=${data.TaskId}&startDate=${data.startDate}&endDate=${data.endDate}&ProjectId=${data.ProjectId}&PhaseId=${data.PhaseId}&UserId=${data.UserId}`);
};

export const EmpDailyWorkProgress = () => { 
   return api.get(`DailyTask`);
};

export const createProject = (data) => { 
   return api.post(`Project`,data);
};

export const deleteProject = (ProjectId,userId) => { 
   return api.delete(`Project?ProjectId=${ProjectId}&DeletedBy=${userId}`);
};


export const deleteTask = (TaskId,userId) => { 
   return api.delete(`DailyTask?TaskId=${TaskId}&DeletedBy=${userId}`);
};


export const generateTaskReport = () => { 
  // return window.open(`${baseUrl}DailyTask)
   return api.get(`DailyTask`);
};

export const getEmailScheduleDate = () => { 
   // return window.open(`${baseUrl}DailyTask)
    return api.get(`EmailSchedule`);
 };

 export const setEmailScheduleDate = (body) => { 
   // return window.open(`${baseUrl}DailyTask)
    return api.post(`EmailSchedule`,body);
 };
 export const sendReportEmail = (recipientsEmail) => { 
   return api.post(`EmailSchedule?recipientsEmail=${recipientsEmail}`);
};
// EmailSchedule?recipientsEmail={recipientsEmail}

export const getProjectById = (id) => { 
    return api.get(`Project?ProjectId=${id}`);
 };

 export const getProjectPhaseList = (id) => { 
   return api.get(`Project?ProjectId=${id}`);
};
 
 
export const updatePhase = (body) => { 
    return api.post(`Phase`,body);
 };

 export const getActivePhase = (id) => { 
   return api.get(`Project?PhaseProjectId=${id}`);
};
 

export const forgetPassword = (email) => { 
   return api.post(`ForgetPassword?Email=${email}`);
};
 
export const resetPassword = (body) => { 
   return api.put(`ForgetPassword`,body);
}
 