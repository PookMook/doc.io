import React from 'react';
import { doc, DocHeader } from '../styles/doc.scss';
import Category from './Documentation/Category';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Documentation(props) {
    const documentation = props.state;
    return (
      <div className={doc}>
        {!documentation.loaded && <p>Loading...</p>}
        <input value={documentation.filter}          onChange={(e)=>props.searchItem(e.target.value)} placeholder="Search" />
        <Link  to="/" className={DocHeader}>{documentation.title}</Link>
        {documentation.loaded && documentation.filteredList.map((item) => (<Category {...item} key={'Category' + item.id} css={doc}/>))}
      </div>
    );
}

Documentation.propTypes = {
    props: PropTypes.object,
    state: PropTypes.object,
    searchItem: PropTypes.func,
    toggleDoc: PropTypes.func
};
