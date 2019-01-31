import { FETCH_STUDENTS } from '../actions/types';

const INITIAL_STATE = {
    students: []
};

export default function (state=INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_STUDENTS:
            return {...state, students: action.payload};
        default:
            return state;
    }
};
