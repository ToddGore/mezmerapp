import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser } from './../../ducks/user'
import './dashboard.css';
import CardArea from '../cardarea/CardArea'




class Dashboard extends Component {
    componentDidMount() {
        this.props.getUser();
    }

    render() {
        let tempInfo = {
            user_name: 'Kitty',
            picture: 'http://placekitten.com/200/200',
            auth_id: 'hjdhj4jhdj'
        }

        // let { user_name, picture, auth_id } = this.props.user;
        let { user_name, picture, auth_id } = tempInfo;

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
                            <CardArea />
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
        user: state.user
    }
}


// We can connect any action creators to this. See getUser
// getUser will now be available on props
export default connect(mapStateToProps, { getUser })(Dashboard)