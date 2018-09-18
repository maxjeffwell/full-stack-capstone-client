// 2 separate reducers / 2 separate pieces of state
// one reducer records whether the user is logged in
// the other records the student data a user has fetched

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // renaming import statement with as helper
import auth from './auth';
import studentsReducer from './studentsReducer';

export default combineReducers({
    auth,
    form: formReducer,
    students: studentsReducer
});
