import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'; // renaming import statement with as helper
import auth from './auth';

export default combineReducers({
    auth,
    form: formReducer
});
