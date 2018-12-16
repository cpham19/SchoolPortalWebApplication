const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan')

// Express configuration
const app = express(),
    server = require('http').Server(app)

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())

// Database
const db = require('./db')

// Routes
require('./routes')(app)

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8081;

server.listen(port)