import React, {Component} from 'react';
import Routes from '../routes';
import Header from './Header';
import Documentation from './Documentation';
import { app, closedDoc } from '../styles/app.scss';
import '../helpers/fullList.json';
import stripSearch from '../helpers/stripSearch';
String.prototype.stripSearch = stripSearch;
import _ from 'lodash';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loaded: false, fullList: [], filteredList: [], filter: '', title: 'Mon titre par défaut', desc: '', closedDoc: false};
        this.updateState = this.updateState.bind(this);
        this.buildState = this.buildState.bind(this);
        this.searchItem = this.searchItem.bind(this);
        this.fetchAPI = this.fetchAPI.bind(this);
        this.toggleDoc = this.toggleDoc.bind(this);
        if(!this.state.loaded) {
            this.fetchAPI();
        }
    }

    fetchAPI() {
        const that = this;
        fetch('/fullList.json')
        .then((data) => data.json())
        .then(function updateRedux(json) {
            that.buildState(json);
        });
    }

    updateState(target, value) {
        this.setState((state)=>_.set(state, target, value));
    }

    buildState(value) {
        this.setState(function buildState(state) {
            const builtState = Object.assign({}, state);
            builtState.loaded = true;
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

    searchItem(filterString) {
        this.setState(function search(state) {
            return this.filterItems(state, filterString);
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
            Immutablecat.subList = thisSublist.filter(sublist => sublist.title.stripSearch().includes(filterString.stripSearch()));
            return Immutablecat;
        });
        return newState;
    }

    toggleDoc() {
        this.setState({closedDoc: !this.state.closedDoc});
    }


    render() {
        return(
            <div className={this.state.closedDoc ? app + ' ' + closedDoc : app}>
                <Documentation state={this.state} buildState={this.buildState} searchItem={this.searchItem} toggleDoc={this.toggleDoc}/>
                <div>
                  <Header state={this.state} toggleDoc={this.toggleDoc}/>
                  <Routes state={this.state}/>
                </div>
            </div>
        );
    }
}
