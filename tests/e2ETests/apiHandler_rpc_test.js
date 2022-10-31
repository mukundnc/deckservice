var should = require('should');
var deck = require('./../../server/deck');
var request = require('request');
var config = require("./../../config");

describe('Test suite to run all test cases on apiHandler', function(){
        
    var addedDeck = {}
    var URL = `http://localhost:${config.PORT}/`

    beforeEach(function(done){
        done();
    });

    it('1. Create new deck unit test case', function(done){
        request({ url: URL+'decks', method: 'POST', json: {}}, function(error, request, response){     
            should.not.exist(error, "response should exist");
            should.exist(response, "response should exist");
            should.exist(response.name, "response should have name");
            should.exist(response.deck, "response should have deck");
            should.equal(response.deck.length, 52, "deck array length should be 52");
            should.equal(response.deck[0], deck[0], "deck first element should match predefined value");
            should.equal(response.deck[1], deck[1], "deck second element should match predefined value");
            should.equal(response.deck[2], deck[2], "deck third element should match predefined value");
            should.equal(response.deck[3], deck[3], "deck forth element should match predefined value");
            should.equal(response.deck[4], deck[4], "deck five element should match predefined value");
            addedDeck = JSON.parse(JSON.stringify(response));
            done();
        });
    });

    it('2. Shuffle deck using Complex algo unit test case', function(done){
         request({ url: URL+'decks', method: 'PUT', json: { name: addedDeck.name }}, function(error, request, response){     
            should.not.exist(error, "response should exist");
            should.exist(response, "response should exist");
            should.exist(response.name, "response should have name");
            should.equal(response.name, addedDeck.name, "names should match after shuffle");
            should.exist(response.deck, "response should have deck");
            should.equal(response.deck.length, 52, "deck array length should be 52");
            var flag = true;
            flag = flag && (response.deck[0] === addedDeck.deck[0])
            flag = flag && (response.deck[1] === addedDeck.deck[1])
            flag = flag && (response.deck[2] === addedDeck.deck[2])
            flag = flag && (response.deck[3] === addedDeck.deck[3])
            flag = flag && (response.deck[4] === addedDeck.deck[4])
            flag = flag && (response.deck[10] === addedDeck.deck[10])
            flag = flag && (response.deck[11] === addedDeck.deck[11])
            flag = flag && (response.deck[12] === addedDeck.deck[12])
            flag = flag && (response.deck[13] === addedDeck.deck[13])
            flag = flag && (response.deck[14] === addedDeck.deck[14])
            should.equal(flag, false, "checking for random ten elements there should be atleast one out of sequence");
            addedDeck = JSON.parse(JSON.stringify(response));
            done();
        });
    });

    it('3. Get named deck unit test case', function(done){
        request({ url: URL+'decks'+'/'+addedDeck.name, method: 'GET', json: {}}, function(error, request, response){     
            should.exist(response, "response should exist");
            should.exist(response.name, "response should have name");
            should.equal(response.name, addedDeck.name, "names should match with existing deck");
            should.exist(response.deck, "response should have deck");
            should.equal(response.deck.length, 52, "deck array length should be 52");
            should.equal(response.deck[0], addedDeck.deck[0], "deck first element should match existing value");
            should.equal(response.deck[1], addedDeck.deck[1], "deck second element should match existing value");
            should.equal(response.deck[2], addedDeck.deck[2], "deck third element should match existing value");
            should.equal(response.deck[3], addedDeck.deck[3], "deck forth element should match existing value");
            should.equal(response.deck[4], addedDeck.deck[4], "deck five element should match existing value");
            done();
        });
    });

    it('4. Get all unit test case', function(done){
        request({ url: URL+'decks', method: 'GET', json: {}}, function(error, request, response){                 
            should.exist(response, "response should exist");
            var lengthFlag = response.length > 0;
            should.equal(lengthFlag, true, "persisted decks length should be greater than zero");
            var existsFlag = response.indexOf(addedDeck.name) > -1;
            should.equal(existsFlag, true, "name should exist");
            done();
        });
    });

    it('5. Delete existing deck unit test case', function(done){
        request({ url: URL+'decks'+'/'+addedDeck.name, method: 'DELETE', json: {}}, function(error, request, response){                 
            should.exist(response, "response should exist");
            should.exist(response.name, "response should have name");
            should.exist(response.name, addedDeck.name, "names should match");     
            should.not.exist(response.deck, "deck should not exist");
            done();
        });
    });

    it('6. Shuffle deck negative unit test case', function(done){
        request({ url: URL+'decks', method: 'PUT', json: { name: addedDeck.name }}, function(error, request, response){     
            should.exist(response, "response should exist");
            should.exist(response.name, "response should have name");        
            should.exist(response.name, addedDeck.name, "names should match");        
            should.not.exist(response.deck, "deck should not exist");
            done();
        });
    });

    it('7. get named deck negative unit test case', function(done){
        request({ url: URL+'decks'+'/'+addedDeck.name, method: 'GET', json: {}}, function(error, request, response){     
            should.exist(response, "response should exist");
            should.exist(response.name, "response should have name");        
            should.exist(response.name, addedDeck.name, "names should match");        
            should.not.exist(response.deck, "deck should not exist");
            done();
        });
    });

    it('8. Get all deck negative test case', function(done){
        request({ url: URL+'decks', method: 'GET', json: {}}, function(error, request, response){                 
            should.exist(response, "response should exist");
            var lengthFlag = response.length >= 0;
            should.equal(lengthFlag, true, "persisted decks length should be greater than zero");
            var existsFlag = response.indexOf(addedDeck.name) > -1;
            should.equal(existsFlag, false, "name should not exist");
            done();
        });
    });

    it('9. Delete existing deck negative test case', function(done){
        request({ url: URL+'decks'+'/'+addedDeck.name, method: 'DELETE', json: {}}, function(error, request, response){                 
            should.exist(response, "response should exist");
            should.exist(response.name, "response should have name");
            should.exist(response.name, addedDeck.name, "names should match");     
            should.not.exist(response.deck, "deck should not exist");
            done();
        });
    });

    after(function(done){        
        addedDeck = null;
        done();
    })
})