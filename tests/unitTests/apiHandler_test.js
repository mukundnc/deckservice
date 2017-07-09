var should = require('should');
var deck = require('./../../server/deck');
var apiHandler = require('./../../server/apiHandler');
var config = require("./../../config");

describe('Test suite to run all test cases on apiHandler', function(){
        
    var request = {}
    var response = {
        res: "",
        json: function(resp){
            this.res = resp;
        }
    };
    var addedDeck = {}

    beforeEach(function(done){
        request = {};
        response.res = "";
        done();
    });


    it('1. Create new deck unit test case', function(done){
        apiHandler.createNewDeck(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.exist(response.res.name, "response should have name");
        should.exist(response.res.deck, "response should have deck");
        should.equal(response.res.deck.length, 52, "deck array length should be 52");
        should.equal(response.res.deck[0], deck[0], "deck first element should match predefined value");
        should.equal(response.res.deck[1], deck[1], "deck second element should match predefined value");
        should.equal(response.res.deck[2], deck[2], "deck third element should match predefined value");
        should.equal(response.res.deck[3], deck[3], "deck forth element should match predefined value");
        should.equal(response.res.deck[4], deck[4], "deck five element should match predefined value");
        addedDeck = JSON.parse(JSON.stringify(response.res));
        done();
    });

    it('2. Shuffle deck using Complex algo unit test case', function(done){
        config.useAlgo = "Complex";
        request.body = {name: addedDeck.name};
        apiHandler.shuffleDeck(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.exist(response.res.name, "response should have name");
        should.equal(response.res.name, addedDeck.name, "names should match after shuffle");
        should.exist(response.res.deck, "response should have deck");
        should.equal(response.res.deck.length, 52, "deck array length should be 52");
        var flag = true;
        flag = flag && (response.res.deck[0] === addedDeck.deck[0])
        flag = flag && (response.res.deck[1] === addedDeck.deck[1])
        flag = flag && (response.res.deck[2] === addedDeck.deck[2])
        flag = flag && (response.res.deck[3] === addedDeck.deck[3])
        flag = flag && (response.res.deck[4] === addedDeck.deck[4])
        flag = flag && (response.res.deck[10] === addedDeck.deck[10])
        flag = flag && (response.res.deck[11] === addedDeck.deck[11])
        flag = flag && (response.res.deck[12] === addedDeck.deck[12])
        flag = flag && (response.res.deck[13] === addedDeck.deck[13])
        flag = flag && (response.res.deck[14] === addedDeck.deck[14])
        should.equal(flag, false, "checking for random ten elements there should be atleast one out of sequence");
        addedDeck = JSON.parse(JSON.stringify(response.res));
        done();
    });

    it('3. Shuffle deck using Simple algo unit test case', function(done){
        config.useAlgo = "Simple";
        request.body = {name: addedDeck.name};
        apiHandler.shuffleDeck(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.exist(response.res.name, "response should have name");
        should.equal(response.res.name, addedDeck.name, "names should match after shuffle");
        should.exist(response.res.deck, "response should have deck");
        should.equal(response.res.deck.length, 52, "deck array length should be 52");
        var flag = true;
        flag = flag && (response.res.deck[0] === addedDeck.deck[0])
        flag = flag && (response.res.deck[1] === addedDeck.deck[1])
        flag = flag && (response.res.deck[2] === addedDeck.deck[2])
        flag = flag && (response.res.deck[3] === addedDeck.deck[3])
        flag = flag && (response.res.deck[4] === addedDeck.deck[4])
        flag = flag && (response.res.deck[10] === addedDeck.deck[10])
        flag = flag && (response.res.deck[11] === addedDeck.deck[11])
        flag = flag && (response.res.deck[12] === addedDeck.deck[12])
        flag = flag && (response.res.deck[13] === addedDeck.deck[13])
        flag = flag && (response.res.deck[14] === addedDeck.deck[14])
        should.equal(flag, false, "checking for random ten elements there should be atleast one out of sequence");
        addedDeck = JSON.parse(JSON.stringify(response.res));
        done();
    });

    it('4. Get named deck unit test case', function(done){
        request.params = {name: addedDeck.name};
        apiHandler.getNamedDeck(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.exist(response.res.name, "response should have name");
        should.equal(response.res.name, addedDeck.name, "names should match with existing deck");
        should.exist(response.res.deck, "response should have deck");
        should.equal(response.res.deck.length, 52, "deck array length should be 52");
        should.equal(response.res.deck[0], addedDeck.deck[0], "deck first element should match existing value");
        should.equal(response.res.deck[1], addedDeck.deck[1], "deck second element should match existing value");
        should.equal(response.res.deck[2], addedDeck.deck[2], "deck third element should match existing value");
        should.equal(response.res.deck[3], addedDeck.deck[3], "deck forth element should match existing value");
        should.equal(response.res.deck[4], addedDeck.deck[4], "deck five element should match existing value");
        done();
    });

    it('5. Get all unit test case', function(done){
        apiHandler.getAllDecks(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.equal(response.res.length, 1, "persisted decks length should match");
        should.equal(response.res[0], addedDeck.name, "names should match");
        done();
    });

    it('6. Delete existing deck unit test case', function(done){
        request.params = {name: addedDeck.name};
        apiHandler.deleteNamedDeck(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.exist(response.res.name, "response should have name");
        should.exist(response.res.name, addedDeck.name, "names should match");     
        should.not.exist(response.res.deck, "deck should not exist");
        done();
    });

    it('7. Shuffle deck negative unit test case', function(done){
        request.body = {name: addedDeck.name};
        apiHandler.shuffleDeck(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.exist(response.res.name, "response should have name");        
        should.exist(response.res.name, addedDeck.name, "names should match");        
        should.not.exist(response.res.deck, "deck should not exist");
        done();
    });

    it('8. get named deck negative unit test case', function(done){
        request.params = {name: addedDeck.name};
        apiHandler.getNamedDeck(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.exist(response.res.name, "response should have name");        
        should.exist(response.res.name, addedDeck.name, "names should match");        
        should.not.exist(response.res.deck, "deck should not exist");
        done();
    });

    it('9. Get all deck negative test case', function(done){
        apiHandler.getAllDecks(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.equal(response.res.length, 0, "persisted decks length should match");
        done();
    });

    it('10. Delete existing deck negative test case', function(done){
        request.params = {name: addedDeck.name};
        apiHandler.deleteNamedDeck(request, response);
        should.exist(response, "response should exist");
        should.exist(response.res, "response should have res");
        should.exist(response.res.name, "response should have name");
        should.exist(response.res.name, addedDeck.name, "names should match");     
        should.not.exist(response.res.deck, "deck should not exist");
        done();
    });

    after(function(done){
        request = null;
        response = null;
        addedDeck = null;
        done();
    })
})