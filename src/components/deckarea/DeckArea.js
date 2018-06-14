import React, { Component } from 'react'
import Deck from '../deck/Deck'





class DeckArea extends Component {
    constructor(props) {
        super(props);
        // this.state = {};
    }
    render() {

        // console.log('Deck Area ', this.props.deckProps)
        let mappedDecks = this.props.deckProps.map((deck, i) => {
            return (
                <Deck key={i}
                    title={deck.name}

                />
            )
        })

        return (
            <div>
                {/* <h2>DeckArea</h2> */}
                {/* <Deck /> */}
                {mappedDecks}
            </div>
        );
    }
}

export default DeckArea;