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
let Spotify = require("node-spotify-api");
let spotify = new Spotify(keys.spotify);

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
                console.log("-----------------------------------");
                console.log("The concert is in " + concert.venue.region + ", " + concert.venue.country + " at " + concert.venue.name + moment(concert.datetime).format(" MM/DD/YYYY"));
                console.log("-----------------------------------");

            }
        // console.log(concertData)
    });
};

function spotifyThisSong() {
    if (!userSearch) {
        userSearch = "The Sign Ace of Base";
    }
        spotify.search( {
            type: "track",
            query: userSearch
            // limit: 1
        },
        function(error, data) {
 

            if (error) {
                return console.log("Derp, there was an error: " + error);
            }
            let songResults = data.tracks.items;
            for (let i = 0; i < songResults.length; i++) {
                // console.log(songResults);
                console.log("-----------------------------------");
                console.log("Artist(s): " + songResults[i].artists[0].name);
                console.log("Song Name: " + songResults[i].name);
                console.log("Preview Link: " + songResults[i].preview_url);
                console.log("Album: " + songResults[i].album.name);
                console.log("-----------------------------------");
            
            }
        } 
    );
}
        // Artist(s)
        // * The song's name
        // * A preview link of the song from Spotify
        // * The album that the song is from

function movieThis() {
    if (!userSearch) {
        userSearch = "Mr Nobody";
    }
        let URL = "http://www.omdbapi.com/?t=" + userSearch + "&apikey=163f2aff";
        // console.log(URL);
    axios.get(URL).then(function(response) {
        let movieData = response.data;
        // console.log(movieData);
        console.log("-----------------------------------");
        console.log("Title: " + movieData.Title);
        console.log("Year: " + movieData.Year);
        console.log("IMDB Rating: " + movieData.Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + movieData.Ratings[1].Value);
        console.log("Country: " + movieData.Country);
        console.log("Language: " + movieData.Language);
        console.log("Plot: " + movieData.Plot);
        console.log("Actors: " + movieData.Actors);
        console.log("-----------------------------------");

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

// this next function should read the random.txt text file

// function doWhatItSays() {
//     fs.readFile("random.txt", "utf8", function (error, data) {
//         if (error) {
//             return console.log(error);
//         }
//         let dataText = data.split(",");

//         // get the info from random.txt and turn into arguments to run in all the functions
//         userPath = dataText[0];
//         userSearch = dataText[1];  
//         // userAction(userPath, userSearch);      
//     });
// };

// read file from random.txt
function doWhatItSays() {
   fs.readFile(“random.txt”, “utf8", function(error, data) {
       if (error) {
           return console.log(error);
       }
       var result = data.split(“,”);
       //result from file
       if (result[0] === “spotify-this-song”) {
           var song = result[1].slice(1, -1);
           spotifyThisSong(song);
       } else if (result[0] === “my-tweets”) {
           var tweetAcnt = result[1].slice(1, -1);
           myTwitter(tweetAcnt);
       } else if (result[0] === “movie-this”) {
           var movie = result[1].slice(1, -1);
           movieThis(movie);
       }
   });
}

let result = data.split(",");
       let newCommand = result[0];
       let newInput = result[1];
       console.log(newCommand, newInput);
       if (newCommand === "spotify-this-song"){
           spotifyThis(newInput);
       } else if(newCommand === "movie-this"){
           movieThis(newInput);
       } else if(newCommand === "concert-this"){
           concertThis(newInput)
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
            doWhatItSays();
                break;
        default:
            console.log("Derp-a-Derp-Derp");
                break;
    }
}
userAction(userPath, userSearch);