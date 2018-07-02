import React, { Component } from 'react'
import { Link } from "react-router-dom";
import './deck.css';
import { getDecks } from '../../ducks/user'
import { connect } from 'react-redux'
import { css } from 'emotion'

import axios from 'axios';
import card_back from '../images/Popup_1.png'
import Play_Normal from '../images/Play_Normal.png'
import Play_Hover from '../images/Play_Hover.png'
import Edit_Normal from '../images/empty_button.png'



const color = '#fff000'

var cardStyle = {

    backgroundColor: "#57C0DC",
    // boxShadow: "inset 0 0 100px #2E6D90",
    // background: `linear-gradient(0deg,rgba(0,0,0,0.0),rgba(0,0,0,0.0)), url(${card_back})`,
    backgroundImage: `url(${card_back})`,
    backgroundRepeat: "no-repeat",
    // backgroundSize: "300px 460px",
    backgroundSize: "250px 350px",
};
const txtStyleTtl = {
    margin: "0 auto",
    height: "80px",
    width: "200px",
    // color: "white",
    // backgroundColor: "#80ced6",
    // backgroundColor: "rgba(0,0,0,0.7)",
    // borderRadius: "10px",
    // fontSize: "25px",
    // padding: "5px 5px"
}
const txtStyleDesc = {
    margin: "0 auto",
    height: "100px",
    width: "200px",
    // color: "white",
    // backgroundColor: "rgba(0,0,0,0.7)",
    // borderRadius: "10px",
    // fontSize: "25px",
    // padding: "5px 5px"
}






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
            <div style={cardStyle} className={css`
            background-color: white;
            padding: 5px 5px;
            display: grid;
            grid-gap: 2px;
            grid-template-columns: 1fr 1fr 1fr;
            grid-template-rows: 1fr 1fr 2fr 2fr 2fr;
            grid-template-areas: 
            "count count count"
            "title title title"
            "desc desc desc"
            "play play play"
            "edit edit edit";

            font-family: "WickedMouseDemo", Times, serif;
            font-size: 16px;
            color: #b74a00;

            margin: 10px 10px;
            // border: 1px solid rgb(0, 0, 0);
            // border-right: 2px solid rgba(46, 109, 144,1);
            // border-bottom: 2px solid rgba(46, 109, 144,0.8);

            // box-shadow:
            // inset 0 0 100px rgba(36, 99, 134,1),
            // 2px 2px 0px rgba(255,255,255,0.8),
            // 0 20px 10px -15px rgba(0,0,0,0.5),
            // 0 40px 40px -20px rgba(0,0,0,0.4),
            // 0 70px 50px -30px rgba(0,0,0,0.3),
            // 0 40px 60px -5px rgba(46, 109, 144,0.3);
            height: 350px;
            width: 250px;
            border-radius: 25PX;
            background-color: hotpink;
            &:hover {
              color: ${color};
            }
          `}
            >
                {/* <div className="card-count">12</div> */}
                <div className="card-title"><p style={txtStyleTtl} >{this.props.title}</p></div>
                <div className="card-desc"><p style={txtStyleDesc} >{this.props.description}</p></div>

                <Link
                    className="play"
                    to={`/dashboard/playarea/${this.props.deck_id}`}>
                    <button className={css`
                    background-image: url(${Play_Normal});
                    background-color: transparent;
                    background-repeat: no-repeat;
                    background-size: 100%;
                    &:hover {
                        background-image: url(${Play_Hover});
                      }
                    // margin: 5px 10px;
                    // padding: 0.5em 1em;
                    border: 0;
                    height: 40px;
                    width: 150px;
                    text-align: center;
                    `}
                    ></button>
                </Link>
                <Link className="edit"
                    to={`/dashboard/cardeditor/${this.props.deck_id}`}>
                    <button className={css`
                    grid-area: edit;
                    background-image: url(${Edit_Normal});
                    background-color: transparent;
                    background-repeat: no-repeat;
                    background-size: 100%;
                    height: 55px;
                    width: 220px;
                    border: 0;
                    text-align: center;
                    font-family: "WickedMouseDemo", Times, serif;
                    font-size: 12px;
                    color: #b74a00;
                    &:hover {
                        color: yellow;
                      }
                    `}>Create and Edit Cards</button>
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
