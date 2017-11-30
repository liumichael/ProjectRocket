const controller = require('../controllers/controller.js')

module.exports = function(app, passport) {

    app.get('/', function (req, res) {
        res.redirect('/index.html');
    });

    app.get('/login', function (req, res) {
        res.redirect('/login.html');
    });

    app.get('/signup', function (req, res) {
        res.redirect('/signup.html');
    });

    app.get('/api/countries', controller.getAllCountries);
    app.get('/api/countries/:countryName', controller.getCountry);
    app.put('/api/countries/:countryName', controller.putCountry);
    app.post('/api/countries', controller.postCountry);
    app.delete('/api/countries/:countryName', controller.deleteCountry);
    app.get('/api/currencies', controller.getAllCurrencies);
    app.get('/api/currencies/:code', controller.getCurrency);
    app.put('/api/currencies/:code', controller.putCurrency);
    app.post('/api/currencies', controller.postCurrency);
    app.delete('/api/currencies/:code', controller.deleteCurrency);
    app.get('/api/messages', controller.getAllMessages);
    app.get('/api/messages/:id', controller.getMessageByID);
    app.post('/api/messages', controller.postMessage);
    app.delete('/api/messages/:id', controller.deleteMessageByID);

};

function loggedIn(req, res, next) {
    if (req.user) {
        next();
        return true;
    } else {
        res.redirect('/login');
        return false;
    }
}
