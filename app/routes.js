import React from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/About';
import DisplayGeneral from './components/DisplayGeneral';
import DisplayItem from './components/DisplayItem';
import DisplayCategory from './components/DisplayCategory';

export default function Routes(props) {
    return	(
			<Switch>
				<Route exact path="/" render={(routeProps) => <DisplayGeneral {...routeProps} {...props}/>}/>
				<Route exact path="/category/:category" render={(routeProps) => <DisplayCategory {...routeProps} {...props}/>}/>
				<Route exact path="/category/:category/item/:item" render={(routeProps) => <DisplayItem {...routeProps} {...props}/>}/>
				<Route path="/about" render={(routeProps) => <About {...routeProps} {...props}/>}/>
			</Switch>
	  );
}
