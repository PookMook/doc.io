import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';
import fullList from '../helpers/fullList';

const documentation = (state = { fullList: fullList, filteredList: [...fullList], filter: ''}, action) => {
    switch (action.type) {
        case types.FILTER:
            const newState = Object.assign({}, state);

            // Update filter string
            newState.filter = action.payload;

            // Create new filteredList from fullList
            newState.filteredList = [...state.fullList];

            // for each item, search for matching item in sublist
            newState.filteredList = newState.filteredList.map(function filter(cat) {
                const Immutablecat = Object.assign({}, cat);
                const thisSublist = [...Immutablecat.subList];
                Immutablecat.subList = thisSublist.filter(sublist => sublist.title.toLowerCase().includes(action.payload.toLowerCase()));
                return Immutablecat;
            });
            return newState;
        case types.BUILD:
            const builtState = Object.assign({}, state);
            builtState.categoryById = [];
            builtState.itemById = [];

            for (let i = 0; i < builtState.fullList.length; i++) {
                builtState.categoryById[builtState.fullList[i].id] = builtState.fullList[i];
                for (let j = 0; j < builtState.fullList[i].subList.length; j++) {
                    builtState.itemById[builtState.fullList[i].subList[j].id] = builtState.fullList[i].subList[j];
                }
            }
            return builtState;
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    documentation,
    routing
});

export default rootReducer;
