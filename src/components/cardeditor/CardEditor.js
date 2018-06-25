import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import './cardeditor.css';
import { connect } from 'react-redux'
import { getUser, getCards } from './../../ducks/user'



class CardEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            li_active: true,
            thisClass: null,
            createCard_Enabled: false,
            clrCard_Enabled: false,
            delCard_Enabled: false,
            updCard_Enabled: false,
            rtnDash_Enabled: true,

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
        this.delResponse = this.delResponse.bind(this)
        this.updateDeck = this.updateDeck.bind(this)
        this.updateCard = this.updateCard.bind(this)
        this.createCard = this.createCard.bind(this)
        this.delCard = this.delCard.bind(this)
    }

    componentDidMount() {
        this.props.getUser()
            .then(() => {
                this.setState({
                    temp_response: { ...this.state.temp_response, user_id: +this.props.user.id, }
                })
            }).then(this.reloadCards())
    }

    reloadCards() {
        const deck_id = +this.props.match.params.id
        this.props.getCards(deck_id)
            .then(this.setState({
                card: { ...this.state.card, deck_id: deck_id, }
            }))
    }

    // When is this used?
    updateDeck(deck) {
        console.log('updateDeck ', deck);
        axios.put(`/cards/deck/${deck.id}`, deck)
            .then(results => {
                this.setState({ 'deck': results.data });
            })
    }

    delCard(card) {
        console.log('delcard ', card)
        axios.delete(`/cards/card/delete/${card.id}`)

            .then(results => {
                // this.setState({ 'card': results.data });
                this.setState({ delCard_Enabled: false });
                this.reloadCards()
                this.clearForm()
            })
    }

    // No longer needed? 
    delResponse(card) {
        axios.delete(`/cards/card/response/${card.id}`)
        // .then(results => {
        // this.setState({ 'temp_response': results.data });
        // this.setState({ delCard_Enabled: false });
        // this.reloadCards()
        // })
    }

    updateCard(card) {
        const cardId = card.id
        delete card.id
        console.log('updateCard ', card);
        axios.put(`/cards/card/${cardId}`, card)
            .then(results => {
                this.setState({ card: results.data });
                this.setState({ updCard_Enabled: false });
                this.reloadCards()
            })
    }
    createCard(card) {
        // const sendCard
        this.setState({
            temp_card: Object.assign({}, this.state.temp_card,
                { deck_id: this.state.card.deck_id })
        }, () => {
            console.log('createCard ', this.state.temp_card)
            axios.post(`/cards/deck/card`, this.state.temp_card)
                .then(results => {
                    this.setState({ card: results.data });
                })
                .then(this.addResponse()).then(this.reloadCards())
        })
    }

    addResponse() {
        // const resp = { card_id: this.state.card.id, deck_id: this.state.card.deck_id }
        // card_id, user_id, res_time, deck_id
        this.setState({
            temp_response: Object.assign({}, this.state.temp_response,
                { card_id: this.state.card.id, deck_id: this.state.card.deck_id })
        }, () => {
            console.log('addResponse', this.state.temp_response)
            // axios.post(`/cards/deck/response`, this.state.temp_response)
            //     .then(results => {
            //         this.setState({ 'response': results.data });
            //     })
        })
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


    listHandleClick(list_card) {
        this.setState({
            delCard_Enabled: true,
            clrCard_Enabled: true,
            card: list_card,
            temp_card: {
                question: list_card.question, answer_1: list_card.answer_1,
                answer_2: list_card.answer_2, answer_3: list_card.answer_3,
                answer_4: list_card.answer_4, image: list_card.image,
                correct_answer: list_card.correct_answer
            }




        }, () => {
            // console.log("card ", item.id)
            // console.log("temp_card ", this.state.temp_card)
            // console.log("card ", this.state.card)
            // console.log("CardEditor ", this.state.card.id)
        })
    }

    render() {
        // console.log("CardEditor ", this.state.temp_response)
        return (
            <div className='cardeditor-container'>

                <div className='list'>
                    <ul>
                        {this.props.cards.map(((list_card, i) => {

                            return (
                                <li key={i}
                                    onClick={() => { this.listHandleClick(list_card) }}
                                >{list_card.question}
                                </li>
                            )
                        }))}
                    </ul>

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
        cards: state.cards
    }
}

export default connect(mapStateToProps, { getUser, getCards })(CardEditor)
