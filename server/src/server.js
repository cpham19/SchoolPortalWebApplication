const express = require('express'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    morgan = require('morgan'),
	path = require('path')

// Express configuration
const app = express(),
    server = require('http').Server(app)

app.use(morgan('combined'))
app.use(bodyParser.json())
app.use(cors())
app.use(express.static(path.join(__dirname, '../../client/dist')))

// Database
require('./db')

// Passport
require('./passport')

// Routes
require('./routes')(app)

// set the port of our application
// process.env.PORT lets the port be set by Heroku
const port = process.env.PORT || 8081;

server.listen(port)