import React from 'react';
import './dashnav.css'

export default function Nav(props) {
    return (
        <div id="sidebar">
            <div className="sidebar-image">
                <img className="image-circle" src={props.picture} alt="user" />
            </div>
            <div className="user-name">
                {props.username}
            </div>
            <div className="sidebar-body">

            </div>
            <div className="logout-container">
                <a href="http://localhost:3047/auth/logout">
                    <button type="" className="logout-button">Log Out</button></a>
            </div>

        </div>
    )
}