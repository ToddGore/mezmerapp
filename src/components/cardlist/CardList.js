import React, { Component } from 'react';
import './cardlist.css'


class CardList extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {

        return (
            <div>
                <ul>
                    {this.props.cards.map(((card, i) => {
                        return (
                            <li key={i}>{card.question}</li>
                        )
                    }))}
                </ul>

            </div>
        );
    }
}

export default CardList;