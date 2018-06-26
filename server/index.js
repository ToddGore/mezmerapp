require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive');


const {
    SERVER_PORT,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
    CONNECTION_STRING
} = process.env;

const app = express();

app.use(bodyParser.json());

massive(CONNECTION_STRING).then(db => { app.set('db', db) })

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize());
app.use(passport.session());
passport.use(
    new Auth0Strategy(
        {
            domain: DOMAIN,
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: CALLBACK_URL,
            scope: "openid profile"
        },
        (accessToken, refreshToken, extraParams, profile, done) => {
            const db = app.get("db");
            let { id, displayName, picture } = profile;
            db.find_user([id]).then(user => {
                if (user[0]) {
                    done(null, user[0].id);
                } else {
                    db.create_user([displayName, picture, id]).then((createdUser) => {
                        done(null, createdUser[0].id)
                    })
                }
            });
        }
    )
);

passport.serializeUser((primaryKeyID, done) => {
    done(null, primaryKeyID);
})
passport.deserializeUser((primaryKeyID, done) => {
    app.get("db").find_session_user([primaryKeyID]).then(user => {
        done(null, user[0])
    })
})

app.get('/auth/logout', (req, res) => {
    req.logOut();
    // req.session.destroy does not clear out the user
    res.redirect('http://localhost:3000')
})

app.get('/auth', passport.authenticate('auth0'));

app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: 'http://localhost:3000/#/dashboard/deckarea'
}))


app.get('/auth/user', (req, res) => {
    if (req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send('Nice Try')
    }
})

// Get Decks by user_id
app.get('/decks/user/:id', (req, res) => {
    const db = req.app.get('db');
    const { params } = req;
    db.getDecksByUser([params.id])
        .then(decks => res.status(200).send(decks))
        .catch(() => res.status(500).send());
})

// Retrieve Cards by deck_id
app.get('/cards/deck/:id', (req, res) => {
    const db = req.app.get('db');
    const { params } = req;
    db.getCardsByDeck([params.id])
        .then(cards => res.status(200).send(cards))
        .catch(() => res.status(500).send());
})

// Create Deck
app.post('/cards/deck', (req, res) => {
    const deck = req.body;
    const db = req.app.get('db');
    db.createDeck(deck).then(result => {
        res.send(result);
    })
});

// Create a Card
app.post('/cards/deck/card', (req, res) => {
    const card = req.body;
    const db = req.app.get('db');
    db.createCard(card).then(result => {
        res.send(result);
    })
});

// Create a Response Entry
app.post('/cards/deck/response', (req, res) => {
    const response = req.body;
    const db = req.app.get('db');
    db.createResp(response).then(result => {
        res.send(result);
    })
});

// Update a Deck by deck_id 
app.put('/cards/deck/:id', (req, res) => {
    const db = req.app.get('db');
    db.deck.update({ id: req.params.id }, req.body)
        .then(deck => res.status(200).send(deck))
        .catch(() => res.status(500).send());
})

// Update a Card
app.put('/cards/card/:id', (req, res) => {
    const db = req.app.get('db');
    db.card.update({ id: req.params.id }, req.body)
        .then(card => res.status(200).send(card))
        .catch(() => res.status(500).send());
})

// Update a Response


// Delete a Deck
app.delete('/cards/deck/delete/:id', (req, res) => {
    console.log('server_del_deck ', req.params.id)
    const db = req.app.get('db');
    const { params } = req;
    db.delDeck([req.params.id])
        .then((decks) => res.status(200).send(decks))
        .catch(() => res.status(500).send());
})

// Delete a Card
app.delete('/cards/card/delete/:id', (req, res) => {
    console.log('server_del_card ', req.params.id)
    const db = req.app.get('db');
    const { params } = req;
    db.delCard([req.params.id])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
    // db.card.destroy({ id: req.params.id }, function (err, res) {
    //Array containing the destroyed record is returned
    // });
})

// Delete a Response
app.delete('/cards/deck/response/:id', (req, res) => {
    console.log('server_del_response ', req.params.id)
    const db = req.app.get('db');
    const { params } = req;
    db.delResp([req.params.id])
        .then(() => res.status(200).send())
        .catch(() => res.status(500).send());
});


app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: `, SERVER_PORT)
})