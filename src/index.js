const express = require('express')
var cors = require('cors')
const fs = require('fs');
var path = require('path');

const app = express()
app.use(cors())

var express_session = require("express-session");
const passport = require('passport');
const { Client } = require('pg');
const bodyParser = require('body-parser')
require('./passport')
const redis = require('redis');
require('dotenv').config();




const redisStore = require('connect-redis')(express_session);
const stripe = require('stripe')(process.env.stripe);


const redisClient = redis.createClient({
    host: process.env.redisclienthost,
    port: process.env.redisclientport,
    password: process.env.rediesclientpassword,

});

app.use(express_session({
    secret: 'Jacob iz hawt',
    name: 'Sessionssss',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // Note that the cookie-parser module is no longer needed
    store: new redisStore({ host: process.env.redisclienthost, port: process.env.redisclientport, password: process.env.rediesclientpassword, client: redisClient, ttl: 86400 }),
}, ), );

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());

const isLoggedIn = require('./middleware/auth')
const isBounty = require('./middleware/bounty')

const port = 8080


async function start() {
    console.log("ENVIRONMENT", process.env)
    console.log("DATABASE", process.env.database)

    const client = new Client({
        user: process.env.user,
        host: process.env.host,
        database: process.env.database,
        password: process.env.password,
        port: process.env.postgresport, //5432
        ssl: process.env.database == "postgres" ? false : {

            ca: fs.readFileSync(path.join(__dirname, './ca-certificate.crt')).toString(),
        }
    });


    await client.connect()

    require('./debug')(app, isLoggedIn);
    require('./auth')(app);

    //MIGRATIONS
    require('./migrations')(app, client);


    app.get("/issue/:org/:repo/issues/:issue_id", (req, res) => {
        try {
            let query = `SELECT * FROM bounties WHERE issue IN ('hasura/graphql-engine/issues/6337');`;
            client.query(query, (err, resp) => {
                res.send(resp.rows);
                client.end();
            });
        } catch (error) {
            res.status(420).send("there was an error getting this");
        }
    });


    app.post("/post/bounty", isBounty, async(req, res) => {
        try {
            let query = `INSERT INTO bounties (issue, bounty_amount, github) Values ('${req.body.issue}', '${req.body.bounty_amount}', '${req.body.github}');`;
            client.query(query, (err, resp) => {
                console.log(err, resp);
                res.send(resp);
                client.end();
            });
        } catch (error) {
            res.status(420).send("there was an error inserting this");
        }

        // console.log(req.body)
        // res.send(req.body.issue)
    });


    const YOUR_DOMAIN = 'http://localhost:3000';
    app.post('/create/bounty', async(req, res) => {
        let amount = req.body.amount;
        let issue_id = req.body.issue_id;
        if ( /*typeof amount === "number" && issue_id != null*/ true) {
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: 'Sponsor Issue ' + issue_id,
                            //images: ['https://i.imgur.com/EHyR2nP.png'],
                        },
                        unit_amount: amount,
                    },
                    quantity: 1,
                }, ],
                mode: 'payment',
                success_url: `${YOUR_DOMAIN}/success.html`,
                cancel_url: `${YOUR_DOMAIN}/cancel.html`,
            });
            res.json({ id: session.id });
        } else {
            res.status(420).json({ "message": "Bruh get your request together my manz🌿" })
        }
    });


    app.post('/webhook', bodyParser.raw({ type: 'application/json' }), (request, response) => {
        const payload = request.body;

        console.log("Got payload: " + payload);

        response.status(200);
    });


    app.listen(port, () => {
        console.log(`Git.bid API listening at http://localhost:${port}`)
    })
}

start()