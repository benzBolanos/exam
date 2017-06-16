//------- import react -------
import React, {Component} from 'react';
var ReactDOM = require('react-dom');

//------ Crud function ----------
var CRUD = require('./services/crud');

//------- Lists Items --------------
var PersonItem = require('./personItem');

//-------- include css ------------
require('./css/style.css');

class BodyWrapper extends Component {
	constructor(props,context){
		super(props,context);
		this.state = {
			persons: [{
				_id: '',
				first_name: '',
				last_name: '',
				contact_number:'',
			}],
			id_update: '',
			editForm: false
		};

		this.onDelete = this.onDelete.bind(this);
		this.onAdd = this.onAdd.bind(this);
		this.showAddForm = this.showAddForm.bind(this);
		this.cancel = this.cancel.bind(this);
		this.cancel_edit = this.cancel_edit.bind(this);
		this.onEdit = this.onEdit.bind(this);
		this.updateData = this.updateData.bind(this)
	}

	onEdit(item){
		this.setState({
			editForm: true
		})
		
		this.refs.first_name.value = item.first_name;
		this.refs.last_name.value = item.last_name;
		this.refs.contact_number.value= item.contact_number;

		this.setState({
			id_update: item._id
		})
	}

	updateData(e){
		e.preventDefault();
		var cur = this;
		var putData = {
			first_name: this.refs.first_name.value,
			last_name: this.refs.last_name.value,
			contact_number: this.refs.contact_number.value
		};
		CRUD.update('/person/'+this.state.id_update,putData,function(data){
			if(data.success){
				cur.refs.first_name.value = "";
				cur.refs.last_name.value = "";
				cur.refs.contact_number.value = "";
				CRUD.get('/person',function(data){
					cur.setState({
						persons: data.data,
						editForm: false
					})
				})
			}
		})
	}

	onDelete(item){
		var updatedPersons = this.state.persons.filter(function(val,i){
			return item !== val;
		});
		this.setState({
			persons: updatedPersons
		});

		CRUD.delete('/person/'+item._id,null)
	}

	showAddForm(e){
		e.preventDefault();
		var formAddElem = document.getElementById('form-content-add');
		formAddElem.style.display = 'block';
	}

	onAdd(e){
		e.preventDefault();
		var cur = this;

		var fname = document.getElementById('txt_fname').value;
		var lname = document.getElementById('txt_lname').value;
		var contact = document.getElementById('txt_contact').value;

		var postData = {
			first_name: fname,
			last_name: lname,
			contact_number: contact
		}

		CRUD.post('/person',postData,function(data){
			var updatePersons = cur.state.persons;
			updatePersons.unshift(data.data)

			cur.setState({
				persons: updatePersons
			})

			document.getElementById('txt_fname').value="";
			document.getElementById('txt_lname').value="";
			document.getElementById('txt_contact').value="";
		})
	}

	cancel(e){
		e.preventDefault();
		var formAddElem = document.getElementById('form-content-add');
		formAddElem.style.display = 'none';
	}

	cancel_edit(e){
		e.preventDefault();
		console.log(this)
		this.setState({
			editForm: false
		})
	}

	componentDidMount(){
		var cur = this;
		var formAddElem = document.getElementById('form-content-add');
		formAddElem.style.display = 'none';

		CRUD.get('/person',function(data){
			cur.setState({
				persons: data.data
			})
		})
	}

	render(){
		var persons = this.state.persons;
		persons = persons.map(function(val,i){
			return (
				<PersonItem item={val} onDelete={this.onDelete} onEdit={this.onEdit}/>
			);
		}.bind(this));

		var test = this.state.editForm ? 'block' : 'none';

		return (
			<div id="person-list">
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
					<button className="button form-button " onClick={this.onAdd} id="btn_save">Save</button>
					<button className="button danger form-button " onClick={this.cancel} id="btn_cancel">Cancel</button>
				</form>
				<form ref="form_edit" style={{display:'none'}} id="form-content-edit">
					<label htmlFor="txt_fname_edit">First Name: </label>
					<input type='text' name='txt_fname_edit' id='txt_fname_edit' ref="first_name"/>
					<br/>
					<label htmlFor="txt_lname_edit">Last Name: </label>
					<input type='text' name='txt_lname_edit' id='txt_lname_edit' ref="last_name"/>
					<br/>
					<label htmlFor="txt_contact_edit">Contact #: </label>
					<input type='text' name='txt_contact_edit' id='txt_contact_edit' ref="contact_number"/>
					<br/>
					<br/>
					<button className="button form-button " onClick={this.updateData} >Save</button>
					<button className="button danger form-button " onClick={this.cancel_edit}>Cancel</button>
				</form>
				
				<p>Contact List <span className="button btnAdd"><button onClick={this.showAddForm}>Add</button></span></p>
				<ul>{persons}</ul>
			</div>
		);
	}
}

ReactDOM.render(<BodyWrapper/>,document.getElementById('content'));