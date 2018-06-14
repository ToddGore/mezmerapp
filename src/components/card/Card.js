import React, { Component } from 'react'
import './card.css';


class Card extends Component {
    constructor(props) {
        super(props);
        this.state = {
            deckTitle: '',
            deckDesc: '',

        };
    }
    render() {
        return (
            <div className="card-main">
                <div className="card-count">12</div>
                <div className="card-title"><p>JavaScript Objects</p></div>
                <div className="card-desc"><p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore nostrum totam natus quas officiis corporis expedita placeat ab libero numquam. Vero facilis ratione obcaecati quis expedita magni reiciendis, labore alias.</p></div>
                <button className="card-btn-play">Play</button>
                <button className="card-btn-edit">Edit</button>
                <button className="card-btn-delete">Delete</button>
            </div>
        );
    }
}

export default Card;