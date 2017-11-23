// Note that this is only for testing sign up. We need a database and set userData to the data obtained
// from the database
var userData = {};


$(document).ready(function() {
    $('#loginForm').submit(function () {
        var email = $('#email').val();
        var pwd = $('#pwd').val();
        console.log("User loggin in")
        console.log(email);
        console.log(pwd);
        // Check if the username and pwd match the data in the database
        if (email in userData) {
            if (userData[email].pwd == pwd) {
                alert("Welcome back!");
            }
            else {
                alert("Wrong password! Please try again.");
            }
        }
        else {
            console.log("There is no account associated with this email.");
            alert("There is no account associated with this email. Sign up and join us!");
        }
        // Make email the key of the schema

        return false
    });
});

$(document).ready(function() {
    $('#signupForm').submit(function () {
        var email = $('#email').val();
        var username = $('#username').val();
        var pwd = $('#pwd').val();
        console.log("User signing up");
        //console.log(email);
        //console.log(username);
        //console.log(pwd);
        // Store user data in the database
        // Hard code for now
        var userInfo = {};
        userInfo['email'] = email;
        userInfo['username'] = username;
        userInfo['pwd'] = pwd;
        if (email in userData) {
            console.log("There is an account associated with this email already.");
            alert("There is an account associated with this email already. If you already have an account, please try logging in.");
        }
        else {
            userData[email] = userInfo;
        }
        // Make email the key of the schema

        return false
    });
});
