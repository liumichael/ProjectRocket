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

app.get('/search', function (req, res) {
    res.send(countrydb.loadAll());
})

app.listen(port, () => {
    console.log('RESTful API server listening on: ' + port);
});

// Data we need for a country page
// Ex:
/**data = {
    'Canada': {
        name: 'Canada',
        flag: 'img url',
        capital: 'Ottawa',
        region: 'Northern America',
        population: 36155487,
        languages: ['English', 'French'],
        currency: 'CAD',
        callingCodes: 1,
        timezones: ['UTC-08:00', 'UTC-07:00', 'UTC-06:00', 'UTC-05:00', 'UTC-04:00', 'UTC-03:30']
        reviews: {review1: {
                    userID: 15431,
                    rate: 4,
                    detail: 'Love this place'},
                  review2......
                }
    }
} **/

function getCountryAPIInfo() {

    return new Promise((resolve, reject) => {
        var request = require('request');
        var url = "https://restcountries.eu/rest/v2";
        request.get(url, function(error, response, body) {
            if (error) {
                reject(error);
            }
            else if (response.statusCode == 200) {
                var data = JSON.parse(body);
                resolve(data);
            }
        });
    });
}

function getCurrencyAPI() {
    return new Promise((resolve, reject) => {
        var request = require('request');
        var url = "http://api.fixer.io/latest?base=CAD";
        request.get(url, function(error, response, body) {
            if (error) {
                reject(error);
            }
            else if (response.statusCode == 200) {
                var data = JSON.parse(body);
                resolve(data);
            }
        });
    });
}

const countrydb = (function () {

    return { // public interface to the DB layer
        loadAll: function () {
            getCountryAPIInfo().then(info => {
                var database = {};
                for (i = 0; i < info.length; i ++) {
                    var countryName = info[i].name;
                    var countryInfo = {};
                    countryInfo['name'] = countryName;
                    countryInfo['flag'] = info[i].flag;
                    countryInfo['capital'] = info[i].capital;
                    countryInfo['region'] = info[i].subregion;
                    countryInfo['population'] = info[i].population;
                    var languages = [];
                    var officialLanguages = info[i].languages;
                    for (index in officialLanguages){
                        languages.push(officialLanguages[index].name);
                    }
                    countryInfo['languages'] = languages;
                    countryInfo['currency'] = info[i].currencies[0].code;
                    countryInfo['callingCodes'] = info[i].callingCodes;
                    countryInfo['timezones'] = info[i].timezones;
                    countryInfo['reviews'] = {};
                    database[countryName] = countryInfo;
                }
                //console.log(database);
                // Below is for creating JSON file
                /*var jsdata = JSON.stringify(database);
                var fs = require('fs');
                fs.writeFile("countries.json", jsdata);*/
                return database;
            });
            getCurrencyAPI().then(info => {
                var exchangeRates = info['rates'];
                console.log(exchangeRates);
                /*var jsdata = JSON.stringify(exchangeRates);
                var fs = require('fs');
                fs.writeFile("currencies.json", jsdata);*/
                return exchangeRates;
            });
        },
        findOne: function (name) {
            return name;
        },
        add: function(r) {
            database[r.id] = r
        },
        remove: function(i) {
            delete database[i]
        }
    };
})();
