const mainController = require('/controllers/controller.js')

module.exports = function(app, passport) {

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
