import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import store from '../store/store';
import Marked from 'marked';
import { displayItem } from '../styles/displayItem.scss';
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

    componentWillUpdate(nextProps) {
        if(nextProps.match.params && this.state.item !== nextProps.match.params.item) {
            this.setState({item: nextProps.match.params.item});
        }
    }

    render() {
        const documentation = store.getState().documentation;
        return (
          <Fragment>
              <div className={displayItem}>
              {documentation.itemById && documentation.itemById[this.state.item] &&
                  <Fragment>
                      <nav>
                          <Link to="/">documentation</Link>
                           > <Link to={'/category/' + this.state.category}>{documentation.categoryById[this.state.category].title}</Link> > <Link to={'/category/' + this.state.category + '/item/' + this.state.item} >{documentation.itemById[this.state.item].title}</Link>
                      </nav>
                      <h1 className="headline">{documentation.itemById[this.state.item].title}</h1>
                      <section dangerouslySetInnerHTML={{__html: Marked(documentation.itemById[this.state.item].desc)}} />
                  </Fragment>
              }
              </div>
          </Fragment>
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
