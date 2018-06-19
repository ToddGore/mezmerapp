import React, { Component } from 'react'
import './cardeditor.css';
import CardList from '../cardlist/CardList'
import CardView from '../cardview/CardView'

class CardEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        console.log('card editor ', this.props.match.params)
        return (
            <div className='cardeditor-container'>
                <div className='list'>
                    <CardList />
                </div>

                <div className='editor'>
                    <CardView />
                </div>

                <div className='options'>Section 3</div>
            </div>
        );
    }
}

export default CardEditor;