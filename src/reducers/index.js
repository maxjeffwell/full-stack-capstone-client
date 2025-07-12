// 2 separate reducers / 2 separate pieces of state
// one reducer records whether the user is logged in
// the other records the student data a user has fetched

import { combineReducers } from 'redux';
import toggleReducer from './toggleReducer';
import authReducer from './auth';
import studentsReducer from './studentsReducer';
import signupReducer from './signupReducer';
import ModalReducer from './modalReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  isSidebarToggled: toggleReducer,
  students: studentsReducer,
  signup: signupReducer,
  modals: ModalReducer,
});
