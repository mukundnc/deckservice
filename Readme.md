# Prerequisites before running the application

To run the application make sure have installed nodejs and npm.
You also need to install mocha and istanbul globally for running the unit test cases and coverage.
```
npm install mocha -g
npm install istanbul -g
```
You need to set shuffle alogrithm in config.js it takes currently "Simple" and "Complex" as value.
```
module.exports.useAlgo = "Simple"; 
```
You can also set port on which you want the application to run here.
```
module.exports.PORT = 8000; 
```
Now we are set to run the application.

## To run the application use the below commands sequentially
```
npm install

npm start
```
application is not hosted on port 8000 and the URL is http://localhost:8000 <br />
for creating you need to post on http://localhost:8000/decks <br />
for update existing deck you need to put on http://localhost:8000/decks <br />
for getting the list of named decks you need to get on  http://localhost:8000/decks <br />
for getting a named deck you need to get on  http://localhost:8000/decks/<name> <br />
for deleteing a named dek you need to delete on  http://localhost:8000/decks/<name> <br />
## To run unit tests use the below command
```
npm test
```
## To run rpc tests use the below command but make sure you have application already running.
```
npm run rpctest
```
