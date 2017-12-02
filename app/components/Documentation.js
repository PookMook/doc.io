import React, {Component} from 'react';
import * as action from '../actions/types';
import { doc } from '../styles/doc.scss';
import Category from './Documentation/Category';
import store from '../store/store';

export default class Documentation extends Component {

    constructor(props) {
        super(props);
        this.state = { filter: store.getState().documentation.filter,  loaded: ( store.getState().documentation.compiledAt ? true : false )};
        this.handleFilter = this.handleFilter.bind(this);
        this.fetchAPI = this.fetchAPI.bind(this);
        if(!this.state.loaded) {
            this.fetchAPI();
        }
    }

    fetchAPI() {
        const that = this;
        fetch('/fullList.json')
        .then((data) => data.json())
        .then(function updateRedux(json) {
            store.dispatch({ type: action.BUILD, value: json});
            that.setState({loaded: true});
        });
    }

    handleFilter(e) {
        this.setState({ filter: e.target.value});
        store.dispatch({ type: action.FILTER, payload: e.target.value});
    }

    render() {
        return (
          <div className={doc}>
            <input value={this.state.filter} onChange={this.handleFilter} placeholder="Search" />
            {!this.state.loaded && <p>Loading...</p>}
            {this.state.loaded && store.getState().documentation.filteredList.map((item) => (<Category {...item} key={'Category' + item.id} />))}
          </div>
        );
    }
}
