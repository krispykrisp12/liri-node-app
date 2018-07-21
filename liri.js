// Requires
require("dotenv").config();
var keys = require("./keys.js");
var fs = require("fs");
var request = require("request");
var Twitter = require('Twitter');
var Spotify = require('node-spotify-api');
// Variable that creates a new line
const newLine = "\r\n";

// Argument action and value
var action = process.argv[2];
// ================ Switch Case ===========================
// This switch-case will makes sure the right function run
switch (action) {
// my-tweets
case "my-tweets":
  getTweets();
  break;
// spotify-this-song
case "spotify-this-song":
  getSong();
  break;
// movie-this
case "movie-this":
  getMovie();
  break;
// do-what-it-says
case "do-what-it-says":
  doWhatItSays();
  break;
// Prints a default massage if there isn't user command
  default:
  console.log("Please enter a command: my-tweets, spotify-this-song, movie-this, do-what-it-says");
break;
}
// ================= End of Switch case ===================

// ================== Functions ===========================
// -----------------------------------
function getTweets(){
    var client = new Twitter(keys.twitter);

    var params = {q: 'krispykrisp', count: 20};

    client.get('statuses/user_timeline', params, searchedData);
   
    function searchedData(error, data, response) {
        // Prints out error message
        if (error) {
            console.log("error")
        }else{
            // Loop through the tweets and printing out created at and the tweets
            for(i = 0; i < data.length; i++){
                console.log("============= My Tweets ================"
                + newLine + "Create at: " + data[i].created_at
                + newLine + "Tweet: " + data[i].text
                + newLine + "========================================");      
            }
        }
    }
// -----------------------------------
// This function grabs songs from spotify
function getSong(){
    var spotify = new Spotify(keys.spotify);

        function song(song){
        // command line request
        var song = process.argv[3];
        // Default value
        if (!song) {
            song = "'The Sign' by Ace of Base";
        };
        spotify.search({ type: "track", query: song, limit: 1 })
            .then(function (response) {
            var response = response.tracks.items[0];
            // Logging out the response
            console.log("============= Song Requested ============"
            + newLine + "Artist: " + response.artists[0].name 
            + newLine + "Song: " + response.name 
            + newLine + "Preview Link: " + response.external_urls.spotify
            + newLine + "Album: " + response.album.name
            + newLine + "=========================================");
            log();
        });
    }
    // Calling song function
    song();
}
// -----------------------------------
// This function grabs movies from OMDB
function getMovie(){
        // command line request
        var movieName = process.argv[3];
        // getting movie from OMDB API
        var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
        request(queryUrl, function(error, response, body) {
           if(!movieName){
            console.log("Mr. nobody!");
           } else{
        var jsonData = JSON.parse(body);
        // Movie funciton
        var movies = function(){
            // error checking --- console.log(jsonData.Year);

            console.log("============= Movie Requested ============"
                + newLine + "Title: " + jsonData.Title
                + newLine + "Year: " + jsonData.Year
                + newLine + "IMDB Rating:   " + jsonData.imdbRating
                + newLine + "Rotten Tomato Rating: " + jsonData.Ratings[1].Value
                + newLine + "Country Produced: " + jsonData.Country
                + newLine + "Language: " + jsonData.Language
                + newLine + "Plot: " + jsonData.Plot
                + newLine + "Actors: " + jsonData.Actors
                + newLine + "=========================================");
                log();
        }
         // Calling movie function
         movies();
        }
    });
}
 
// -----------------------------------
// This function grabs the content of random.txt file
function doWhatItSays(){
    function readMe(){
        fs.readFile("random.txt", "utf8", function(error, response) {
            // printing the error
            if (error){
                console.log(error);
            }
            // Printing the response
            console.log(response);
            log();
        });
    }
    // calling the readMe function
    readMe();
}
// ----------
function log(){
    // Command line argument store in logging variable
    var logging = process.argv[3];

   
    // Appending the command argument to log.txt
    fs.appendFile("log.txt", logging + newLine, function(error) {

    // log error
    if (error) {
        console.log(error);
    }
    // Prints message content added if this is no error
    else {
        console.log("Content Added!");
    }

    });
    }
}