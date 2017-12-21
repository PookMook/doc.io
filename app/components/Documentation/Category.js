import React from 'react';
import Item from './Item';
import { Link } from 'react-router-dom';
import { CategoryHeader } from '../../styles/doc.scss';

const Category = (props) =>
([<Link key={'categoryHeader' + props.id} to={'/category/' + props.id} className={CategoryHeader}>{props.title + ' (' + props.subList.length + ')'}</Link>,
<ul key={'category' + props.id}>
    {props.subList.map((item) => (<Item {...item} key={'categoryHeaderItem' + props.id + '-' + item.id} parent={props.id}/>))}
</ul>
]);

export default Category;
