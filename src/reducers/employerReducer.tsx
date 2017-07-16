import {
    FETCHING_THIS_EMPLOYER_JOBS,
    GET_THIS_EMPLOYER_JOBS_SUCCESS,
    REGISTER_EMPLOYER_SUCCESS
} from '../actions/employerDashboardActions';

import{
    SET_EMPLOYER
} from '../actions/authActions';
import {StoreState} from "../types/index";


// this deals with with the employer property of the state
function employerReducer(state:StoreState, action){

    switch (action.type){
        case FETCHING_THIS_EMPLOYER_JOBS:
            return state;
        case GET_THIS_EMPLOYER_JOBS_SUCCESS:
            return state;
        case REGISTER_EMPLOYER_SUCCESS:
            //will set employer after we register in the compRegisterComponent
            return state;
        case SET_EMPLOYER:
            console.log("setting employer from..", action.payload);
            return {
                ...state,
                ...action.payload
            };
        default:
            return {
                ...state
            };
    }
}

export default employerReducer;