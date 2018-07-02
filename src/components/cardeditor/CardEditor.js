import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import './cardeditor.css';
import { connect } from 'react-redux'
import { getUser, getDecks, getCards } from './../../ducks/user'
import { css } from 'emotion'
import background from '../images/bg1.png'
import window6 from '../images/window6.png'
// import popup2 from '../images/window5.png'
var unirest = require('unirest');





class CardEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: null,
            DeckActive: null,
            li_active: false,
            thisClass: null,
            createCard_Enabled: false,
            clrCard_Enabled: false,
            delCard_Enabled: false,
            updCard_Enabled: false,
            rtnDash_Enabled: true,
            suggestion: '',
            deckTitle: '',

            card: {
                deck_id: 0, question: "", answer_1: "", answer_2: "",
                answer_3: "", answer_4: "", image: "", correct_answer: ""
            },
            temp_card: {
                question: '', answer_1: '', answer_2: '',
                answer_3: '', answer_4: '', image: '', correct_answer: ''
            },
            temp_response: {
                card_id: '', user_id: '', res_time: 1200, deck_id: ''
            }

        }

        this.handleChangeQuestion = this.handleChangeQuestion.bind(this)
        this.listHandleClick = this.listHandleClick.bind(this)
        this.reloadCards = this.reloadCards.bind(this)
        this.addResponse = this.addResponse.bind(this)
        this.updateCard = this.updateCard.bind(this)
        this.createCard = this.createCard.bind(this)
        this.toggleLi = this.toggleLi.bind(this)
        this.myColor = this.myColor.bind(this)
        this.delCard = this.delCard.bind(this)
        this.spellClick = this.spellClick.bind(this)
        this.getDeckTitle = this.getDeckTitle.bind(this)
    }

    componentDidMount() {
        this.props.getUser()
            .then(() => {
                this.setState({
                    temp_response: { ...this.state.temp_response, user_id: +this.props.user.id, }
                })
                this.props.getDecks(+this.props.user.id)
            })
            .then(this.reloadCards())

        this.getDeckTitle(3)

    }

    reloadCards() {
        const deck_id = +this.props.match.params.id
        console.log('reload ', deck_id)
        this.props.getCards(deck_id)
            .then(this.setState({
                card: { ...this.state.card, deck_id: deck_id, }
            }))
    }

    // When is this used?
    updateDeck(deck) {
        axios.put(`/cards/deck/${deck.id}`, deck)
            .then(results => {
                this.setState({ 'deck': results.data });
            })
    }

    delCard(card) {
        axios.delete(`/cards/card/delete/${card.id}`)

            .then(results => {
                // this.setState({ 'card': results.data });
                this.setState({ delCard_Enabled: false });
                this.reloadCards()
                this.clearForm()
            })
    }

    updateCard(card) {
        const cardId = card.id
        const deckId = card.deck_id
        // delete card.id
        const newObj = Object.assign({}, this.state.temp_card,
            {
                deck_id: this.state.card.deck_id
            })

        axios.put(`/cards/card/${cardId}`, newObj)
            .then(results => {
                this.setState({
                    card: results.data[0],
                    updCard_Enabled: false,
                    createCard_Enabled: false
                });
                this.reloadCards()
            })
    }
    createCard(card) {
        this.setState({
            temp_card: Object.assign({}, this.state.temp_card,
                { deck_id: this.state.card.deck_id })
        }, () => {
            axios.post(`/cards/deck/card`, this.state.temp_card)
                .then(results => {
                    this.setState({ card: results.data[0] });
                    this.addResponse(results.data[0].id)

                });
            this.setState({ state: this.state }); // Force Update
            this.reloadCards()
        })
    }
    getDeckTitle(deck_id) {
        axios.get(`/decks/user/${deck_id}`)
            .then(results => {
                this.setState({ deckTitle: results.data[0] });

            });
    }

    addResponse(card_id) {
        this.setState({
            temp_response: Object.assign({}, this.state.temp_response,
                { card_id: card_id, deck_id: this.state.card.deck_id })
        }, () => {
            axios.post(`/cards/deck/response`, this.state.temp_response)
                .then(results => {
                    this.setState({ 'response': results.data });
                })
        })
    }

    spellClick(content) {
        let self = this //************ add this
        // These code snippets use an open-source library. http://unirest.io/nodejs
        // This+sentnce+has+some+probblems.
        let title = this.state.temp_card.question;
        title = title.replace(/\s/g, "+");
        unirest.get(`https://montanaflynn-spellcheck.p.mashape.com/check/?text=${title}`)
            .header("X-Mashape-Key", "zEBW2t6EOLmshzEH90V3yeQQP65Np1EeEO6jsnpHdu75AqXZoC")
            .header("Accept", "application/json")
            .end(function (result) {
                self.setState({ 'suggestion': result.body.suggestion });
            });
    }



    handleChangeQuestion(e) {
        this.setState({
            temp_card: Object.assign({}, this.state.temp_card, { [e.target.id]: e.target.value })
        })

        if (this.state.temp_card !== this.state.card) {
            this.setState({
                updCard_Enabled: true,
                createCard_Enabled: true
            })
        } else {
            this.setState({
                updCard_Enabled: false,
                createCard_Enabled: false
            })
        }

        if (this.state.temp_card.question
            && this.state.temp_card.answer_1
            && this.state.temp_card.answer_2
            && this.state.temp_card.answer_3
            && this.state.temp_card.answer_4
            && this.state.temp_card.correct_answer
        ) {
            this.setState({
                clrCard_Enabled: true
            })
        } else {
            this.setState({
                clrCard_Enabled: false
            })
        }
    }

    clearForm() {
        this.setState({
            temp_card: {
                question: '', answer_1: '', answer_2: '',
                answer_3: '', answer_4: '', image: '', correct_answer: ''
            },
            clrCard_Enabled: false
        })

    }


    listHandleClick(list_card, toggle) {
        this.toggleLi(toggle)
        this.setState({
            li_active: true,
            delCard_Enabled: true,
            clrCard_Enabled: true,
            card: list_card,
            temp_card: {
                question: list_card.question, answer_1: list_card.answer_1,
                answer_2: list_card.answer_2, answer_3: list_card.answer_3,
                answer_4: list_card.answer_4, image: list_card.image,
                correct_answer: list_card.correct_answer
            }

        })
    }




    toggleLi(position) {
        if (this.state.active === position) {
            this.setState({ active: null })
        } else {
            this.setState({ active: position })
        }
    }
    myColor(position) {
        if (this.state.active === position) {
            return "yellow";
        }
        return "";
    }


    render() {

        return (
            <div className={css`
            background-image: url(${background});
            background-repeat: no-repeat;
            background-size: 1475px 860px;
            // background-color: white;
            // width: 1450px;
            // height: 805px;
            display: grid;
            grid-gap: 5px;
            grid-template-columns: 2fr 2fr 1fr;
            /* grid-template-rows: 1fr 6fr 1fr; */
            grid-template-areas: 
            "list editor options";

            ` }>
                <div className={css`
                // background-image: url(${window6});
                background-size: 100%;
                height: 815px;
                // width: 450px;
                grid-area: list;
                `}

                // 'list'

                >

                    <div className={css`

                    height: 400px;
                    width: 400px;
                    background-color: lightgoldenrodyellow;
                    border: 3px solid greenyellow;
                    `}


                    // "list-cards"
                    >
                        <ul>
                            <li>Deck Name: {this.state.deckTitle.name}</li>
                            <hr />
                            {this.props.cards.map(((list_card, i) => {
                                return (
                                    <li key={i}
                                        style={{ background: this.myColor(i) }}
                                        onClick={() => { this.listHandleClick(list_card, i) }}
                                    >
                                        {list_card.question}
                                    </li>
                                )
                            }))}
                        </ul>
                    </div>
                </div>
                <div className='editor'>
                    <div className="cardview-main">
                        <p>Question</p>
                        <div className="cardview-quest">
                            <textarea rows="10" cols="70" wrap="hard"
                                id="question"
                                placeholder="Question?"
                                value={this.state.temp_card.question}
                                onChange={(e) => { this.handleChangeQuestion(e) }}>
                                ></textarea>
                            <textarea className="cardview-quest-spell"
                                value={this.state.suggestion}
                                placeholder="Spell Check Suggestions"
                                readOnly
                            ></textarea>

                        </div>

                        <p>Answers</p>
                        <div className="ans-common cardview-corr">
                            <textarea rows="3" cols="70"
                                id="correct_answer"
                                placeholder="Correct Answer"
                                value={this.state.temp_card.correct_answer}
                                onChange={(e) => { this.handleChangeQuestion(e) }}>
                                ></textarea>
                        </div>

                        <div className="ans-common cardview-ans1">
                            <textarea rows="3" cols="70"
                                id="answer_1"
                                placeholder="Answer 1"
                                value={this.state.temp_card.answer_1}
                                onChange={(e) => { this.handleChangeQuestion(e) }}>
                                ></textarea>
                        </div>

                        <div className="ans-common cardview-ans2">
                            <textarea rows="3" cols="70"
                                id="answer_2"
                                placeholder="Answer 2"
                                value={this.state.temp_card.answer_2}
                                onChange={(e) => { this.handleChangeQuestion(e) }}>
                                ></textarea>
                        </div>

                        <div className="ans-common cardview-ans3">
                            <textarea rows="3" cols="70"
                                id="answer_3"
                                placeholder="Answer 3"
                                value={this.state.temp_card.answer_3}
                                onChange={(e) => { this.handleChangeQuestion(e) }}>
                                ></textarea>
                        </div>

                        <div className="ans-common cardview-ans4">
                            <textarea rows="3" cols="70"
                                id="answer_4"
                                placeholder="Answer 4"
                                value={this.state.temp_card.answer_4}
                                onChange={(e) => { this.handleChangeQuestion(e) }}>
                                ></textarea>
                        </div>

                    </div>
                </div>

                <div className='options'>
                    <div className="cardopt-main">
                        <button
                            disabled={!this.state.createCard_Enabled}
                            className='cardopt-button'
                            onClick={() => { this.createCard(this.state.temp_card) }}
                        >Add Card</button>
                        <br />
                        <button
                            className='cardopt-button'
                            disabled={!this.state.clrCard_Enabled}
                            onClick={() => { this.clearForm() }}
                        >Clear Form</button>
                        <br />
                        <button
                            className='cardopt-button'
                            disabled={!this.state.delCard_Enabled}
                            onClick={() => { this.delCard(this.state.card) }}
                        >Delete Card</button>
                        <br />
                        <button
                            className='cardopt-button'
                            disabled={!this.state.updCard_Enabled}
                            onClick={() => { this.updateCard(this.state.card) }}
                        >Update Card</button>
                        <br />
                        <button
                            className='cardopt-button'
                            // disabled={!this.state.updCard_Enabled}
                            onClick={this.spellClick}
                        >Spell Check</button>
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

export default connect(mapStateToProps, { getUser, getDecks, getCards })(CardEditor)
