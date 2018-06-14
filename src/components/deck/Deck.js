import React, { Component } from 'react'
import './deck.css';


class Deck extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="card-main">
                <div className="card-count">12</div>
                <div className="card-title"><p>{this.props.title}</p></div>
                <div className="card-desc"><p>{this.props.description}</p></div>
                <button className="card-btn-play">Play</button>
                <button className="card-btn-edit">Edit</button>
                <button className="card-btn-delete">Delete</button>
            </div>
        );
    }
}

export default Deck;