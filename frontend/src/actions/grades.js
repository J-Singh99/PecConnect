import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {GET_GRADES} from './types';

export const getGrades = ()=> (dispatch, getState)=>{
    axios
    .get('http://localhost:8000/grades', tokenConfig(getState))
    .then((res)=>{
        dispatch({
            type:GET_GRADES,
            payload : res.data
        });
    
    })
    .catch(err=>{
        // dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err);
    })
}