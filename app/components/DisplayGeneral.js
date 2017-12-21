import React from 'react';
const Fragment = React.Fragment;
import store from '../store/store';
import Marked from 'marked';

export default function DisplayGeneral() {
    const documentation = store.getState().documentation;
    return (
        <Fragment>
          <h1>{documentation.title}</h1>
          {documentation.desc && <section dangerouslySetInnerHTML={{__html: Marked(documentation.desc)}} />}
          <ul>
            {documentation.fullList && documentation.fullList.map((o, i)=>(<li key={'category' + i}>{o.title}</li>))}
            {!documentation.fullList && <p>No categories found!</p>}
          </ul>
        </Fragment>
    );
}
