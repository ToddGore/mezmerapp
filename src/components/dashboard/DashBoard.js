import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getUser, getDecks } from './../../ducks/user'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import './dashboard.css';


import DashNav from '../dashnav/DashNav'
import DashHeader from '../dashheader/DashHeader'
import DashFooter from '../dashfooter/DashFooter'

import DeckArea from '../deckarea/DeckArea'
import PlayArea from '../playarea/PlayArea'
import CardEditor from '../cardeditor/CardEditor'
import DeckEditor from '../deckeditor/DeckEditor'

// Hello

class Dashboard extends Component {


    componentDidMount() {
        this.props.getUser()
            .then(() => {
                this.props.getDecks(this.props.user.id)
            });
    }

    render() {
        // console.log('Dash ', this.props.user)
        return (
            <Router>
                <div className="grid">
                    <DashNav username={this.props.user.user_name} picture={this.props.user.picture} />
                    <DashHeader />
                    <div className="deck-view">
                        <Switch>
                            <Route exact path="/dashboard/deckarea" component={DeckArea} />
                            <Route path="/dashboard/playarea/:id" component={PlayArea} />
                            <Route path="/dashboard/deckeditor/" component={DeckEditor} />
                            <Route path="/dashboard/cardeditor/:id"
                                component={CardEditor} />
                        </Switch>
                        {/* <DeckArea /> */}
                    </div>
                    <DashFooter />
                </div>
            </Router>
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