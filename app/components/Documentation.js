import React, {Component} from 'react';
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
    }


    handleFilter(e) {
        this.setState({ filter: e.target.value});
        this.props.searchItem(e.target.value);
    }

    render() {
        const documentation = this.props.state;
        return (
          <div className={doc}>
            <input value={this.state.filter} onChange={this.handleFilter} placeholder="Search" />
            {!documentation.loaded && <p>Loading...</p>}
            {documentation.loaded &&
            <p>Last update {doubleDigit(documentation.compiledAt.getDate())}/{doubleDigit(documentation.compiledAt.getMonth())} {doubleDigit(documentation.compiledAt.getHours())}:{doubleDigit(documentation.compiledAt.getMinutes())}</p>}
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
    searchItem: PropTypes.func
};
