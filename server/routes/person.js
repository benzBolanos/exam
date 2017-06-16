var Router = require('express').Router();
var Person = require('../models/persons');

Router
	.get('/person',function(req,res){
		var personList = Person.find({}).exec();
		personList
			.then(function(data){
				console.log(data);
				res.json({data:data});
			})
	})

	.post('/person',function(req,res){
		var newPerson = {
			first_name: req.body.first_name,
			last_name: req.body.last_name,
			contact_number: req.body.contact_number
		}

		var person = new Person(newPerson);
		person.save(function(err,data){
			if(err)
				res.json({message:'Something Went Wrong',success:false});

			console.log(data);
			res.json({message:'Successfully added a person!',success:true,data:data})
		})
	})

	.put('/person/:id',function(req,res){
		var personList = Person.find({_id:req.params.id}).exec();
		personList.then(function(data){
			data[0].first_name = req.body.first_name;
			data[0].last_name = req.body.last_name;
			data[0].contact_number = req.body.contact_number;

			data[0].save(function(err,data){
				if(err){
					console.log(err)
					res.json({message:'Something went wrong!',success:false})
				} else {
					res.json({message:'Successfully modified!',success:true,data:data})
				}
			})
			console.log(req.body)
			console.log('-------------------------------------test')
			console.log('test update',data);
		})
	})

	.delete('/person/:id',function(req,res){
		var personList = Person.findByIdAndRemove(req.params.id).exec();

		personList.then(function(data){
			console.log(data)
		})
	})

module.exports = Router;