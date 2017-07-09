var deckDAO = require('./deckDAO');
var shuffleService = require("./shuffleService");
var config = require("./../config");

function createNewDeck(req, res){
    deckDAO.getNewDeck(function(newDeck){
        res.json(newDeck);
    });
}

function shuffleDeck(req, res){
    var payload = req.body;
    if(shuffleService[config.useAlgo]){
        deckDAO.getNamedDeck(payload.name, function(getdeck){
            var shuffledDeck = shuffleService[config.useAlgo](getdeck.deck);
            deckDAO.setNamedDeck(payload.name, shuffledDeck, function(deck){
                res.json(deck);
            });
        });        
    } else{
        res.json({error:"Invalid shuffle algo"});
    }    
}

function getAllDecks(req, res){
    deckDAO.getAllDecks(function(decknames){
        res.json(decknames);
    });
}

function getNamedDeck(req, res){
    var name = req.params.name;
    deckDAO.getNamedDeck(name, function(deck){
        res.json(deck);
    });
}

function deleteNamedDeck(req, res){
    var name = req.params.name;
    deckDAO.deleteNamedDeck(name, function(deck){
        res.json(deck);
    });
}

function apiHandler(){

}

apiHandler.prototype.createNewDeck = createNewDeck;

apiHandler.prototype.shuffleDeck = shuffleDeck;

apiHandler.prototype.getAllDecks = getAllDecks;

apiHandler.prototype.getNamedDeck = getNamedDeck;

apiHandler.prototype.deleteNamedDeck = deleteNamedDeck;

module.exports = new apiHandler();