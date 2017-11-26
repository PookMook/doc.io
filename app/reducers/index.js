import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import fullList from '../helpers/fullList';

const documentation = (state = { fullList: fullList, filteredList: fullList, filter: ''}, action) => {
    switch (action.type) {
        case types.FILTER:
            state.filter = action.payload;
            return state;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    documentation,
    routing
});

export default rootReducer;
