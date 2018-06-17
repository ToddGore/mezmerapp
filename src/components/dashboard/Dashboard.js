import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser, getDecks } from './../../ducks/user'
import './dashboard.css';
import DeckArea from '../deckarea/DeckArea'
import { Switch, Route } from 'react-router-dom'
import Main from '../mainpage/Main'
import DashHeader from '../dashheader/DashHeader'
import DashNav from '../dashnav/DashNav'
import DashFooter from '../dashfooter/DashFooter'


class Dashboard extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getUser()
            .then(() => {
                this.props.getDecks(this.props.user.id)
            });
    }

    render() {

        let { user_name, picture } = this.props.user;
        console.log('decks dash ', this.props)

        return (
            <div>

                <div className="grid">
                    <DashNav picture={picture} username={user_name} />
                    <DashHeader />
                    <div className="deck-view">
                        <Switch>
                            <Route path='/' component={Main} exact />
                            <Route path='/private' component={DeckArea} />
                        </Switch>
                    </div>
                    <DashFooter />
                </div>


                {/* <a href="http://localhost:3047/auth/logout">Failure - Please login Again</a> */}


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