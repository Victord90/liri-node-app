require("dotenv").config();

const keys = require("./keys.js");

const axios = require("axios");

const Spotify = require("node-spotify-api");

const spotify = new Spotify(keys.spotify);

const moment = require("moment");

const fs = require("fs");





const command = process.argv[2];

const input = process.argv[3];

    switch(command){
        case "concert-this":
            concert(input);
            break;

        case "spotify-this-song":
            spotifyThis(input);
            break;
        
        case "movie-this":
            movie(input);
            break;

        case "do-what-it-says":
            doThis(input);
            break;
    };



    function concert (){
        axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp")
            .then(function(response) {
                //console.log(response)
                for (let i = 0; i < response.data.length; i++){
                    let datetime = response.data[i].datetime;
                    let dateArr = datetime.split("T");
                    //console.log(dateArr)
                    console.log("---------------------------" + "\nVenue Name: " + response.data[i].venue.name + 
                    "\nVenue Location: " + response.data[i].venue.city +
                    "\nDate of Event: " + moment(dateArr[0]).format("MM/DD/YYYY"));
                    
                }
            })
            .catch(function (error) {
                console.log(error);
            })
    }


    function spotifyThis() {
        spotify.search({type: "track", query: input})
        .then(function(response) {
            //console.log(response.tracks.items[0].artists[0].name)
            for (let i = 0; i < response.tracks.items[i].artists.length; i++) {
                console.log("Artist: " + response.tracks.items[0].artists[0].name +
            "\nSong Name: " + response.tracks.items[0].name + 
            "\nAlbum Name: " + response.tracks.items[0].album.name +
            "\nPreview Link: " + response.tracks.items[0].preview_url)
            }
        })
        .catch(function (error) {
            console.log(error);
        })
    }


    function movie() {
        axios.get("https://www.omdbapi.com/?apikey=trilogy&t=" + input + "&y=&plot=short")
            .then(function(response){
                //console.log(response.data)
                console.log("Title: " + response.data.Title +
                "\nYear Released: " + response.data.Year +
                "\nIMDB Rating: " + response.data.imdbRating + 
                "\nRotten Tomatoes Rating: " + response.data.Ratings[1].Value +
                "\nCountry produced: " + response.data.Production  + 
                "\nLanguage: " + response.data.Language + 
                "\nPlot: " + response.data.Plot + 
                "\nMain Actors: " + response.data.Actors)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function doThis() {
        fs.readFile("random.txt", "utf8", function(error, data) {
            if (error) {
                return console.log(error)
            }
            let dataArray = data.split(",");
            console.log(dataArray)
            spotifyThis(dataArray[0], dataArray[1])
        })
    }
