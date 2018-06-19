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
                <table className='cardlist-q-table'>
                    <tr><th className='cardlist-q-table-dn'>Deck Name</th></tr>
                    <tr><th className='cardlist-q-table-numc'>Number of Cards:</th></tr>
                    <tr><th className='cardlist-q-table-empty'></th></tr>
                    <tr><th>QUESTIONS</th></tr>
                    <tr><td>Test</td></tr>
                    <tr><td>Test 2</td></tr>
                    <tr><td>Test 3</td></tr>
                    <tr><td>Test 4</td></tr>
                    <tr><td>Test 5</td></tr>
                    <tr><td>Test 6</td></tr>
                </table>

            </div>
        );
    }
}

export default CardList;