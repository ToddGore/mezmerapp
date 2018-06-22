import React, { Component } from 'react';
import './cardoprions.css'


class CardOptions extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className="cardopt-main">
                <button className='cardopt-button'>Add Card</button>
                <br />
                <button className='cardopt-button'>Clear Form</button>
                <br />
                <button className='cardopt-button'>Delete Card</button>
                <br />
                <button className='cardopt-button'>Update Card</button>
            </div>
        );
    }
}

export default CardOptions;