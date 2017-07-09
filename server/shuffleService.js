var config = require("./../config")

function Simple(inputArray){
    if(!inputArray)
        return;
    var currentIndex = inputArray.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = inputArray[currentIndex];
        inputArray[currentIndex] = inputArray[randomIndex];
        inputArray[randomIndex] = temporaryValue;
    }
    return inputArray;
}

function Complex(inputArray){
     if(!inputArray)
        return;
    var noofshuffles =  Math.floor(Math.random() * 10);
    for(var k=0; k<noofshuffles; k++){
        var randomSplit = (config.deckSize / 2) + Math.floor(Math.random() * 5 + Math.random() * -5) ;
        var tempArray1 = inputArray.splice(0, randomSplit);
        for(var i=tempArray1.length-1; i>=0;i--){        
            var randomlength = Math.floor( Math.random() * 3);
            for(var j=0; j<randomlength; j++){
                if(tempArray1.length > 0)
                    inputArray.splice(i+j, 0, tempArray1.splice(0,1)[0]);
                else
                    break; 
            }        
        }  
        inputArray = inputArray.concat(tempArray1); 
    } 
    return inputArray;
}

function shuffleService(){

}

shuffleService.prototype.Simple = Simple;

shuffleService.prototype.Complex = Complex;

module.exports = new shuffleService();
