import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser, getDecks } from './../../ducks/user'
import './dashboard.css';
import DeckArea from '../deckarea/DeckArea'
import axios from 'axios';



class Dashboard extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        // }
    }

    componentDidMount() {
        this.props.getUser()
            .then(() => {
                this.props.getDecks(this.props.user.id)
            });


    }

    render() {


        let { user_name, picture, auth_id } = this.props.user;
        console.log('decks dash ', this.props.decks)

        return (
            <div>

                {user_name ? (
                    <div className="grid">
                        <div id="sidebar">
                            <div className="sidebar-image">
                                <img className="image-circle" src={picture} alt="user image" />
                            </div>
                            <div className="user-name">
                                {user_name}
                            </div>
                            <div className="sidebar-body">

                            </div>
                            <div className="logout-container">
                                <a href="http://localhost:3047/auth/logout">
                                    <button type="" className="logout-button">Log Out</button></a>
                            </div>

                        </div>
                        <div className="deck-header">

                        </div>
                        <div className="deck-view">
                            <DeckArea deckProps={this.props.decks} />
                        </div>
                        <footer>
                            Footer
                        </footer>
                    </div>


                ) : (
                        // Failure
                        <a href="http://localhost:3047/auth/logout">Failure - Please login Again</a>
                    )}

            </div>
        )
    }
}



// This is Redux store state
// We are mapping redux store state to this components Props object
// Now I have access this.props.user this is what is in user.js state.
function mapStateToProps(state) {
    return {
        user: state.user,
        decks: state.decks
    }
}


// We can connect any action creators to this. See getUser
// getUser will now be available on props
export default connect(mapStateToProps, { getUser, getDecks })(Dashboard)