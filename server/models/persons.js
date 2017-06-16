'use strict';
var mongoose = require('mongoose');

var personSchema = mongoose.Schema({
	first_name: {type:String},
	last_name: {type:String},
	contact_number: {type:String}
});

var Person = mongoose.model('Person',personSchema);
module.exports = Person;