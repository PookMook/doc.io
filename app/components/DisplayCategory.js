import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { doc } from '../styles/doc.scss';

export default class DisplayItem extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            category: this.props.match.params.category
        };
    }

    render() {
        return (
          <div className={doc}>

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
