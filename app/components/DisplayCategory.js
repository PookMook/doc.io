import React, {Component} from 'react';
import PropTypes from 'prop-types';
import store from '../store/store';
import { doc } from '../styles/doc.scss';
import Category from './Documentation/Category';

export default class DisplayItem extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            category: this.props.match.params.category
        };
    }

    render() {
        const documentation = store.getState().documentation;
        return (
          <div className={doc}>
          {documentation.categoryById && documentation.categoryById[this.state.category] && <Category {...documentation.categoryById[this.state.category]} />
          }
          </div>
        );
    }
}

DisplayItem.propTypes = {
    props: PropTypes.object,
    match: PropTypes.object,
    params: PropTypes.object,
    item: PropTypes.number,
    category: PropTypes.number,
};
