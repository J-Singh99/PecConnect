import {combineReducers} from 'redux';
import auth from './auth';
import attendance from './attendance';
import messages from './messages';
import grades from './grades';
export default combineReducers({
    auth,
    attendance,
    messages,
    grades,
});