import {GET_TIMETABLE} from '../actions/types';

const initialState ={
    timetable_data :null,
};

export default function (state=initialState, action){
    switch (action.type){
        case GET_TIMETABLE:
            return{
                ...state,
                timetable_data: action.payload,
            };
        default:
            return state;
    }
};
