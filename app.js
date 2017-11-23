var express = require('express');
var port = process.env.PORT || 3964;
//var MongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser');
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

// Routes
app.get('/', function (req, res) {
    res.redirect('/index.html');
});

app.get('/api', function (req, res) {
    // This doesn't send users the right things without the database
    // db.loadAll() gets the data from other API and returns a promise
    // I called it just to test the data format
    // After we have the database, we'll just set apiData = all country and
    // currency data from the database and call res.send(apiData);
    res.send(db.loadAll());
});

app.get('/api/countries', function (req, res) {
    res.send(db.getAllCountries());
});

app.get('/api/messages', function (req, res) {
    res.send(db.getAllMessages());
});

app.post('/api/messages', function (req, res) {
    db.postMessage({
        id: req.body.id,
        msg: req.body.msg
    });
    res.redirect("/index.html");
});

app.delete('/api/messages/:id', function (req, res) {
    db.deleteMessage(req.params.id);
    res.redirect("/index.html");
});


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

/* getCountryAPIInfo and getCurrencyAPI extract the data we want from the APIs
 * we use. We might need to add things to some fields by ourselves like reviews.
 */
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

const db = (function () {
    // Temptative data structure
    /**apidata = {
        'Countries':['Canada': {
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
            }],
        'Currencies': ["AUD": {code: "AUD", value: 1.0357},"BGN": {code: "BGN", value: 1.3066},....],
        'Messages': ['1': {id: 1, msg: 'blah'}, '1234': {id: 1234, msg: 'blah'}]}
    } **/
    let apiData = {};

    return { // public interface to the DB layer
        // After we run it once to get all the data we need to the database, we
        //don't need this loadAll anymore
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
        // For Countries.
        getAllCountries: function () {
            return apiData['Countries'];
        },
        getCountry: function (countryName) {
            return apiData['Countries'].countryName;
        },
        putCountry: function(countryData) {
            apiData['Countries'][countryData.name] = countryData;
        },
        postCountry: function(countryData) {
            apiData['Countries'][countryData.name] = countryData;
        },
        deleteCountry: function(countryName) {
            delete apiData['Countries'].countryName;
        },
        
        // For Currencies
        getAllCurrencies: function () {
            return apiData['Currencies'];
        },
        getCurrency: function (currencyCode) {
            return apiData['Currencies'].currencyCode;
        },
        putCurrency: function(currencyData) {
            apiData['Currencies'][currencyData.code] = currencyData;
        },
        postCurrency: function(currencyData) {
            apiData['Currencies'][currencyData.code] = currencyData;
        },
        deleteCurrency: function(currencyCode) {
            delete apiData['Currencies'].currencyCode;
        },

        // For Messages
        getAllMessages: function () {
            return apiData['Messages'];
        },
        getMessage: function (messageID) {
            return apiData['Messages'].messageID;
        },
        putMessage: function(messageData) {
            apiData['Messages'][messageData.ID] = messageData;
        },
        postMessage: function(messageData) {
            apiData['Messages'][countryData.ID] = messageData;
        },
        deleteMessage: function(messageID) {
            delete apiData['Messages'].messageID;
        }
    };
})();
