import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {GET_SGPA} from './types';

export const getSgpa = ()=> (dispatch, getState)=>{
    axios
    .get('http://localhost:8000/sgpa', tokenConfig(getState))
    .then((res)=>{
        dispatch({
            type:GET_SGPA,
            payload : res.data
        });
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err);
    })
}