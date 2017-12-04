const controller = require('../controllers/controller.js');

module.exports = function(app, passport) {

    app.get('/', function (req, res) {
        if (req.user) {
            res.render('index.ejs', {user: req.user, email: req.user.local.email, message: req.flash('message')});
        }
        else {
            res.render('index.ejs', {user: req.user, message: req.flash('message')});
        }
    });

    app.get('/login', function (req, res) {
        res.render('login.ejs', {user: req.user, message: req.flash('loginMessage') });
    });

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', {user: req.user, message: req.flash('signupMessage') });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        req.flash('message', "You have Successfully Logged Out!")
        res.redirect('/');
    });

    // RESTful API routes
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
    app.get('/api/messages/users/:email', controller.getMessageByUser);
    app.put('/api/messages/:id/:email', controller.putMessageByIDAndUser);
    app.post('/api/messages', controller.postMessage);
    app.delete('/api/messages/:id', controller.deleteMessageByID);
    app.delete('/api/messages', controller.deleteAllMessages);

    app.get('/profile', controller.getProfile);

    app.get('/users', controller.getAllUsers);

    //get the new username in profile
    app.post('/change-username', controller.changeUsername);

    app.get('/reviews', controller.getAllReview);
    app.get('/reviews/country/:countryName', controller.getCountryReview);
    app.get('/reviews/user/:userName', controller.getUserReview);
    app.post('/reviews', controller.postReview);
    app.post('/deleteReview', controller.deleteReview);
    app.post('/putReview', controller.putReview);

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
         successRedirect: '/', // redirect to the secure profile section
         failureRedirect: '/signup', // redirect back to the signup page if there is an error
         failureFlash: true // allow flash messages
    }));

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
         successRedirect: '/', // redirect to the secure profile section
         failureRedirect: '/login', // redirect back to the signup page if there is an error
         failureFlash: true // allow flash messages
    }));

    // For the global variable msgID
    app.post('/loadMsgID', controller.loadMsgID);
    app.get('/getMsgID', controller.getMsgID);
    app.delete('/deleteMsgID', controller.deleteMsgID);


    // starter code for review db get post
    // app.post('/review/new', controller.addReview);
    // app.get('/review/:reviewid', controller.getReview);
    // app.post('/review/edit/:reviewid', controller.editReview)
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
