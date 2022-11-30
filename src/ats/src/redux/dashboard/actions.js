
import { SET_GENERAL_ANALYSIS, SET_MONTH_ANALYSIS, SET_MONTH_GRAPH_ANALYSIS, SET_MONTH_TARGET_GRAPH_ANALYSIS, SET_MONTH_TARGET_GRAPH_ANALYSIS_ADMIN, SET_TILLDATE_ANALYSIS, SET_TILLDATE_GRAPH_ANALYSIS, SET_TODAY_ANALYSIS, SET_TODAY_GRAPH_ANALYSIS, SET_TODAY_TARGET_GRAPH_ANALYSIS, SET_TODAY_TARGET_GRAPH_ANALYSIS_ADMIN, SET_WEEK_ANALYSIS, SET_WEEK_GRAPH_ANALYSIS, SET_WEEK_TARGET_GRAPH_ANALYSIS, SET_WEEK_TARGET_GRAPH_ANALYSIS_ADMIN, SET_YESTERDAY_ANALYSIS, SET_YESTERDAY_GRAPH_ANALYSIS, SET_YESTERDAY_TARGET_GRAPH_ANALYSIS, SET_YESTERDAY_TARGET_GRAPH_ANALYSIS_ADMIN } from './constants';


export const setTodayAnaysis = ( data ) => ( {
  type: SET_TODAY_ANALYSIS,
  payload: data
});

export const setTodayGraphAnaysis = ( data ) => ( {
  type: SET_TODAY_GRAPH_ANALYSIS,
  payload: data
});
export const setTodayTargetGraphAnalysis = ( data ) => ( {
  type: SET_TODAY_TARGET_GRAPH_ANALYSIS,
  payload: data
});
export const setTodayGraphAnalysisAdmin = ( data ) => ( {
  type: SET_TODAY_TARGET_GRAPH_ANALYSIS_ADMIN,
  payload: data
});

export const setYesterdayAnaysis = ( data ) => ( {
  type: SET_YESTERDAY_ANALYSIS,
  payload: data
});

export const setYesterdayGraphAnaysis = ( data ) => ( {
  type: SET_YESTERDAY_GRAPH_ANALYSIS,
  payload: data
});
export const setYesterdayTargetGraphAnalysis = ( data ) => ( {
  type: SET_YESTERDAY_TARGET_GRAPH_ANALYSIS,
  payload: data
});
export const setYesterdayTargetGraphAnalysisAdmin = ( data ) => ( {
  type: SET_YESTERDAY_TARGET_GRAPH_ANALYSIS_ADMIN,
  payload: data
});

export const setWeekAnaysis = ( data ) => ( {
  type: SET_WEEK_ANALYSIS,
  payload: data
});
export const setWeekGraphAnaysis = ( data ) => ( {
  type: SET_WEEK_GRAPH_ANALYSIS,
  payload: data
});

export const setWeekTargetGraphAnaysis = ( data ) => ( {
  type: SET_WEEK_TARGET_GRAPH_ANALYSIS,
  payload: data
});
export const setWeekTargetGraphAnaysisAdmin = ( data ) => ( {
  type: SET_WEEK_TARGET_GRAPH_ANALYSIS_ADMIN,
  payload: data
});

export const setMonthAnaysis = ( data ) => ( {
  type: SET_MONTH_ANALYSIS,
  payload: data
});
export const setMonthGraphAnaysis = ( data ) => ( {
  type: SET_MONTH_GRAPH_ANALYSIS,
  payload: data
});
export const setMonthTargetGraphAnaysis = ( data ) => ( {
  type: SET_MONTH_TARGET_GRAPH_ANALYSIS,
  payload: data
});
export const setMonthTargetGraphAnaysisAdmin = ( data ) => ( {
  type: SET_MONTH_TARGET_GRAPH_ANALYSIS_ADMIN,
  payload: data
});

export const setTillDateAnalysis = ( data ) => ( {
  type: SET_TILLDATE_ANALYSIS,
  payload: data
});
export const setTillDateGraphAnalysis = ( data ) => ( {
  type: SET_TILLDATE_GRAPH_ANALYSIS,
  payload: data
});

export const setGeneralAnalysis = ( data ) => ( {
  type: SET_GENERAL_ANALYSIS,
  payload: data
});