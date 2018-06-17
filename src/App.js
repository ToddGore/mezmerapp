import React, { Component } from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom'
import Dashboard from './components/dashboard/Dashboard'


class App extends Component {
  render() {
    return (
      <div className="App">
        <HashRouter>
          <Dashboard />
        </HashRouter>
      </div>
    );
  }
}

export default App;
