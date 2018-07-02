import React, { Component } from 'react';
import './main.css'
import '../reset.css'
import { css } from 'emotion'
import mainBackground from './../images/quiz_background.jpg'


class Main extends Component {

    render() {
        return (
            <div>
                <div className={css`
                display: grid;
                grid-gap: 10px;
                color: white;
                padding: 0 10px;
                height: 75px;
                width: 100%;
                background-color: black;
                grid-template-columns: 1fr 3fr 1fr;
                grid-template-areas: 
                "logo middle nav";
                `}>

                    <div className={css`
                font-family: "WickedMouseDemo", Times, serif;
                margin 25px auto;
                font-size: 28px;
                grid-area: logo;
                `}>MEZMER APP</div>
                    <div className={css`
                        grid-area: middle;
                        width: 50%;
                    `}></div>
                    <ul className={css`
                    grid-area: nav;
                    margin 13px auto;
                    display: flex;
                    justify-content: center;
                    // border: 1px solid red;
                    height: 50px;
                    width: 300px;
                    align-items: center;

                    `}>
                        <li className="nav-items">About</li>
                        <li className="nav-items">Browse</li>
                        <li className="nav-items">Search</li>
                        <li> <a className="nav-items" href={process.env.REACT_APP_LOGIN}>Login</a></li>
                    </ul>
                </div>


                <div className={css`
                    background-image: url(${mainBackground});
                    background-repeat: no-repeat;
                    background-size: 100%;
                    // 1475px 816px
                    height: 1000px;
                    width: auto;
                `}>

                </div>
            </div>
        );
    }
}

export default Main;