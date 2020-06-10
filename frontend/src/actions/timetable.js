import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {GET_TIMETABLE} from './types';

export const getTimeTable = ()=> (dispatch, getState)=>{
    axios
    .get('http://localhost:8000/timetable', tokenConfig(getState))
    .then((res)=>{
        dispatch({
            type:GET_TIMETABLE,
            payload : res.data
        });
    })
    .catch(err=>{
        // dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err);
    })
}