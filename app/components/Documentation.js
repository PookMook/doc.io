import React from 'react';
import { doc, DocHeader } from '../styles/doc.scss';
import Category from './Documentation/Category';
import doubleDigit from '../helpers/doubleDigit';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Documentation(props) {
    const documentation = props.state;
    return (
      <div className={doc}>
        <input value={documentation.filter}
          onChange={(e)=>props.searchItem(e.target.value)} placeholder="Search" />
        {!documentation.loaded && <p>Loading...</p>}
        {documentation.loaded &&
        <p>Last update {doubleDigit(documentation.compiledAt.getDate())}/{doubleDigit(documentation.compiledAt.getMonth())} {doubleDigit(documentation.compiledAt.getHours())}:{doubleDigit(documentation.compiledAt.getMinutes())}</p>}
        <Link  to="/" className={DocHeader}>{documentation.title}</Link>
        {documentation.loaded && documentation.filteredList.map((item) => (<Category {...item} key={'Category' + item.id} css={doc}/>))}
      </div>
    );
}

Documentation.propTypes = {
    props: PropTypes.object,
    state: PropTypes.object,
    searchItem: PropTypes.func
};
