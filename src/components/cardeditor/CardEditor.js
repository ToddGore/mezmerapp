import React, { Component } from 'react'
import './cardeditor.css';


class CardEditor extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='cardeditor-container'>
                <div className='list'>Section 1</div>
                <div className='editor'>Section 2</div>
                <div className='options'>Section 3</div>
            </div>
        );
    }
}

export default CardEditor;