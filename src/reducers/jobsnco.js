import {
    JOB_NOT_CREATE_ORDER,
} from "../actions/actionTypes";

var initialState = [];

const jobsnco = (state = initialState, action) => {
    switch (action.type) {
        case JOB_NOT_CREATE_ORDER:
            state = action.jobs;
            return [...state];
        default:
            return state;
    }
};

export default jobsnco;