var express = require('express');
var port = process.env.PORT || 3964;
//var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/', function (req, res) {
    res.render('http://localhost:' + port + '/static/index.html');

});

app.get('/countries', function (req, res) {
    res.send(countrydb.findAll());
})

app.listen(port, () => {
    console.log('RESTful API server listening on: ' + port);
});

// Country Data
const countrydb = (function () {

    function getCountryInfo(foundInfo) {
        var request = require('request');
        var url = "https://restcountries.eu/rest/v2";
        request(url, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            if (response.statusCode === 200) {
                data = JSON.parse(body);
                //console.log(data);
                foundInfo(data);
            }
        });
    }

    return { // public interface to the DB layer
        findAll: function () {
            var database = getCountryInfo(function (info) {
                var database = {};
                var countryName;
                for (i = 0; i < info.length; i ++) {
                    countryName = info[i].name;
                    //console.log(countryName);
                    database[countryName] = info[i];
                }
                console.log(database);
                return database;
            });
            return database;
        },
        findOne: function (name) {
            return database[name]
        },
        add: function(r) {
            database[r.id] = r
        },
        remove: function(i) {
            delete database[i]
        }
    };
})();
