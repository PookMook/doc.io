import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import Documentation from './components/Documentation';

export default (
	<Switch>
		<Route exact path="/" component={Documentation} />
		<Route path="/about" component={About} />
	</Switch>
);
