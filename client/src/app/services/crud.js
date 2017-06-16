'use strict';

var API_ENDPOINT = 'http://localhost:8080';

exports.get = function(url,cb){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var data = JSON.parse(xhr.responseText);
			cb(data);
		}
	}
	xhr.open("get",API_ENDPOINT+url,true);
	xhr.send();
}

exports.post = function(url,data,cb){
	var xhr = new XMLHttpRequest();
	xhr.open("post",API_ENDPOINT+url,true);

	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.onload = function(){
		var data = JSON.parse(this.responseText);
		cb(data);
	}

	xhr.send('first_name='+data.first_name+'&last_name='+data.last_name+'&contact_number='+data.contact_number);
}

exports.update = function(url,data,cb){
	var xhr = new XMLHttpRequest();
	xhr.open("put",API_ENDPOINT+url,true);

	xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
	xhr.onload = function(){
		var data = JSON.parse(this.responseText);
		cb(data);
	}

	xhr.send('first_name='+data.first_name+'&last_name='+data.last_name+'&contact_number='+data.contact_number);
}

exports.delete = function(url,cb){
	var xhr = new XMLHttpRequest();
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4 && xhr.status == 200){
			var data = JSON.parse(xhr.responseText);
			cb(data);
		}
	}
	xhr.open("delete",API_ENDPOINT+url,true);
	xhr.send();
}