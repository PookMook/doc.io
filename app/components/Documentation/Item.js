import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => [<Link key={'SubItem' + props.parent + '-' + props.id} to={'/category/' + props.parent + '/item/' + props.id}>{props.title}</Link>];

export default Item;
