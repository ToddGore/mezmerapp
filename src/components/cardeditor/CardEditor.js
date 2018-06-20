import React, { Component } from 'react'
import './cardeditor.css';
import { connect } from 'react-redux'
import { getCards } from './../../ducks/user'
import CardList from '../cardlist/CardList'
import CardView from '../cardview/CardView'
import CardOptions from '../cardoptions/CardOptions'

class CardEditor extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        console.log('cardeditor ', this.props)
        this.props.getCards(+this.props.match.params.id)

    }




    render() {

        return (
            <div className='cardeditor-container'>

                <div className='list'>
                    <CardList cards={this.props.cards} />
                </div>

                <div className='editor'>
                    <CardView />
                </div>

                <div className='options'>
                    <CardOptions />
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

export default connect(mapStateToProps, { getCards })(CardEditor)
