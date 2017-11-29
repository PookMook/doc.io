import React, {Component} from 'react';
import { configureStore } from '../store/configureStore';
import * as action from '../actions/types';
import { doc } from '../styles/doc.scss';
import Category from './Documentation/Category';

const store = configureStore();

export default class Documentation extends Component {

    constructor(props) {
        super(props);
        this.state = { filter: store.getState().documentation.filter};
        this.handleFilter = this.handleFilter.bind(this);
    }

    handleFilter(e) {
        this.setState({ filter: e.target.value});
        store.dispatch({ type: action.FILTER, payload: e.target.value});
    }

    render() {
        return (
          <div className={doc}>
            <input value={this.state.filter} onChange={this.handleFilter} placeholder="Search" />
            {store.getState().documentation.filteredList.map((item) => (<Category {...item} key={'Category' + item.id} />))}
          </div>
        );
    }
}
