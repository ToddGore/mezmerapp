import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './deck.css';
import { getDecks } from '../../ducks/user'
import { connect } from 'react-redux'
import axios from 'axios';

class Deck extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
        // this.deleteDeck = this.deleteDeck.bind(this)
    }
    componentDidMount() {
        // this.props.getCards()
    }

    // deleteDeck(id) {
    //     // alert('Not working yet! ID ' + id)
    //     axios.delete(`/cards/deck/delete/${id}`)
    //         .then(results => {
    //             // this.getDecks()

    //         })
    // }

    render() {
        console.log('Decks ', this.props);

        return (
            <div className="card-main">
                {/* <div className="card-count">12</div> */}
                <div className="card-title"><p>{this.props.title}</p></div>
                <div className="card-desc"><p>{this.props.description}</p></div>

                <Link className="play"
                    to={`/dashboard/playarea/${this.props.deck_id}`}>
                    <button className="card-btn">Play</button>
                </Link>

                <Link className="edit"
                    to={`/dashboard/cardeditor/${this.props.deck_id}`}>
                    <button className="card-btn">Create and Edit Cards</button>
                </Link>

                {/* <Link className="card-btn delete" to={`/dashboard/deckarea/`}
                    onClick={() => this.deleteDeck(this.props.deck_id)}>Delete</Link> */}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        decks: state.decks
    }
}


export default connect(mapStateToProps, { getDecks })(Deck)
