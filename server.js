var express = require('express');
var bodyParser = require('body-parser')
var app = new express();
var config = require('./config');
var apiHandler = require('./server/apiHandler');

app.set('port', config.PORT || 8000);

app.use(function(req, res, next) {
    res.setHeader("content-type", "application/json");
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, Authorization, Content-Type, X-Requested-With");
    res.setHeader('Access-Control-Allow-Origin', '*');
     console.log('%s - %s', req.method, req.url);
    next();
});

app.use(bodyParser.urlencoded({ extended: false }));
 
app.use(bodyParser.json());

app.post('/decks', apiHandler.createNewDeck);

app.put('/decks', apiHandler.shuffleDeck);

app.get('/decks', apiHandler.getAllDecks);

app.get('/decks/:name', apiHandler.getNamedDeck);

app.delete('/decks/:name', apiHandler.deleteNamedDeck);

app.listen(app.get('port'), function() {
    console.log('Milk admin service listening on port ' + app.get('port'));
});