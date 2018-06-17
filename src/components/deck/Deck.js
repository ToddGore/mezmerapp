import React, { Component } from 'react'
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import './deck.css';
import PlayArea from '../playarea/PlayArea'

class Deck extends Component {


    render() {
        return (
            // <Switch>
            <div className="card-main">
                <div className="card-count">12</div>
                <div className="card-title"><p>{this.props.title}</p></div>
                <div className="card-desc"><p>{this.props.description}</p></div>
                <Link to="/playarea"><button className="card-btn play">Play</button></Link>
                <button className="card-btn edit">Edit</button>
                <button className="card-btn delete">Delete</button>
            </div>
            //  <Route path="/playarea" component={PlayArea} /> 
            // </Switch>
        );
    }
}

export default Deck;