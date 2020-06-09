import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import {GET_LIST} from './types';

export const getList = ({code, sem})=> (dispatch, getState)=>{
    axios
    .get(`http://localhost:8000/slist/?code=${code}&sem=${sem}`, tokenConfig(getState))
    .then((res)=>{
        dispatch({
            type:GET_LIST,
            payload : res.data
        });
    
    })
    .catch(err=>{
        dispatch(returnErrors(err.response.data, err.response.status));
        console.log(err);
    })
}