// require .env file - gitignored
require("dotenv").config();

// require Axios - to access APIs
let axios = require("axios");

// require Moment - for dates and time
let moment = require("moment");

// require File Systems
let fs = require("fs");

//  this link the keys.js file to this file
let keys = require("./keys.js");

// Initialize Spotify
let spotify = require("node-spotify-api");
// let spotify = new Spotify(keys.spotify);

// taking in arguments
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

function spotifyThisSong() {
    if (!userSearch) {
        userSearch = "The Sign Ace of Base";

        spotify.search( {
            type: "track",
            query: userSearch
        },
        function(error, data) {
            if (error) {
                console.log("Derp, there was an error" + error);
                    return;
            }
            let songResults = data.tracks.items;
            for (let i = 0; i < songResults.length; i++) {
                console.log(i);
            }
            console.log(songResults);
        } )
    }
};

function movieThis() {
    if (!userSearch) {
        userSearch = "Mr Nobody";
    }
        let URL = "http://www.omdbapi.com/?t=" + userSearch + "&apikey=163f2aff";
        // console.log(URL);
    axios.get(URL).then(function(response) {
        let movieData = response.data;
        // console.log(movieData);
        console.log("Title: " + movieData.Title);
        console.log("Year: " + movieData.Year);
        console.log("IMDB Rating: " + movieData.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
        console.log("Country: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
    });
};
    //    * Title of the movie.
    //    * Year the movie came out.
    //    * IMDB Rating of the movie.
    //    * Rotten Tomatoes Rating of the movie.
    //    * Country where the movie was produced.
    //    * Language of the movie.
    //    * Plot of the movie.
    //    * Actors in the movie.

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