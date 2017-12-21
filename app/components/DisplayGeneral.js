import React from 'react';
import PropTypes from 'prop-types';
const Fragment = React.Fragment;
import Marked from 'marked';

export default function DisplayGeneral(props) {
    const documentation = props.state;
    return (
        <Fragment>
          <h1>{documentation && documentation.title}</h1>
          {documentation && documentation.desc && <section dangerouslySetInnerHTML={{__html: Marked(documentation.desc)}} />}
          <ul>
            {documentation && documentation.fullList && documentation.fullList.map((o, i)=>(<li key={'category' + i}>{o.title}</li>))}
            {documentation && !documentation.fullList && <p>No categories found!</p>}
          </ul>
        </Fragment>
    );
}

DisplayGeneral.propTypes = {
    props: PropTypes.object,
    state: PropTypes.object
};
