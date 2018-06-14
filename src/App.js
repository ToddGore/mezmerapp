import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter, Switch, Route } from 'react-router-dom'

import Main from './components/mainpage/Main'
import Private from './components/Private/Private'
import Dashboard from './components/dashboard/Dashboard'


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Switch>
            {/* <Dashboard /> */}
            <Route path='/' component={Main} exact />
            <Route path='/private' component={Dashboard} />

            {/* <Route path='/' component={Signup} exact /> */}
          </Switch>
        </HashRouter>
      </div>
    );
  }
}

export default App;
