import {GET_LIST} from '../actions/types';

const initialState ={
    student_list :null,
};

export default function (state=initialState, action){
    switch (action.type){
        case GET_LIST:
            return{
                ...state,
                student_list: action.payload,
            };
        default:
            return state;
    }
};