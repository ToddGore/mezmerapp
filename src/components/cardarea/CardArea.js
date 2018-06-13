import React, { Component } from 'react'
import Card from '../card/Card'





class CardArea extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div>
                <h2>CardArea</h2>
                <Card />
            </div>
        );
    }
}

export default CardArea;