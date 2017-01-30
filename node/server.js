var http = require('http');
var Mongo = require('mongodb').MongoClient;
var express = require('express');

var mongo_url = 'mongodb://localhost:27017/apcsp';

Mongo.connect(mongo_url, function(err, db) {
 if(err) {
   log('MongoDB connection error');
 } else {
   log('Connected to MongoDB');
 }
}); 

// web server
var app = express();

// use middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(allowCrossDomain);
app.use(authorize);

app.post('/login', function (req, res) {
 log('/login req.body = ', req.body);
 var query = { id : req.body.id };
 Mongo.ops.upsert('login', query, req.body);
 res.status(201).send('ok');
});

// listen on port 3000
app.listen(3000);

log('listening on port 3000');
