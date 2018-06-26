import React, { Component } from 'react';
import './App.css';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import DashBoard from './components/dashboard/DashBoard'
import Main from './components/mainpage/Main'

class App extends Component {

  render() {

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/dashboard" component={DashBoard} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
