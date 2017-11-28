import React, {Component} from 'react';
import { configureStore } from '../store/configureStore';
import * as action from '../actions/types';
import { doc } from '../styles/doc.scss';

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
          <div className={doc}>
            <input value={this.state.filter} onChange={this.handleFilter}/>

            {store.getState().documentation.filteredList.map((item) => (
              [ <h1 key={'categoryHeader' + item.id}>{item.title + ' (' + item.subList.length + ')'}</h1>,
                <ul key={'category' + item.id}>
                  {item.subList.map((subItem) => (
                    <li key={'category' + item.id + '-' + subItem.id}>{subItem.title}</li>
                  ))}
                </ul>]
            ))}
          </div>
        );
    }
}
