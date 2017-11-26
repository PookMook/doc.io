import React, {Component} from 'react';
import { configureStore } from '../store/configureStore';
import * as action from '../actions/types';

const store = configureStore();

export default class documentation extends Component {

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
          <div>
            <input value={this.state.filter} onChange={this.handleFilter}/>
            <pre>
              YOLO - {JSON.stringify(store.getState(), null, 1)}
            </pre>
          </div>
        );
    }
}
