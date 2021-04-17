import { actions } from 'react-redux-form';
import { Switch } from 'react-router-dom';
import * as ActionTypes from './ActionTypes';

export const Feedback = (state = {
    errMess: null,
    feedback: [],}, action) => {
    switch(action.type){
        case ActionTypes.ADD_FEEDBACK:
            return {...state, err: null, feedback: action.payload}

        case ActionTypes.FEEDBACK_FAILED:
            return {...state, err: action.payload, feedback: []}
        default:
            return state;
    }
}