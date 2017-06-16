var React = require('react');
require('./css/personItem.css');

var PersonItem = React.createClass({
	handleDelete: function(){
		this.props.onDelete(this.props.item);
		// console.log(this.props.item)
	},
	handleEdit: function(e){
		e.preventDefault();
		this.props.onEdit(this.props.item);
	},
	render: function(){
		return (
			<li>
				<div className="person-col">
					<span className="col-name">
						{this.props.item.first_name} {this.props.item.last_name}
					</span>
					<span className="col-name">
						{this.props.item.contact_number}
					</span>
					<span onClick= {this.handleEdit} className="item-delete">
						Edit
					</span>
					<span className="item-delete" onClick = {this.handleDelete}>
						x
					</span>

				</div>
			</li>
		)
	}
})

module.exports = PersonItem;