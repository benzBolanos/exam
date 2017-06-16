import React, {Component} from 'react';

var AddForm = React.createClass({

	handleCancel: function(e){
		e.preventDefault();
		this.props.onCancel();
	},
	
	handleAdd: function(e){
		e.preventDefault();
		var fname = document.getElementById('txt_fname').value;
		var lname = document.getElementById('txt_lname').value;
		var contact = document.getElementById('txt_contact').value;

		var data ={
			first_name: fname,
			last_name: lname,
			contact_number: contact
		}

		this.props.onAdd(data);
	},

	render: function(){
		return (
			<form id="form-content-add">
				<label htmlFor="txt_fname">First Name: </label>
				<input type='text' name='txt_fname' id='txt_fname'/>
				<br/>
				<label htmlFor="txt_lname">Last Name: </label>
				<input type='text' name='txt_lname' id='txt_lname'/>
				<br/>
				<label htmlFor="txt_contact">Contact #: </label>
				<input type='text' name='txt_contact' id='txt_contact'/>
				<br/>
				<button className="button form-button " onClick={this.handleAdd} id="btn_save">Save</button>
				<button className="button danger form-button " onClick={this.handleCancel} id="btn_cancel">Cancel</button>
			</form>
		)
	}
});

module.exports = AddForm;