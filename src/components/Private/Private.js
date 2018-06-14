import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser, getDecks } from './../../ducks/user'


class Private extends Component {
    componentDidMount() {
        this.props.getUser();
    }
    bankBalance() {
        return "$" + Math.floor((Math.random() + 1) * 1000) + ".00";
    }

    render() {

        let { user_name, picture, auth_id } = this.props.user;
        return (
            <div>
                <h2>Account Information:</h2>
                <hr />
                {user_name ? (
                    <div>
                        <img src={picture} alt="" />
                        <p>Account Name: {user_name}</p>
                        <p>Account Number: {auth_id}</p>
                        <p>Balance: {this.bankBalance()}</p>
                    </div>
                ) : (
                        <p>Please login</p>
                    )}
                <a href="http://localhost:3047/auth/logout">
                    <button type="" className="">
                        logout
          </button>
                </a>
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
export default connect(mapStateToProps, { getUser, getDecks })(Private)