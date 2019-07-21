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
            getFilm(functionData);
            break;

        case 'do-what-it-says':
            doIt(functionData);
            break;

        default:
            console.log('hmmm, Liri does not know that');
            
    }
}

// do-what-it-says
  
let doIt = function() {
    fs.readFile('random.txt', 'utf8', function(error, data){
        let datArr = data.split(','); 
        if (datArr.length === 2) {
            mainCom(datArr[0], datArr[1]);
        } 
        else if (datArr.length === 1) {
            mainCom(datArr[0]); 
        }


    });
}

// Spotify

let getArtist = function(artist) {
    return artist.name;
}

let getSpotify = function(trackName) {

    if (trackName === undefined) {
        trackName = 'The Sign, Ace of Base'
    }
    
    spotify.search(
        {
            type: 'track',
            query: trackName
        },

        function(err, data) {
            if (err) {
                console.log('error: ' + err);
                return;
            }

                let song = data.tracks.items;
            for (let i = 0; i < song.length; i++) {
                console.log(i);
                console.log('artist/band: ' + song[i].artists.map(getArtist)); // map object holds key value pairs and remembers the origional order of the keys
                console.log('album: ' + song[i].album.name);
                console.log('track title: ' + song[i].name);
                console.log('preview: ' + song[i].preview_url);
        
            }

        }
    )
};

// Concert info

let getBands = function(artist) {
    let queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
    axios.get(queryURL).then(
        function(response) {
            let json = response.data;
            if (!json.length) {
                console.log('looks like there are not any upcoming shows for ' + artist);
                return;
            }

            console.log('here are the upcoming shows for ' + artist);
            console.log('    --------------------     ')
            for (let i = 0; i < json.length; i++) {
                let info = json[i]; 
                console.log("Venue Name: " + info.venue.name);
                console.log("Location: " + info.venue.city + ", " +
                    info.venue.region + " " + info.venue.country);
                console.log("Date-Time: " + moment(info.datetime).format("MM/DD/YYYY-hh:mm"));
            }


        }
    )
}

// OMDB

let getFilm = function(filmName) {
    if (filmName === undefined) {
        filmName = 'Mr. Nobody'; 
    }

    let URL = "http://www.omdbapi.com/?t=" + filmName + "&y=&plot=full&tomatoes=true&apikey=trilogy";
    axios.get(URL).then(
        function(response) {
            let json = response.data;
            console.log("Title: " + json.Title);
            console.log("Year: " + json.Year);
            console.log("Rated: " + json.Rated);
            console.log("IMDB Rating: " + json.imdbRating);
            console.log("Rotten Tomatoes Rating: " + json.Ratings[1].Value);
            console.log("Country: " + json.Country);
            console.log("Language: " + json.Language);
            console.log("Plot: " + json.Plot);
            console.log("Actors: " + json.Actors);
      
        }
    )

}

// the magic password

let run = function(inputOne, inputTwo) {
    mainCom(inputOne, inputTwo);
}
run(process.argv[2], process.argv.slice(3).join('' ));