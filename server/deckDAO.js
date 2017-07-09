var uuid = require('uuid/v4');
var deckArray = require('./deck');
var deckStore = {};

function getNewDeck(callback){
    var id = getnewGUID();
    var newDeck = {};
    newDeck.name = id;
    newDeck.deck = deckArray.slice(0);
    deckStore[id] = newDeck.deck;
    callback(newDeck);
}

function getAllDecks(callback){
    var deckNames = [];
    for(var key in deckStore){
        if(deckStore[key])
            deckNames.push(key);
    }
    callback(deckNames);
}

function getNamedDeck(name, callback){
    var deck = {};
    deck.name = name;
    deck.deck = deckStore[name];
    callback(deck);
}

function setNamedDeck(name, newdeck, callback){
    deckStore[name] = newdeck;
    var deck = {};
    deck.name = name;
    deck.deck = newdeck;
    callback(deck);
}

function deleteNamedDeck(name, callback){
    delete deckStore[name];
    var deck = {};
    deck.name = name;
    callback(deck);
}

function getnewGUID(){
    var id = uuid();
    if(deckStore[id])
        getnewGUID();
    else
        return id;
}

function deckDAO(){

}

deckDAO.prototype.getNewDeck = getNewDeck;

deckDAO.prototype.getAllDecks = getAllDecks;

deckDAO.prototype.getNamedDeck = getNamedDeck;

deckDAO.prototype.setNamedDeck = setNamedDeck;

deckDAO.prototype.deleteNamedDeck = deleteNamedDeck;

module.exports = new deckDAO();

