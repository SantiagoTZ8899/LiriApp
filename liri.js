// require .env file - gitignored
require("dotenv").config();

var keys = require("./keys.js");

var spotify = new Spotify(keys.spotify);

// "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"