import axios from 'axios';
import {
    USER_LOADING,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
} from './types';

export const loadUser = ()=>(dispatch, getState)=>{
    dispatch(
        { 
            type:USER_LOADING,
         }
    );
    const token = getState().auth.token;

    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    }

    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.get('http://localhost:8000/profile', config)
        .then(res=>{
            dispatch(
                { type:USER_LOADED,
                payload:res.data, }
            );
        })
        .catch(err=>{
            console.log(err);
            dispatch({
                type:AUTH_ERROR,
            });
        })
}

export const login = ({username, password})=>(dispatch)=>{
    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    }
    const body = JSON.stringify({username, password});

    axios.post('http://localhost:8000/login/',body, config)
        .then(res=>{
            dispatch(
                { type:LOGIN_SUCCESS,
                payload:res.data, }
            );
        })
        .catch(err=>{
            console.log(err);
            dispatch({
                type:LOGIN_FAIL,
            });
        })
}

export const logout = ()=>(dispatch, getState)=>{
    const token = getState().auth.token;

    const config = {
        headers:{
            'Content-Type':'application/json',
        }
    }

    if(token){
        config.headers['Authorization'] = `Token ${token}`;
    }

    axios.post('http://localhost:8000/logout/',null, config)
        .then(res=>{
            dispatch(
                { type:LOGOUT_SUCCESS,
                payload:res.data, }
            );
        })
        .catch(err=>{
            console.log(err);
        })
}