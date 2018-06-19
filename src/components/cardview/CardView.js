import React, { Component } from 'react';
import './cardview.css'

class CardView extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="cardview-main">
                <p>Question</p>
                <div className="cardview-quest"></div>
                <p>Answers</p>
                <div className="cardview-ans1"></div>
                <div className="cardview-ans2"></div>
                <div className="cardview-ans3"></div>
                <div className="cardview-ans4"></div>
            </div>
        );
    }
}

export default CardView;