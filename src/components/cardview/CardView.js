import React, { Component } from 'react';
import './cardview.css'

class CardView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            card: { question: "", content: "", date: "" },
        };
    }
    render() {
        return (
            <div className="cardview-main">
                <p>Question</p>
                <div className="cardview-quest">
                    <textarea rows="10" cols="70"
                        placeholder="Question?"
                        value={this.state.card.question}
                        onChange={this.handleChangeQuestion}>
                        ></textarea>
                </div>

                <p>Answers</p>
                <div className="ans-common cardview-corr">
                    <textarea rows="3" cols="70"
                        placeholder="Correct Answer"
                        value={this.state.card.question}
                        onChange={this.handleChangeQuestion}>
                        ></textarea>
                </div>
                <div className="ans-common cardview-ans1">
                    <textarea rows="3" cols="70"></textarea>
                </div>
                <div className="ans-common cardview-ans2">
                    <textarea rows="3" cols="70"></textarea>
                </div>
                <div className="ans-common cardview-ans3">
                    <textarea rows="3" cols="70"></textarea>
                </div>
                <div className="ans-common cardview-ans4">
                    <textarea rows="3" cols="70"></textarea>
                </div>
            </div>
        );
    }
}

export default CardView;