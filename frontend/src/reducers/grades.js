import {GET_GRADES} from '../actions/types';

const initialState ={
    grades_data :null,
};

export default function (state=initialState, action){
    switch (action.type){
        case GET_GRADES:
            return{
                ...state,
                grades_data: action.payload,
            };
        default:
            return state;
    }
};