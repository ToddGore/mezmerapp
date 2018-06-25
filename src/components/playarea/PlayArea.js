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
            correct: false,
            showModal: false

        };
        this.toggleClass = this.toggleClass.bind(this)
        this.cardSelector = this.cardSelector.bind(this)
        this.displayCard = this.displayCard.bind(this)
        this.AnswerClickHandler = this.AnswerClickHandler.bind(this)
        this.AnswerModal = this.AnswerModal.bind(this)
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
            ans4: false,
            ans1w: false,
            ans2w: false,
            ans3w: false,
            ans4w: false,
        })

    }

    cardSelector() {
        // an array of cards
        const cards = this.props.cards;
        const curCard = cards[Math.floor(Math.random() * cards.length)];
        return curCard
    }

    AnswerModal() {
        const currentState = this.state.showModal;
        this.setState({
            showModal: !currentState
        })
    }

    AnswerClickHandler(answer) {
        const card = this.state.card


        if (card.correct_answer === card[answer]) {

            switch (answer) {
                case 'answer_1':
                    this.setState({ ans1: true, ans2: false, ans3: false, ans4: false })
                    break;
                case 'answer_2':

                    this.setState({ ans1: false, ans2: true, ans3: false, ans4: false })
                    break;
                case 'answer_3':
                    this.setState({ ans1: false, ans2: false, ans3: true, ans4: false })
                    break;
                case 'answer_4':
                    this.setState({ ans1: false, ans2: false, ans3: false, ans4: true })
                    break;
            }

        } else if (card.correct_answer !== card[answer]) {
            switch (answer) {
                case 'answer_1':
                    this.setState({ ans1w: true, ans2w: false, ans3w: false, ans4w: false })
                    break;
                case 'answer_2':
                    this.setState({ ans1w: false, ans2w: true, ans3w: false, ans4w: false })
                    break;
                case 'answer_3':
                    this.setState({ ans1w: false, ans2w: false, ans3w: true, ans4w: false })
                    break;
                case 'answer_4':
                    this.setState({ ans1w: false, ans2w: false, ans3w: false, ans4w: true })
                    break;
            }


        }
        // Next?

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
                            className={this.state.active ? 'card is-flipped' : 'card'}
                            onClick={this.toggleClass}
                        >
                            <div className="card__face card__face--front">Are you ready?</div>
                            <div className="card__face card__face--back">
                                <div className='quest-box'>
                                    {this.state.card.question}
                                </div>
                                <div
                                    className={this.state.ans1 ? 'box green green:hover' :
                                        this.state.ans1w ? 'box red red:hover' : 'box'}
                                    onClick={() => this.AnswerClickHandler('answer_1')}
                                >{this.state.card.answer_1}</div>
                                <div
                                    className={this.state.ans2 ? 'box green green:hover' :
                                        this.state.ans2w ? 'box red red:hover' : 'box'}

                                    onClick={() => this.AnswerClickHandler('answer_2')}
                                >{this.state.card.answer_2}</div>
                                <div
                                    className={this.state.ans3 ? 'box green green:hover' :
                                        this.state.ans3w ? 'box red red:hover' : 'box'}

                                    onClick={() => this.AnswerClickHandler('answer_3')}
                                >{this.state.card.answer_3}</div>
                                <div
                                    className={this.state.ans4 ? 'box green green:hover' :
                                        this.state.ans4w ? 'box red red:hover' : 'box'}

                                    onClick={() => this.AnswerClickHandler('answer_4')}
                                >{this.state.card.answer_4}</div>
                            </div>
                        </div>
                    </div>
                    {/* End? */}

                    {/* Trigger/Open The Modal */}
                    <button id="myBtn"
                        onClick={() => this.AnswerModal()}
                    >Open Modal</button>

                    {/* The Modal */}
                    <div id="myModal" className={this.state.showModal ? "modal" : "modal-none"}>
                        {/* Modal content */}
                        <div className="modal-content">
                            <div className="modal-header">
                                <span
                                    className={this.state.showModal ? "close" : "close-none"}
                                    onClick={() => this.AnswerModal()}
                                >&times;</span>
                                <h2>Modal Header</h2>
                            </div>
                            <div className="modal-body">
                                <p>Some text in the Modal Body</p>
                                <p>Some other text...</p>
                            </div>
                            <div className="modal-footer">
                                <h3>Modal Footer</h3>
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
