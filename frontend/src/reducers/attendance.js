import {GET_ATTENDANCE} from '../actions/types';

const initialState ={
    attendance_data :null,
};

export default function (state=initialState, action){
    switch (action.type){
        case GET_ATTENDANCE:
            return{
                ...state,
                attendance_data: action.payload,
            };
        default:
            return state;
    }
};
