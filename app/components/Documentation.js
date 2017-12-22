import React, {Component} from 'react';
import * as action from '../actions/types';
import { doc } from '../styles/doc.scss';
import Category from './Documentation/Category';
import store from '../store/store';
import doubleDigit from '../helpers/doubleDigit';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

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
            that.props.buildState(json);
        });
    }

    handleFilter(e) {
        this.setState({ filter: e.target.value});
        this.props.searchItem(e.target.value);
        store.dispatch({ type: action.FILTER, payload: e.target.value});
    }

    render() {
        const documentation = store.getState().documentation;
        return (
          <div className={doc}>
            <input value={this.state.filter} onChange={this.handleFilter} placeholder="Search" />
            {!this.state.loaded && <p>Loading...</p>}
            {this.state.loaded &&
            <p onClick={this.fetchAPI}>Last update {doubleDigit(documentation.compiledAt.getDate())}/{doubleDigit(documentation.compiledAt.getMonth())} {doubleDigit(documentation.compiledAt.getHours())}:{doubleDigit(documentation.compiledAt.getMinutes())}</p>}
            <Link  to="/">{documentation.title}</Link>
            {this.state.loaded && documentation.filteredList.map((item) => (<Category {...item} key={'Category' + item.id} css={doc}/>))}
            <p>{this.props.state.filteredList && JSON.stringify(this.props.state.filteredList)}</p>
          </div>
        );
    }
}

Documentation.propTypes = {
    props: PropTypes.object,
    state: PropTypes.object,
    searchItem: PropTypes.function
};
