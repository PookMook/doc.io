import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as types from '../actions/types';

function filterItems(state, filterString) {
    const newState = Object.assign({}, state);

    // Update filter string
    newState.filter = filterString;

    // Create new filteredList from fullList
    newState.filteredList = [...state.fullList];

    // for each item, search for matching item in sublist
    newState.filteredList = newState.filteredList.map(function filter(cat) {
        const Immutablecat = Object.assign({}, cat);
        const thisSublist = [...Immutablecat.subList];
        Immutablecat.subList = thisSublist.filter(sublist => sublist.title.toLowerCase().includes(filterString.toLowerCase()));
        return Immutablecat;
    });
    return newState;
}

const documentation = (state = { fullList: [], filteredList: [], filter: ''}, action) => {
    switch (action.type) {
        case types.FILTER:
            return filterItems(state, action.payload);
        case types.BUILD:
            const builtState = Object.assign({}, state);
            builtState.compiledAt = new Date(action.value.compiledAt);
            builtState.title = action.value.title;
            builtState.desc = action.value.desc;
            builtState.fullList = action.value.categories;
            builtState.categoryById = [];
            builtState.itemById = [];

            for (let i = 0; i < builtState.fullList.length; i++) {
                builtState.categoryById[builtState.fullList[i].id] = builtState.fullList[i];
                for (let j = 0; j < builtState.fullList[i].subList.length; j++) {
                    builtState.itemById[builtState.fullList[i].subList[j].id] = builtState.fullList[i].subList[j];
                }
            }
            return filterItems(builtState, builtState.filter);
        default:
            return state;
    }
};


const rootReducer = combineReducers({
    documentation,
    routing
});

export default rootReducer;
