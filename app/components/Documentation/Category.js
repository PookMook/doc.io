import React from 'react';
import Item from './Item';

const Category = (props) =>
([<h1 key={'categoryHeader' + props.id}>{props.title + ' (' + props.subList.length + ')'}</h1>,
<ul key={'category' + props.id}>
    {props.subList.map((item) => (<Item {...item} key={'categoryHeaderItem' + props.id + '-' + item.id} parent={props.id}/>))}
</ul>
]);

export default Category;
