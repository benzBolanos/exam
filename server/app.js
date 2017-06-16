'use strict';

var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');

var fetchFiles     = require('./helpers/fetch-files');

var route = require('./routes');
var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/person');


app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cors());

fetchFiles(__dirname + '/routes/', function(name){
     app.use('/', route[name]); 
}) 


app.listen(8080);