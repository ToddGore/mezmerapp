import React, { Component } from 'react'
import { HashRouter, Switch, Route, Link } from "react-router-dom";
import './deck.css';


class Deck extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }


        this.deleteDeck = this.deleteDeck.bind(this)
    }
    componentDidMount() {

    }



    deleteDeck(id) {
        alert('Not working yet! ID ' + id)

    }

    render() {

        return (
            <div className="card-main">
                <div className="card-count">12</div>
                <div className="card-title"><p>{this.props.title}</p></div>
                <div className="card-desc"><p>{this.props.description}</p></div>

                <Link className="card-btn play" to={`/dashboard/playarea/${this.props.deck_id}`}>Play</Link>

                <Link className="card-btn edit"

                    to={`/dashboard/cardeditor/${this.props.deck_id}`}>Edit
                </Link>

                <Link className="card-btn delete" to={`/dashboard/deckarea/`}
                    onClick={() => this.deleteDeck(this.props.deck_id)}>Delete</Link>
            </div>
        );
    }
}

export default Deck;