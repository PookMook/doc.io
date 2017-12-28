import React from 'react';
import PropTypes from 'prop-types';
import Marked from 'marked';
import { Link } from 'react-router-dom';
import { displayItem } from '../styles/displayItem.scss';

export default function DisplayGeneral(props) {
    const documentation = props.state;
    return (
        <div className={displayItem}>
          <h1>{documentation && documentation.title}</h1>
          {documentation && documentation.desc && <section dangerouslySetInnerHTML={{__html: Marked(documentation.desc)}} />}
          <ol>
            {documentation && documentation.fullList && documentation.fullList.map((o, i)=>(
              <li key={'category' + i}><Link to={'/category/' + o.id}>{o.title}</Link></li>
            ))}
            {documentation && !documentation.fullList && <p>No categories found!</p>}
          </ol>
        </div>
    );
}

DisplayGeneral.propTypes = {
    props: PropTypes.object,
    state: PropTypes.object
};
