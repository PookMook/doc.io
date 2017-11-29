import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Documentation from './components/Documentation';
import DisplayItem from './components/DisplayItem';

export default (
	<Switch>
		<Route exact path="/" component={Documentation} />
		<Route exact path="/category/:category/item/:item" component={DisplayItem} />
		<Route path="/about" component={About} />
	</Switch>
);
