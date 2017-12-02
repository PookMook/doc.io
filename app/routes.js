import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Documentation from './components/Documentation';
import DisplayItem from './components/DisplayItem';
import DisplayCategory from './components/DisplayCategory';

export default (
	<Switch>
		<Route exact path="/" component={Documentation} />
		<Route exact path="/category/:category" component={DisplayCategory} />
		<Route exact path="/category/:category/item/:item" component={DisplayItem} />
		<Route path="/about" component={About} />
	</Switch>
);
