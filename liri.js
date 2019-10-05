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
let Spotify = require("node-spotify-app");
let spotify = new Spotify(keys.spotify);

// OMDB and Bands In Town APIs - from keys.js - provided
let omdb = require(keys.omdb);
let bandsintown = require(keys.bandsintown);

// taki in arguments
let userPath = process.argv[2];
let userSearch = process.argv.slice(3).join(" ");

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


function concertThis() {
    let URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        console.log(URL);

    axios.get(URL).then(function(response) {
        let concertData = [
            "Artists: " + response.data.lineup,
            "Venue: " + response.data.venue,
            "Venue Location: " + response.data.city,
            "Event Date: " + moment(concertData.response.data.datetime).format("MM/DD/YYYY hh:00 A")
        ].join("\n\n");
        console.log(concertDate)
    });
}