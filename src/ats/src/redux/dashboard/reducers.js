import {SET_GENERAL_ANALYSIS, SET_MONTH_ANALYSIS, SET_MONTH_GRAPH_ANALYSIS, SET_MONTH_TARGET_GRAPH_ANALYSIS, SET_MONTH_TARGET_GRAPH_ANALYSIS_ADMIN, SET_TILLDATE_ANALYSIS, SET_TILLDATE_GRAPH_ANALYSIS, SET_TODAY_ANALYSIS, SET_TODAY_GRAPH_ANALYSIS, SET_TODAY_TARGET_GRAPH_ANALYSIS, SET_TODAY_TARGET_GRAPH_ANALYSIS_ADMIN, SET_WEEK_ANALYSIS, SET_WEEK_GRAPH_ANALYSIS, SET_WEEK_TARGET_GRAPH_ANALYSIS, SET_WEEK_TARGET_GRAPH_ANALYSIS_ADMIN, SET_YESTERDAY_ANALYSIS, SET_YESTERDAY_GRAPH_ANALYSIS, SET_YESTERDAY_TARGET_GRAPH_ANALYSIS, SET_YESTERDAY_TARGET_GRAPH_ANALYSIS_ADMIN} from './constants'

const INIT_STATE = {
    todayAnalysis:{},
    payload:{},
    error:''
}

export default( state = INIT_STATE, action ) => {
    switch( action.type ){
        case  SET_TODAY_ANALYSIS:
            return{
                ...state,
                todayAnalysis: action.payload
            };
        case  SET_TODAY_GRAPH_ANALYSIS:
            return{
                ...state,
                todayGraphAnalysis: action.payload
            };
        case  SET_TODAY_TARGET_GRAPH_ANALYSIS:
            return{
                ...state,
                todayTargetGraphAnalysis: action.payload
            };
        case  SET_TODAY_TARGET_GRAPH_ANALYSIS_ADMIN:
            return{
                ...state,
                todayTargetGraphAnalysisAdmin: action.payload
            };
        case  SET_YESTERDAY_ANALYSIS:
            return{
                ...state,
                yesterdayAnalysis: action.payload
            };
        case  SET_YESTERDAY_GRAPH_ANALYSIS:
            return{
                ...state,
                yesterdayGraphAnalysis: action.payload
            };
        case  SET_YESTERDAY_TARGET_GRAPH_ANALYSIS:
            return{
                ...state,
                yesterdayTargetGraphAnalysis: action.payload
            };
        case  SET_YESTERDAY_TARGET_GRAPH_ANALYSIS_ADMIN:
            return{
                ...state,
                yesterdayTargetGraphAnalysisAdmin: action.payload
            };
        case  SET_WEEK_ANALYSIS:
            return{
                ...state,
                weekAnalysis: action.payload
            };
        case  SET_WEEK_GRAPH_ANALYSIS:
            return{
                ...state,
                weekGraphAnalysis: action.payload
            };
        case  SET_WEEK_TARGET_GRAPH_ANALYSIS:
            return{
                ...state,
                weekTargetGraphAnalysis: action.payload
            };
        case  SET_WEEK_TARGET_GRAPH_ANALYSIS_ADMIN:
            return{
                ...state,
                weekTargetGraphAnalysisAdmin: action.payload
            };
        case  SET_MONTH_ANALYSIS:
            return{
                ...state,
                monthAnalysis: action.payload
            };   
        case  SET_MONTH_GRAPH_ANALYSIS:
            return{
                ...state,
                monthGraphAnalysis: action.payload
            };
        case  SET_MONTH_TARGET_GRAPH_ANALYSIS:
            return{
                ...state,
                monthTargetGraphAnalysis: action.payload
            };
        case  SET_MONTH_TARGET_GRAPH_ANALYSIS_ADMIN:
            return{
                ...state,
                monthTargetGraphAnalysisAdmin: action.payload
            };
        case  SET_TILLDATE_ANALYSIS:
            return{
                ...state,
                tillDateAnalysis: action.payload
            };
        case  SET_TILLDATE_GRAPH_ANALYSIS:
            return{
                ...state,
                tillDateGraphAnalysis: action.payload
            };
        case  SET_GENERAL_ANALYSIS:
            return{
                ...state,
                generalAnalysis: action.payload
            };
        default:
            return state;
    }
};