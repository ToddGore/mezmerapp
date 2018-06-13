import React, { Component } from 'react'
// import logo from './communityBank.svg'
import './signup.css'


export default class Login extends Component {
    render() {
        return (
            <div className="Signup">
                {/* <img src={logo} alt="" /> */}
                <a href={process.env.REACT_APP_LOGIN}>
                    <button>Login</button>
                </a>
            </div>
        )
    }
}
