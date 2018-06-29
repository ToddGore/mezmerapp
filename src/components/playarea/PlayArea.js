import React, { Component } from 'react'
import './playarea.css';
import '../reset.css'
import { connect } from 'react-redux'
import { getCards } from './../../ducks/user'
import { Link } from "react-router-dom";
import axios from 'axios';



class PlayArea extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card: {},
            cards: [],
            active: false,
            correct: false,
            showModal: false,
            removeModal: false,
            answerState: false,
            answerText: '',
            answerFlash: false,
            respStart: 0,
            respStop: 0,
            respTime: 0,
            ledTime: true,
            selElement: ''

        };
        this.toggleClass = this.toggleClass.bind(this)
        this.cardSelector = this.cardSelector.bind(this)
        this.displayCard = this.displayCard.bind(this)
        this.AnswerClickHandler = this.AnswerClickHandler.bind(this)
        this.AnswerModal = this.AnswerModal.bind(this)
        this.chooseStyle = this.chooseStyle.bind(this)
        this.updateResponse = this.updateResponse.bind(this)

    }

    componentDidMount() {
        console.log('props ', +this.props.match.params.id)
        // const deck_id = 3
        // console.log('DeckID ', deck_id)

        this.props.getCards(+this.props.match.params.id)
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
        // Gets new values for the card
        let card = this.cardSelector()
        // console.log('cardSel ', card)

        // Set sate card to the new card data, Remove colors from card items
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
            // answerState: false
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
            showModal: true
        })
    }

    // Evaluate answer
    AnswerClickHandler(answer) {
        const card = this.state.card

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
            default:
                break;
        }


        // If answer is correct
        if (card.correct_answer === card[answer]) {

            this.respTimer('stop')
            this.setState({
                selElement: 'box green green:hover'
            })


            this.setState({
                answerState: true,
                answerText: 'Correct !'
            })
            // Display the modal
            this.AnswerModal()

            setTimeout(() => {

                // Remove Modal after time delay
                this.setState({
                    removeModal: true,
                    showModal: false
                })

                // Write data to Response Table ? 
                // Currently being done in Response Timer


                // flip card back after time delay
                // this.toggleClass()

                // Makes card flip back to "Are you Ready" after delay
                this.setState({ active: false });

                // Wait, and then flip back to the next question
                setTimeout(() => {
                    this.setState({ active: true });
                }, 900)

                // Display a new question after time delay
                this.displayCard()

            }, 1000)
            // this.setState({ active: true });



            // Answer is wrong
        } else if (card.correct_answer !== card[answer]) {

            // Turns the clicked "wrong" item red
            this.setState({
                selElement: 'box red red:hover'
            })



            // className={
            //     this.state.ans4w ? 'box red red:hover' :
            //         this.state.ans4 ? 'box green green:hover' : 'box'
            // }
            console.log('Correct Answer = ', card)
            console.log('Card Answer 1= ', card.answer_1)
            switch (card.correct_answer) {

                case card.answer_1:
                    this.setState({ ans1w: true, ans2w: false, ans3w: false, ans4w: false })
                    break;
                case card.answer_2:
                    this.setState({ ans1w: false, ans2w: true, ans3w: false, ans4w: false })
                    break;
                case card.answer_3:
                    this.setState({ ans1w: false, ans2w: false, ans3w: true, ans4w: false })
                    break;
                case card.answer_4:
                    this.setState({ ans1w: false, ans2w: false, ans3w: false, ans4w: true })
                    break;
                default:
                    break;
            }

            this.setState({
                answerState: false,
                answerText: 'Wrong',
                // answerFlash: true
            })
            this.AnswerModal()


            setTimeout(() => {
                this.setState({
                    removeModal: true,
                    showModal: false,
                })

                // Flash correct answer

                this.setState({ active: false });

                // Wait, and then flip back to the next question
                setTimeout(() => {
                    this.setState({ active: true });
                }, 900)

                // flip card back
                // this.toggleClass()

                // Displays a new card
                this.displayCard()
            }, 4000)

        }
        // Next?

    }

    // Experimenting with styles in code
    chooseStyle(answer) {
        const card = this.state.card
        if (card.correct_answer === card[answer]) {
            return {
                padding: '10px 10px',
                textAlign: 'left',
                display: 'block',
                height: '60px',
                width: '280px',
                borderTop: '1px solid lightgray',
                margin: '10px auto',
                fontSize: '16px'
            }
        }
    }

    respTimer(status) {
        const d = new Date();
        const t = d.getTime();

        if (status === 'start') {
            // console.log('respStart ', t)
            // Wait one second before starting the timer
            setTimeout(() => {
                this.setState({
                    ledTime: false,
                    respStart: t,
                    // respStop: t
                })
            }, 1500)

        } else if (status === 'stop') {
            // console.log('respStop ', t)
            this.setState({
                ledTime: true,
                respStop: t,

            }, () => {
                let respTimeTtl = this.state.respStop - this.state.respStart
                this.setState({
                    respTime: respTimeTtl
                })
                // Write data to Response table
                this.updateResponse(respTimeTtl)
            })


        }
    }

    updateResponse(resp) {
        let card = this.state.card
        // console.log('updateDeck ', deck);
        axios.put(`/cards/deck/response/${card.id}`, { res_time: resp })
            .then(results => {
                this.setState({ 'deck': results.data });
            })
    }







    render() {

        return (
            <div className='playarea-container'>
                <div className='leftcard'></div>

                <div className='playcard'>

                    <div className="scene scene--card">
                        <div
                            className={this.state.active ? 'card is-flipped' : 'card'}
                            onClick={() => {
                                // Without this your card will not flip when you click it
                                this.toggleClass()
                                // Starts the response timer
                                this.respTimer('start')

                            }}
                        >
                            <div className="card__face card__face--front">Are you ready?</div>
                            <div className="card__face card__face--back">
                                <div className='quest-box'>
                                    {this.state.card.question}
                                </div>
                                <div
                                    className={
                                        this.state.ans1 ? this.state.selElement :
                                            this.state.ans1w ? 'flash box' : 'box'
                                    }
                                    onClick={() => this.AnswerClickHandler('answer_1')}
                                >{this.state.card.answer_1}</div>
                                <div
                                    className={
                                        this.state.ans2 ? this.state.selElement :
                                            this.state.ans2w ? 'flash box' : 'box'
                                    }

                                    onClick={() => this.AnswerClickHandler('answer_2')}
                                >{this.state.card.answer_2}</div>
                                <div
                                    className={
                                        this.state.ans3 ? this.state.selElement :
                                            this.state.ans3w ? 'flash box' : 'box'
                                    }

                                    onClick={() => this.AnswerClickHandler('answer_3')}
                                >{this.state.card.answer_3}</div>
                                <div
                                    className={
                                        this.state.ans4 ? this.state.selElement :
                                            this.state.ans4w ? 'flash box' : 'box'
                                    }

                                    onClick={() => this.AnswerClickHandler('answer_4')}
                                >{this.state.card.answer_4}</div>
                            </div>
                        </div>
                    </div>
                    {/* End? */}



                    {/* The Modal */}
                    <div id="myModal" className={
                        this.state.showModal ? "modal" :
                            this.state.removeModal ? "modal-out" : "modal-none"}>
                        {/* Modal content */}
                        <div className="modal-content">
                            <div className={this.state.answerState ? `modal-header green` : "modal-header red"}>
                                <span
                                    className={this.state.showModal ? "close" : "close-none"}
                                    onClick={() => this.AnswerModal()}
                                >&times;</span>
                                <h2> </h2>
                            </div>
                            <div className="modal-body">
                                <p>{this.state.answerText}</p>
                                <p> </p>
                            </div>
                            <div className={this.state.answerState ? "modal-footer green" : "modal-footer red"} >
                                <h3> </h3>
                            </div>
                        </div>

                    </div>

                </div>
                <div className='rightcard'>
                    <Link to={`/dashboard/deckarea`}>
                        <button className='rtn-btn'>Return to Dashboard</button>
                    </Link>
                    {/* <div className={this.state.ledTime ? "led green" : "led red"}>
                        {this.state.respTime}
                    </div> */}
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
