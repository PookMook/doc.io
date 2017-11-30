import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import store from '../store/store';

const Fragment = React.Fragment;

export default class DisplayItem extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            item: this.props.match.params.item,
            category: this.props.match.params.category
        };
    }

    render() {
        const documentation = store.getState().documentation;
        return (
          <div >
          {documentation.itemById && documentation.itemById[this.state.item] &&
              <Fragment>
                  <nav>
                      <Link to="/">documentation</Link>
                       > <Link to={'/category/' + this.state.category}>{documentation.categoryById[this.state.category].title}</Link> > <Link to={'/category/' + this.state.category + '/item/' + this.state.item} >{documentation.itemById[this.state.item].title}</Link>
                  </nav>
                  <p>{documentation.itemById[this.state.item].desc}</p>
              </Fragment>
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
