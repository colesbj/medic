var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var google = require("googleapis");


// Used for Google Calendar

var app = express();

//configuring Serial Communication is in bin/www and in serial.js

// connecting to the Database 
var mongoose = require('mongoose');
mongoose.connect("mongodb://Medic:1234@ds039145.mongolab.com:39145/medsdb",function(err){
    if(err) console.log(err); 
});


// Load Express Configuration

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));

// used for trouble shooting 
app.use(logger('dev')); 

// used for reading in request and responses objects 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Tells Express to consider the 'public' folder as the root folder for the website
app.use(express.static('public'));

// Load Api route handler
var apiRoutes = require('./routes.js');
app.use('/',apiRoutes); // the url path and then the file that handles these routes

// Load and Connect to Error Handling
var errorHandler = require('./errors.js')(app); 

module.exports = app;
