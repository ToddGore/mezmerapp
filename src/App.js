import React, { Component } from 'react';
import './App.css';
// import { HashRouter, Switch, Route } from 'react-router-dom'
import { HashRouter as Router, Link, Route, Switch } from 'react-router-dom'
import DashBoard from './components/dashboard/DashBoard'
import Main from './components/mainpage/Main'


// import DashNav from './components/dashnav/DashNav'
// import DashHeader from './components/dashheader/DashHeader'
// import DashFooter from './components/dashfooter/DashFooter'

// import DeckArea from './components/deckarea/DeckArea'
// import PlayArea from './components/playarea/PlayArea'
// import CardEditor from './components/cardeditor/CardEditor'



// const routes = (
//   <Route component={App}>
//     <Route path="deck" components={
//       { sidebar: DashNav, header: DashHeader, main: DeckArea, footer: DashFooter }} />
//     <Route path="playarea" components={
//       { sidebar: DashNav, header: DashHeader, main: PlayArea, footer: DashFooter }} />
//     <Route path="cardeditor" components={
//       { sidebar: DashNav, header: DashHeader, main: CardEditor, footer: DashFooter }} />
//   </Route>
// )







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
          {console.log('in App ', this.props)}
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
