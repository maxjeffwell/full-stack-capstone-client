import { FETCH_STUDENTS, DELETE_STUDENT } from '../actions/types';

const INITIAL_STATE = {
    students: []
};

export default function (state=INITIAL_STATE, action) {
    switch (action.type) {
        case DELETE_STUDENT:
            const students = state.students.filter(student => student.id !== action.id);
            return {
                ...state,
                students: students
            };
        case FETCH_STUDENTS:
            return {...state, students: action.payload};
        default:
            return state;
    }
};
