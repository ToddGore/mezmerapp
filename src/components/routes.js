import React from 'react';
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
} from 'react-router-dom';

import DashBoard from '../components/dashboard/DashBoard'

import DashNav from '../components/dashnav/DashNav'
import DashHeader from '../components/dashheader/DashHeader'
import DashFooter from '../components/dashfooter/DashFooter'

import DeckArea from '../components/deckarea/DeckArea'
import PlayArea from '../components/playarea/PlayArea'
import CardEditor from '../components/cardeditor/CardEditor'



const routes = (
    <Route component={DashBoard}>
        <Route path="deck" components={
            { sidebar: DashNav, header: DashHeader, main: DeckArea, footer: DashFooter }} />
        <Route path="playarea" components={
            { sidebar: DashNav, header: DashHeader, main: PlayArea, footer: DashFooter }} />
        <Route path="cardeditor" components={
            { sidebar: DashNav, header: DashHeader, main: CardEditor, footer: DashFooter }} />

    </Route>
)