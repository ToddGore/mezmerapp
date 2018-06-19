import React, { Component } from 'react';
import './main.css'
import '../reset.css'

class Main extends Component {

    render() {
        return (
            <div>
                <header id="Header">
                    <ul className="nav-contain">
                        <li className="nav-items">About</li>
                        <li className="nav-items">Browse</li>
                        <li className="nav-items">Search</li>
                        <li> <a href={process.env.REACT_APP_LOGIN}><button>Login</button></a></li>
                    </ul>
                </header>
                <div className="main-body">
                    <h2>This is the body</h2>
                </div>
            </div>
        );
    }
}

export default Main;