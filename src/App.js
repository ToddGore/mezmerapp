import React, { Component } from 'react';
import './App.css';
// import { HashRouter, Switch, Route } from 'react-router-dom'
import { BrowserRouter as Router, Link, Route } from 'react-router-dom'
import DashBoard from './components/dashboard/DashBoard'
import Main from './components/mainpage/Main'

class App extends Component {

  constructor(props) {
    super(props);
  }

  // componentDidMount() {
  //   this.props.getUser()
  //     .then(() => {
  //       this.props.getDecks(this.props.user.id)
  //     });
  // }


  render() {
    return (
      <Router>
        <div className="App">
          {/* <HashRouter> */}
          {/* <Switch> */}


          <Route path='/' component={Main} exact />
          <Route path='/private' component={DashBoard} />


          {/* </Switch> */}



          {/* <Main /> */}
          {/* <Dashboard /> */}
          {/* </HashRouter> */}
        </div>
      </Router>
    );
  }
}

export default App;
