import React, { Component } from 'react';
import './deckeditor.css';
import { connect } from 'react-redux'
import { getUser, getDecks, getCards } from './../../ducks/user'
import { Link } from "react-router-dom";
import axios from 'axios';
// Pull in list of decks


// Editor will let you change "Title" and "Description"

// Buttons: Return to dashboard, Edit or add cards,

class DeckEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
            DeckActive: null,
            li_active: false,
            thisClass: null,
            createDeck_Enabled: false,
            clrDeck_Enabled: false,
            delDeck_Enabled: false,
            updDeck_Enabled: false,
            rtnDash_Enabled: true,

            deck: {
                deck_id: 0, name: "", user_id: 0, stars: 0,
                description: ""
            },
            temp_deck: {
                name: "", user_id: 0, stars: 0,
                description: ""
            },
            temp_response: {
                card_id: '', user_id: '', res_time: 1200, deck_id: ''
            }
        };

        this.listHandleClick = this.listHandleClick.bind(this)
        this.handleChangeDeck = this.handleChangeDeck.bind(this)
        this.myColorDeck = this.myColorDeck.bind(this)
        this.toggleLi = this.toggleLi.bind(this)
        this.createDeck = this.createDeck.bind(this)
        this.clearForm = this.clearForm.bind(this)
        this.delDeck = this.delDeck.bind(this)
        this.updateDeck = this.updateDeck.bind(this)
        this.reloadDecks = this.reloadDecks.bind(this)
    }

    componentDidMount() {
        this.props.getUser().then(() => {
            this.props.getDecks(+this.props.user.id)
        }).then(() => {
            this.setState({
                temp_deck: { ...this.state.temp_deck, user_id: +this.props.user.id }
            })
        })
    }


    reloadDecks() {
        const user_id = +this.props.user.id
        this.props.getDecks(user_id)
            .then(this.setState({
                deck: { ...this.state.deck, user_id: user_id, }
            }))
    }


    createDeck(deck) {
        console.log('createDeck ', this.state.temp_deck)
        axios.post(`/cards/deck`, this.state.temp_deck)
            .then(results => {
                this.setState({ deck: results.data })
                this.reloadDecks()
            })
    }

    delDeck(deck) {
        axios.delete(`/cards/deck/delete/${deck.id}`)

            .then(results => {
                // this.setState({ 'card': results.data });
                this.setState({ delDeck_Enabled: false });
                this.reloadDecks()
                this.clearForm()
            })
    }
    updateDeck(deck) {
        console.log('deck ', deck)
        axios.put(`/cards/deck/${deck.id}`, this.state.temp_deck)
            .then(results => {
                this.reloadDecks()
                this.setState({
                    deck: results.data[0],
                    updDeck_Enabled: false,
                    createDeck_Enabled: false
                });
            })
    }


    clearForm() {
        this.setState({
            temp_deck: {
                name: "",
                description: ""
            },
            clrDeck_Enabled: false
        })
    }




    listHandleClick(list_deck, toggle) {
        this.toggleLi(toggle)
        // console.log('Clicked ', list_deck, ' ', toggle)
        this.setState({
            li_active: true,
            delDeck_Enabled: true,
            clrDeck_Enabled: true,
            createDeck_Enabled: false,
            updDeck_Enabled: false,
            rtnDash_Enabled: true,

            deck: list_deck,
            temp_deck: {
                name: list_deck.name,
                user_id: list_deck.user_id,
                stars: list_deck.stars,
                description: list_deck.description
            }

        })
    }

    toggleLi(position) {
        if (this.state.DeckActive === position) {
            this.setState({ DeckActive: null })
        } else {
            this.setState({ DeckActive: position })
        }
    }

    myColorDeck(position) {
        if (this.state.DeckActive === position) {
            return "yellow";
        }
        return "";
    }

    handleChangeDeck(e) {
        // console.log('change ', e.target.value)
        this.setState({
            temp_deck: Object.assign({}, this.state.temp_deck, { [e.target.id]: e.target.value })
        })

        if (this.state.temp_deck !== this.state.deck) {
            this.setState({
                updDeck_Enabled: true,
                createDeck_Enabled: true
            })
        } else {
            this.setState({
                updDeck_Enabled: false,
                createDeck_Enabled: false
            })
        }

        if (this.state.temp_deck.name
            && this.state.temp_deck.user_id
            && this.state.temp_deck.stars
            && this.state.temp_deck.description

        ) {
            this.setState({
                clrDeck_Enabled: true
            })
        } else {
            this.setState({
                clrDeck_Enabled: false
            })
        }
    }



    render() {
        // console.log('in state ', this.state.deck)
        return (
            <div className='deckeditor-container'>
                <div className='deckeditor-list'>
                    <ul>
                        <li>DECKS</li>
                        <hr />
                        {this.props.decks.map(((list_deck, i) => {
                            return (
                                <div key={i}>
                                    <li
                                        style={{ background: this.myColorDeck(i) }}
                                        onClick={() => { this.listHandleClick(list_deck, i) }}
                                    >
                                        {list_deck.name}
                                    </li>
                                    <hr />
                                </div>
                            )
                        }))}
                    </ul>
                </div>
                <div className='deckeditor-editor'>
                    <textarea className='deckeditor-title'
                        rows="10" cols="70" wrap="hard"
                        id="name"
                        placeholder="Name?"
                        value={this.state.temp_deck.name}
                        onChange={(e) => { this.handleChangeDeck(e) }}>
                    </textarea>
                    <textarea className='deckeditor-body'
                        rows="10" cols="70" wrap="hard"
                        id="description"
                        placeholder="Description?"
                        value={this.state.temp_deck.description}
                        onChange={(e) => { this.handleChangeDeck(e) }}>
                    </textarea>
                </div>
                <div className='deckeditor-options'>
                    <div className="deckopt-main">
                        <button
                            disabled={!this.state.createDeck_Enabled}
                            className='deckopt-button'
                            onClick={() => { this.createDeck(this.state.temp_deck) }}
                        >Add Deck</button>
                        <br />
                        <button
                            className='deckopt-button'
                            disabled={!this.state.clrDeck_Enabled}
                            onClick={() => { this.clearForm() }}
                        >Clear Form</button>
                        <br />
                        <button
                            className='cardopt-button'
                            disabled={!this.state.delDeck_Enabled}
                            onClick={() => { this.delDeck(this.state.deck) }}
                        >Delete Deck</button>
                        <br />
                        <button
                            className='cardopt-button'
                            disabled={!this.state.updDeck_Enabled}
                            onClick={() => { this.updateDeck(this.state.deck) }}
                        >Update Deck</button>
                        <br />
                        <Link to={`/dashboard/deckarea`}>
                            <button
                                className='cardopt-button'
                                disabled={!this.state.rtnDash_Enabled}
                            >Return to Dashboard</button>
                        </Link>

                    </div>
                </div>
            </div>
        );
    }
}
function mapStateToProps(state) {
    return {
        user: state.user,
        cards: state.cards,
        decks: state.decks
    }
}

export default connect(mapStateToProps, { getUser, getDecks, getCards })(DeckEditor)
