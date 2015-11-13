/* CS290: GET and POST checker
 * Name: Andrew M . Calhoun
 * Date: 11/10/2015
 * Description: A single page web app that displays data from GET
 * and POST requests.
 */


var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req, res){
	var parameters = [];
	for(var p in req.query)
	{
		parameters.push({name:p, value:req.query[p]})
	}
	
//	console.log(parameters);
//	console.log(req.body);
	var context = {};
	context.dataResponse = parameters;
	context.reqType = "GET";
	res.render('home', context);
});

app.post('/', function(req,res){
	var parameters = [];
	for(var p in req.body)
	{
		parameters.push({name:p, value:req.body[p]})
	}
	console.log(parameters);
	console.log(req.body);
	var context = {};
	context.dataResponse = parameters;
	context.reqType = "POST";
	res.render('home', context);

});

app.use(function(req, res) {
	res.status(404);
	res.render('404');
});


app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.type('plain/text');
	res.status(500);
	res.render('500');
});

app.listen(app.get('port'), function(){
	console.log('Program running on 52.27.116.225:' + app.get('port') + '; press Ctrl-C to terminate.');
});
