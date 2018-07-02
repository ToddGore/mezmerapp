import React, { Component } from 'react'
import './deckarea.css';
import { connect } from 'react-redux'
import { Link } from "react-router-dom";
import Deck from '../deck/Deck'
import { getUser, getDecks } from '../../ducks/user'
import { css } from 'emotion'

import plusSign from './plus.png';

import backGround from '../images/bg5.png'
import popup2 from '../images/Popup_2.png'


// import felt from '../images/felt.jpg'

var sectionStyle = {
    // border: "1px solid blue",
    // backgroundColor: "#F6F6F6",
    height: "816px",
    backgroundImage: `url(${backGround})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "1475px 816px"
};


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
            <div className="deckarea-main" style={sectionStyle} >
                {mappedDecks}
                <div className={css`
                background-image: url(${popup2});
                background-repeat: no-repeat;
                background-size: 100%;
                // background-color: transparent;
                font-family: "WickedMouseDemo", Times, serif;
                padding: 5px 5px;
                height: 235px;
                width: 280px;
                margin: 10px 10px;
                // box-shadow: 3px 2px 14px -4px rgba(0,0,0,0.75);
                font-weight: bold;
                font-size: large;
                `}>
                    <p className="new-deck-txt"
                    > Create or Modify a Deck </p>
                    <Link to={`/dashboard/deckeditor`}>
                        <img src={plusSign} className='new-deck-img' alt="fireSpot" />
                    </Link>
                </div>
            </div >
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