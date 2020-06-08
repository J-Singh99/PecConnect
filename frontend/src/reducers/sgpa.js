import {GET_SGPA} from '../actions/types';

const initialState ={
    sgpa_data :null,
};

export default function (state=initialState, action){
    switch (action.type){
        case GET_SGPA:
            return{
                ...state,
                sgpa_data: action.payload,
            };
        default:
            return state;
    }
};
