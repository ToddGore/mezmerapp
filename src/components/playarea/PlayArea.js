import React, { Component } from 'react'
import './playarea.css';
import '../reset.css'
import { connect } from 'react-redux'
import { getCards } from './../../ducks/user'
import { Link } from "react-router-dom";

import { matchPath } from 'react-router'





class PlayArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: {},
            cards: [],
            active: false,
            correct: false

        };
        this.toggleClass = this.toggleClass.bind(this)
        this.cardSelector = this.cardSelector.bind(this)
        this.displayCard = this.displayCard.bind(this)
        this.AnswerClickHandler = this.AnswerClickHandler.bind(this)
    }
    componentDidMount() {

        const deck_id = 3
        console.log('DeckID ', deck_id)
        this.props.getCards(deck_id)
            .then(this.setState({
                cards: this.props.cards
            }))
    }

    toggleClass() {
        // const currentState = this.state.active;
        // this.setState({ active: !currentState });
        this.setState({ active: true });
        if (!this.state.active) {
            this.displayCard()
        }

    };

    displayCard() {
        let card = this.cardSelector()
        console.log('cardSel ', card)
        this.setState({
            card: card,
            ans1: false,
            ans2: false,
            ans3: false,
            ans4: false
        })

    }

    cardSelector() {
        // an array of cards
        const cards = this.props.cards;
        const curCard = cards[Math.floor(Math.random() * cards.length)];
        return curCard
    }

    AnswerClickHandler(answer) {
        const card = this.state.card
        // console.log('Answer Clicked ', card.correct_answer, card[answer])

        if (card.correct_answer === card[answer]) {

            switch (answer) {
                case 'answer_1':
                    this.setState({ ans1: true, ans2: false, ans3: false, ans4: false })
                    break;
                case 'answer_2': // Mary
                    console.log(card[answer], card.answer_2)
                    this.setState({ ans1: false, ans2: true, ans3: false, ans4: false })
                    break;
                case 'answer_3':
                    this.setState({ ans1: false, ans2: false, ans3: true, ans4: false })
                    break;
                case 'answer_4':
                    this.setState({ ans1: false, ans2: false, ans3: false, ans4: true })
                    break;
            }

        }



        // if (card.correct_answer === card[answer]) {
        //     this.setState({
        //         correct: true
        //     })
        //     console.log('Correct Answer ', card[answer])
        // }
    }


    render() {
        // console.log('Whats in props', this.props.cards)
        // console.log('Whats in state', this.state)
        return (
            <div className='playarea-container'>
                <div className='leftcard'></div>

                <div className='playcard'>

                    <div className="scene scene--card">
                        <div
                            // className="card"
                            className={this.state.active ? 'card is-flipped' : 'card'}
                            onClick={this.toggleClass}
                        >
                            <div className="card__face card__face--front">Are you ready?</div>
                            <div className="card__face card__face--back">
                                <div className='quest-box'>
                                    {this.state.card.question}
                                </div>
                                <div
                                    className={this.state.ans1 ? 'answ1 box green' : 'answ1 box'}
                                    onClick={() => this.AnswerClickHandler('answer_1')}
                                >{this.state.card.answer_1}</div>
                                <div
                                    className={this.state.ans2 ? 'answ2 box green' : 'answ2 box'}
                                    onClick={() => this.AnswerClickHandler('answer_2')}
                                >{this.state.card.answer_2}</div>
                                <div
                                    className={this.state.ans3 ? 'answ3 box green' : 'answ3 box'}
                                    onClick={() => this.AnswerClickHandler('answer_3')}
                                >{this.state.card.answer_3}</div>
                                <div
                                    className={this.state.ans4 ? 'answ4 box green' : 'answ4 box'}
                                    onClick={() => this.AnswerClickHandler('answer_4')}
                                >{this.state.card.answer_4}</div>
                            </div>
                        </div>
                    </div>


                </div>


                <div className='rightcard'>
                    <Link to={`/dashboard/deckarea`}>
                        <button>Return to Dashboard</button>
                    </Link>
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

export default connect(mapStateToProps, { getCards })(PlayArea)
