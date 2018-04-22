require("dotenv").config();

var keys = require('./keys.js');

var Twitter = require('twitter');

var Spotify = require("node-spotify-api");

var fs = require("fs");

var client = new Twitter(keys.twitterKeys);
var spotify = new Spotify(keys.spotify);

// Collect arguments from user and determine what API to call
var task = function (commands, title) {
    switch (commands) {
        case 'my-tweets':
            getTwitter();
            break;
        case 'spotify-this-song':
            getSpotify(title);
            break;

        // Work on OMBD API
        // case "movie-this":
        // getOMBD(title);
        //    break;
        case "do-what-it-says":
            getRandom();
            break;
        default:
            console.log('I can not process your request')

    }
}

// TWITTER
var getTwitter = function () {

    var params = { screen_name: 'EasyTLearning' };
    client.get('statuses/user_timeline', params, function (error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            for (var i = 0; i < tweets.length; i++) {
                console.log(tweets[i].created_at);
                console.log(tweets[i].text);
                console.log("");
            }
        }
    });
}

// SPOTIFY

var getArtistNames = function (artist) {
    return artist.name;
};

var getSpotify = function (songName) {

    spotify.search({ type: 'track', query: 'songName' }, function (err, data) {
        if (err) {
            console.log('Error: ' + err);
            return;
            if (null) {
                console.log("The Sign by Ace of Base");
                return;
            }
        }
        var songs = data.tracks.items;

        for (var i = 0; i < songs.length; i++) {
            console.log(i);
            console.log("Song= " + songs[i].name);
            console.log("Artist(s)= " + songs[i].artists);
            console.log("Album= " + songs[i].album.name);
            console.log("Preview= " + songs[i].preview_url);
            console.log("");
        }
    }
    );
};

// OMBD

// Do What It Says Function
var doWhatItSays = function () {
    fs.readFile("random.txt", "utf8", function (error, data) {
        console.log(data);

        var titles = data.split(",");

        if (titles.length === 2) {
            task(titles[0], titles[1]);
        }
        else if (titles.length === 1) {
            task(titles[0]);
        }
    });
};


var runThis = function (arguementOne, arguementTwo) {
    task(arguementOne, arguementTwo);
};

runThis(process.argv[2], process.argv[3]);
