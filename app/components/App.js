import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { footer } from '../styles/footer.scss';
import Routes from '../routes';
import Documentation from './Documentation';
import { app } from '../styles/app.scss';
import '../helpers/fullList.json';
import _ from 'lodash';


export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {title: '', desc: ''};
        this.updateState = this.updateState.bind(this);
    }

    updateState(target, value) {
        this.setState((state)=>_.set(state, target, value));
    }

    render() {
        return(
            <div className={app}>
                <Documentation state={this.state}/>
                <div>
                  { Routes }
                  <footer className={footer}>
                    <Link to="/">Documentation</Link>
                    <Link to="/about">About</Link>
                  </footer>
                </div>
            </div>
        );
    }
}
