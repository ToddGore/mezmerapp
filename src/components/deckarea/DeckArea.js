import React, { Component } from 'react'
import './deckarea.css';
import { connect } from 'react-redux'
import Deck from '../deck/Deck'
import { getUser, getDecks } from '../../ducks/user'

class DeckArea extends Component {

    componentDidMount() {
        this.props.getUser()
            .then(() => {
                this.props.getDecks(this.props.user.id)
            });


    }



    render() {

        // console.log('Deck Area ', this.props.decks)
        let mappedDecks = this.props.decks.map((deck, i) => {
            return (
                <Deck key={i}
                    // count={}
                    deck_id={deck.id}
                    title={deck.name}
                    description={deck.description}
                />
            )
        })

        return (
            <div className="deckarea-main">
                {mappedDecks}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        decks: state.decks
    }
}


export default connect(mapStateToProps, { getUser, getDecks })(DeckArea)