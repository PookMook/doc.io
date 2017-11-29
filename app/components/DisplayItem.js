import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { configureStore } from '../store/configureStore';
import * as action from '../actions/types';

const store = configureStore();
const Fragment = React.Fragment;

export default class DisplayItem extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            item: this.props.match.params.item,
            category: this.props.match.params.category
        };
        store.dispatch({ type: action.BUILD});
    }

    render() {
        const documentation = store.getState().documentation;
        return (
          <div >
          {documentation.itemById && documentation.itemById[this.state.item] &&
              <Fragment>
                  <nav>
                      documentation
                       > {documentation.categoryById[this.state.category].title} > {documentation.itemById[this.state.item].title}
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
