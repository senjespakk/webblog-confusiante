import * as ActionTypes from './ActionTypes';

export const Leaders = (state = {
    errMess: null,
    isLoading: true,
    leaders: []}, action) => {
    switch(action.type){
        case ActionTypes.LEADERS_FAILED:
            return {...state, errMess: action.payload, isLoading: false, leaders: []};
        
        case ActionTypes.ADD_LEADERS:
            return {...state, errMess: null, isLoading: false, leaders: action.payload};

        case ActionTypes.LEADERS_LOADING:
            return {...state, errMess: null, isLoading: true, leaders: []};
        default:
            return state;
    }
}