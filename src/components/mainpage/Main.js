import React, { Component } from 'react';
import './main.css'
import '../reset.css'

class Main extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        return (
            <div id="Header">
                <ul className="nav-contain">
                    <li className="nav-items">About</li>
                    <li className="nav-items">Browse</li>
                    <li className="nav-items">Search</li>
                    <li> <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a></li>
                </ul>
            </div>

        );
    }
}

export default Main;