require('dotenv').config();
const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    // , cors = require('cors')
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
// app.use(cors());


massive(CONNECTION_STRING).then(db => {
    app.set('db', db)
})




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
    // done(null, id);
    app.get("db").find_session_user([primaryKeyID]).then(user => {
        done(null, user[0])
        // after done user[0] goes to req.user
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

// Retrieve Decks by user_id
app.get('/decks/user/:id', (req, res) => {
    const db = req.app.get('db');
    const { params } = req;
    db.getDecksByUser([params.id])
        .then(decks => res.status(200).send(decks))
        .catch(() => res.status(500).send());
})







app.listen(SERVER_PORT, () => {
    console.log(`Listening on port: `, SERVER_PORT)
})