import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {GET_ATTENDANCE} from './types';

export const getAttendance = ()=> (dispatch, getState)=>{
    axios
    .get('http://localhost:8000/attendance', tokenConfig(getState))
    .then((res)=>{
        dispatch({
            type:GET_ATTENDANCE,
            payload : res.data
        });
    
    })
    .catch(err=>{
        // dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err);
    })
}