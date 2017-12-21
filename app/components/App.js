import React, {Component} from 'react';
import Routes from '../routes';
import Documentation from './Documentation';
import { app } from '../styles/app.scss';
import '../helpers/fullList.json';
import _ from 'lodash';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {fullList: [], filteredList: [], filter: '', title: 'Mon titre par défaut', desc: ''};
        this.updateState = this.updateState.bind(this);
    }

    updateState(target, value) {
        this.setState((state)=>_.set(state, target, value));
    }

    buildState(value) {
        this.setState(function buildState(state) {
            const builtState = Object.assign({}, state);
            builtState.compiledAt = new Date(value.compiledAt);
            builtState.title = value.title;
            builtState.desc = value.desc;
            builtState.fullList = value.categories;
            builtState.categoryById = [];
            builtState.itemById = [];

            for (let i = 0; i < builtState.fullList.length; i++) {
                builtState.categoryById[builtState.fullList[i].id] = builtState.fullList[i];
                for (let j = 0; j < builtState.fullList[i].subList.length; j++) {
                    builtState.itemById[builtState.fullList[i].subList[j].id] = builtState.fullList[i].subList[j];
                }
            }
            return this.filterItems(builtState, builtState.filter);
        });
    }

    filterItems(state, filterString) {
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


    render() {
        return(
            <div className={app}>
                <Documentation state={this.state}/>
                <div>
                  <Routes state={this.state}/>
                </div>
            </div>
        );
    }
}
