import React, { Component } from 'react'
import { Link } from "react-router-dom";
import axios from 'axios';
import './cardeditor.css';
import { connect } from 'react-redux'
import { getCards } from './../../ducks/user'



class CardEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {
            li_active: true,
            thisClass: null,
            addCard_Enabled: false,
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

        }

        this.handleChangeQuestion = this.handleChangeQuestion.bind(this)
        this.listHandleClick = this.listHandleClick.bind(this)
    }

    componentDidMount() {
        // console.log('cardeditor ', +this.props.match.params.id)
        this.props.getCards(+this.props.match.params.id)
            .then(this.setState({
                // deck_id: +this.props.match.params.id
                card: { ...this.state.card, deck_id: +this.props.match.params.id, }
            }))

    }

    updateDeck(deck) {
        console.log('updateDeck ', deck);
        axios.put(`/cards/deck/${deck.id}`, deck)
            .then(results => {
                this.setState({ 'deck': results.data });
            })
    }


    updateCard(card) {
        console.log('updateCard ', card);
        axios.put(`/cards/deck/${card.id}`, card)
            .then(results => {
                this.setState({ 'card': results.data });
            })
    }

    handleChangeQuestion(e) {

        this.setState({
            temp_card: Object.assign({}, this.state.temp_card, { [e.target.id]: e.target.value })
        })
    }
    
    listHandleClick(item) {

        this.setState({
            card: item,
            temp_card: item
        }, () => {
            console.log("card ", this.state.card)
            console.log("temp_card ", this.state.temp_card)
        })
    }

    render() {
        // console.log("Cards ", this.props.cards)
        return (
            <div className='cardeditor-container'>

                <div className='list'>
                    <ul>
                        {this.props.cards.map(((card, i) => {

                            return (
                                <li key={i}
                                    onClick={() => { this.listHandleClick(card) }}
                                >{card.question}
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
                        disabled={!this.state.addCard_Enabled} 
                        className='cardopt-button'
                        >Add Card</button>
                        <br />
                        <button 
                        className='cardopt-button'
                        disabled={!this.state.clrCard_Enabled} 
                        >Clear Form</button>
                        <br />
                        <button 
                        className='cardopt-button'
                        disabled={!this.state.delCard_Enabled} 
                        >Delete Card</button>
                        <br />
                        <button 
                        className='cardopt-button'
                        disabled={!this.state.updCard_Enabled} 
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
        cards: state.cards
    }
}

export default connect(mapStateToProps, { getCards })(CardEditor)
