import { FETCH_STUDENTS, DELETE_STUDENT, FETCH_STUDENT } from '../actions/types';

const INITIAL_STATE = {
    students: [],
    modalProps: { open: false },

};

export default function (state=INITIAL_STATE, action) {
    switch (action.type) {
        case DELETE_STUDENT:
            const students = state.students.filter(student => student._id !== action.payload);
            return {
                ...state, students: students, modalProps: { open: false } };
        case FETCH_STUDENTS:
            return {
                ...state, students: action.payload };
        case FETCH_STUDENT:
            return {
                ...state, [action.payload.id]: action.payload };
        default:
            return state;
    }
};
