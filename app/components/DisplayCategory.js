import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Marked from 'marked';
import { doc } from '../styles/doc.scss';
const Fragment = React.Fragment;

export default class DisplayItem extends Component {

    constructor(props) {
        super(props);
        this.state =
        {
            category: this.props.match.params.category
        };
    }

    componentWillUpdate(nextProps) {
        if(nextProps.match.params && this.state.category !== nextProps.match.params.category) {
            this.setState({category: nextProps.match.params.category});
        }
    }

    render() {
        const documentation = this.props.state;
        return (
          <Fragment>
              <div className={doc}>
              {documentation.categoryById && documentation.categoryById[this.state.category] &&
                  <Fragment>
                      <nav>
                          <Link to="/">documentation</Link>
                           > <Link to={'/category/' + this.state.category}>{documentation.categoryById[this.state.category].title}</Link> >
                      </nav>
                      <h1 className="headline">{documentation.categoryById[this.state.category].title}</h1>
                      <section dangerouslySetInnerHTML={{__html: Marked(documentation.categoryById[this.state.category].desc)}} />
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
    category: PropTypes.number,
    state: PropTypes.object
};
