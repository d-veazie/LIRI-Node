// required requires lol

require("dotenv").config();

let axios = require('axios');
let moment = require('moment');
let fs = require('fs');
let keys = require('./keys');
let Spotify = require('node-spotify-api');
let spotify = new Spotify(keys.spotify); 
// getmybands is getbands, getmespotify is getspotify, getmymovie is getmovie
// command line 
let comOne = process.argv[2];
let comTwo = process.argv.slice(3).join(' ');

let run = function(inputOne, inputTwo) {
    mainCom(inputOne, inputTwo);
}

run(process.argv[2], process.argv.slice(3).join('' ));

//switch case 
let mainCom = function(inputData, functionData) {
    switch (inputData) {
        case 'spotify-this-song':
            getSpotify(functionData);
            break;
        
        case 'concert-this':
            getBands(functionData);
            break;

        case 'movie-this':
            getMovie(functionData);
            break;

        case 'do-what-it-says':
            doIt(functionData);
            break;

        default:
            console.log('hmmm, Liri does not know that');
            
    }
}
  
let doIt = function() {
    fs.readFile('random.txt', 'utf8', function(error, data){
        console.log(data);
        let datArr = data.split(','); 
        if (datArr.length === 2) {
            mainCom(datArr[0], datArr[1]);
        } 
        else if (datArr.length === 1) {
            mainCom(datArr[0]); 
        }


    });
}