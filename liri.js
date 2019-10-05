// require .env file - gitignored
require("dotenv").config();

// require Axios
let axios = require("axios");

// require Moment - for dates and time
let moment = require("moment");

// require File Systems
let fs = require("fs");

//  this link the keys.js file to this file
let keys = require("./keys.js");

// Initialize Spotify
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

// OMDB and Bands In Town APIs - from keys.js - provided
// let omdb = require(keys.omdb);
// let bandsintown = require(keys.bandsintown);

// taki in arguments
let userPath = process.argv[2];
let userSearch = process.argv.slice(3).join(" ");

function concertThis() {
    let URL = "https://rest.bandsintown.com/artists/" + userSearch + "/events?app_id=codingbootcamp";
        // console.log(URL);

    axios.get(URL).then(function(response) {
        // console.log(response)
        let concertData = response.data;
        // loop through the info and grab only what needs to be displayed
        for (let i = 0; i < concertData.length; i++) {
            let concert = concertData[i];
                console.log("The concert is in " + concert.venue.region + ", " + concert.venue.country + " at " + concert.venue.name + moment(concert.datetime).format(" MM/DD/YYYY"));
        }
        // console.log(concertData)
    });
};

function movieThis() {
    let URL = 
}


// this should determing what the user will actually search, and each option is its own function
function userAction(userPath, userSearch) {
    switch(userPath) {
        case "concert-this":
            concertThis();
                break;
        case "spotify-this-song":
            spotifyThisSong();
                break;
        case "movie-this":
            movieThis();
                break;
        case "do-what-it-says":
            doWhatItSays(userSearch);
                break;
        default:
            console.log("Derp-a-Derp-Derp");
                break;
    }
}
userAction(userPath, userSearch);