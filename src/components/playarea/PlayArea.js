import React, { Component } from 'react'
import './playarea.css';


class PlayArea extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (
            <div className='cardeditor-container'>
                <div className='leftcard'></div>
                <div className='playcard'>play card</div>
                <div className='rightcard'></div>
            </div>
        );
    }
}

export default PlayArea;