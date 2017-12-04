var currencyCode;

function getCountryInfo(country) {

    // Change to this one when running on Heroku
    var url = "https://mysterious-hollows-73808.herokuapp.com/api/countries/" + country
    // Change to this one when testing locally
    //var url = "http://localhost:3964/api/countries/" + country

    // Use ajax to handle errors
    $.ajax({
        url: url,
        dataType: 'json',
        type: "GET",
        success: function(data) {
            if (data.length > 0) {
                $('#countryName').text(data[0].name)
                $('#countryForm').attr('value', data[0].name)
                $('#region').html("<p><b>Region: </b></br>" + data[0].region + "</p>")
                $('#capital').html("<p><b> Capital: </b></br>" + data[0].capital + "</p>")
                $('#currency').html("<p><b> Currency: </b>"+ data[0].currency + "</p>")
                $('#population').html("<p><b> Population: </b></br>"+ data[0].population + "</p>")
                $('#code').html("<p><b> Calling Codes: </b>"+ data[0].callingcodes + "</p>")
                $('#timezone').html("<p><b> Timezones: </b></br>"+ data[0].timezones + "</p>")

                var officialLanguages = data[0].languages
                //console.log(officialLanguages)
                var language = ""
                for (index in officialLanguages){
                    language += officialLanguages[index] + ", "
                }
                language = language.replace(/,\s*$/, "");
                $('#languages').html("<p><b> Languages: </b></br>" + language + "</p>")

                var imageTag = "<img class='img-thumbnail mx-auto d-block' src=" + data[0].flag + " alt=\"Country Flag\">"
                $('#flag').html(imageTag + "</br>")

                getOwnCountryReview(data[0].name)
                getReviewByCountry(data[0].name);

                $('#worldMap').hide()
                $('#currentTitle').hide()
                $('#countryName').show()
                $('#appDescription').text("Sign Up or Log In to Share your Experience.")
                $('#appDescription').show()
                $('#capital').show()
                $('#region').show()
                $('#currency').show()
                $('#currencyConverter').show()
                $('#conversionResult').empty()
                $('#population').show()
                $('#code').show()
                $('#timezone').show()
                $('#flag').show()
                $('#languages').show()
                $('#errorHandling').hide()
                $('#Reviews').show()
                $('#reviewLine').show()
                $('#writeReview').show()
                $('#reviewInput').show()
                $('#existingReview').show()
                currencyCode = data[0].currency
            }
            else {
                $('#writeReview').hide()
                $('#reviewInput').hide()
                $('#existingReview').hide()
                $('#worldMap').hide()
                $('#currentTitle').hide()
                $('#countryName').hide()
                $('#appDescription').hide()
                $('#capital').hide()
                $('#region').hide()
                $('#currency').hide()
                $('#currencyConverter').hide()
                $('#conversionResult').empty()
                $('#population').hide()
                $('#code').hide()
                $('#timezone').hide()
                $('#flag').hide()
                $('#Reviews').hide()
                $('#languages').hide()
                $('#reviewLine').hide()
                $('#errorHandling').html("<p><b>Country Not Found!</b></p> <img class='img-thumbnail mx-auto d-block panel-transparent' src=\"images/errorLogo.png\" alt=\"errorLogo\">")
                $('#errorHandling').show()
            }
        },
        error: function(data) {
            $('#writeReview').hide()
            $('#reviewInput').hide()
            $('#existingReview').hide()
            $('#worldMap').hide()
            $('#currentTitle').hide()
            $('#countryName').hide()
            $('#appDescription').hide()
            $('#capital').hide()
            $('#region').hide()
            $('#currency').hide()
            $('#currencyConverter').hide()
            $('#conversionResult').empty()
            $('#population').hide()
            $('#code').hide()
            $('#timezone').hide()
            $('#flag').hide()
            $('#Reviews').hide()
            $('#languages').hide()
            $('#reviewLine').hide()
            $('#errorHandling').html("<p><b>Country Not Found!</b></p> <img class='img-thumbnail mx-auto d-block panel-transparent' src=\"images/errorLogo.png\" alt=\"errorLogo\">")
            $('#errorHandling').show()
        }
    });
}

function getReviewByCountry(countryName) {
    // var url = "https://mysterious-hollows-73808.herokuapp.com/reviews/country/" + countryName;
    var url = "/reviews/country/" + countryName;
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function(countryReviews) {
            var text = '';
            if (countryReviews.length == 0){
                text += '<h3 style="margin-bottom: 100px; text-align: center;">No reviews for this country yet. Would you like to share your experience? </h3>';
            }
            for(var i=0; i < countryReviews.length; i++){
                if(countryReviews[i].rate >= 1){
                    text += '<img src="../images/star-on.png" width=30px>';
                }
                if(countryReviews[i].rate >= 2){
                    text += '<img src="../images/star-on.png" width=30px>';
                }
                if(countryReviews[i].rate >= 3){
                    text += '<img src="../images/star-on.png" width=30px>';
                }
                if(countryReviews[i].rate >= 4){
                    text += '<img src="../images/star-on.png" width=30px>';
                }
                if(countryReviews[i].rate >= 5){
                    text += '<img src="../images/star-on.png" width=30px>';
                }
                if(countryReviews[i].rate == 1){
                    text += '<img src="../images/star-off.png" width=30px><img src="../images/star-off.png" width=30px><img src="../images/star-off.png" width=30px><img src="../images/star-off.png" width=30px>';
                }
                if(countryReviews[i].rate == 2){
                    text += '<img src="../images/star-off.png" width=30px><img src="../images/star-off.png" width=30px><img src="../images/star-off.png" width=30px>';
                }
                if(countryReviews[i].rate == 3){
                    text += '<img src="../images/star-off.png" width=30px><img src="../images/star-off.png" width=30px>';
                }
                if(countryReviews[i].rate == 4){
                    text += '<img src="../images/star-off.png" width=30px>';
                }

                text += '<br>';

                text += '<textarea class="existingReview" readonly name="Review" cols="90" rows="25" style="opacity: 1;">' + countryReviews[i].content + '</textarea>';

                text += '<h5>Reviewed By: ';
                text += countryReviews[i].username;
                text += '</h5>';

                text += '<br><br>';
            }

            $('#existingReview').html(text);

        },
        error: function(data) {
            alert("Get review failed.");
        }
    });
}

function getOwnCountryReview(countryName) {
    // var url = "https://mysterious-hollows-73808.herokuapp.com/reviews/country/" + countryName;

    var url = "/reviews/country/" + countryName;
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function(countryReviews) {
            var i=0;
            var found = false
            for(i; i < countryReviews.length; i++){
                if (countryReviews[i].username == $('#username').val()){
                    found = true
                    break
                }
            }
            if (found){
                $('#rating'+countryReviews[i].rate).prop("checked", true);
                $('#star').attr("value", countryReviews[i].rate);
                $(':radio').attr("disabled", true)
                $('#selfReviewTitle').html("<b>Edit or Delete Your Review</b>");
                $('#reviewInput').val(countryReviews[i].content)
                $('#reviewInput').attr('placeholder', '');
                $('#reviewInput').prop("disabled", true);
                $('#deleteReview').attr('style', 'float: right')
                $('#editReview').attr('style', 'float: right')
                $('#reviewSubmit').attr("style", 'display: none')
            }
            else {
                $('#rating5').prop("checked", true);
                $(':radio').attr("disabled", false)
                $('#selfReviewTitle').html("<b>Rate and Review Country</b>");
                $('#reviewInput').val("")
                $('#reviewInput').attr('placeholder', 'Write your own review of this country!')
                $('#reviewInput').prop("disabled", false);
                $('#reviewSubmit').attr("style", 'float: right')
                $('#deleteReview').attr('style', 'display: none')
                $('#editReview').attr('style', 'display: none')
            }
        },
        error: function(data) {
            alert("Get review failed.");
        }
    });
}

function getCurrencyInfo(amount) {
    var url = "https://mysterious-hollows-73808.herokuapp.com/api/currencies";
    //var url = "http://localhost:3964/api/currencies"
    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function(data) {
            var available = 0;
            var index = 0;
            for (i in data) {
                console.log(data[i].code)
                if (data[i].code == currencyCode) {
                    available = 1;
                    index = i;
                }
            }
            if ((available == 1) || (currencyCode == "CAD")){
                if (currencyCode == "CAD") {
                    $('#conversionResult').html("<p>" + amount + " CAD is " + amount + " " + currencyCode + "</p>")
                }
                else {
                    var result = amount * (data[index].rate)
                    $('#conversionResult').html("<p>" + amount + " CAD is " + result + " " + currencyCode + "</p>")
                }
            }
            else {
                $('#conversionResult').html("<p>Sorry! Currency Converter isn't available for this currency</p>")
                console.log("Currency API does not provide info regarding the selected currency")
            }
        },
        error: function(data) {
            alert("Currency Converter isn't available for this currency.")
        }
    });
}

function getMessageInfo(email) {
    var url = "https://mysterious-hollows-73808.herokuapp.com/api/messages/users/" + email;
    //var url = "http://localhost:3964/api/messages/users/" + email;

    $.ajax({
        url: url,
        type: "GET",
        dataType: 'json',
        success: function(msg) {
            var notRead = [];
            console.log(msg);
            console.log(msg[0].read);
            for (var i = 0; i < msg.length; i++) {
                if (msg[i].read == false) {
                    notRead.push(msg[i]);
                }
            }
            console.log(notRead);
            if (notRead.length == 0) {
                $('#popup').hide();
            }
            else {
                var text = '<p id="msg">' + notRead[0].data + '</p>';
                $('#statusMsg').html(text);
                $('#popup').show().delay(5000).fadeOut();
                $('#myPopup').show().delay(5000).fadeOut();
                setMessageToRead(notRead[0].id, email);
            }
        },
        error: function(msg) {
            console.log("Get status message failed.");
        }
    });
}

function setMessageToRead(msg_id, email) {

    var url = "https://mysterious-hollows-73808.herokuapp.com/api/messages/" + msg_id + "/" + email;
    //var url = "http://localhost:3964/api/messages/" + msg_id + "/" + email;
    $.ajax({
        url: url,
        type: "PUT",
        success: function(msg) {
            console.log("Successfully set " + msg_id + " to read!");
        },
        error: function(msg) {
            console.log("Failed to set message " + msg_id + " to read.");
        }
    });

}

$(document).ready(function() {
    // Hide the Status message when there is no messages to show.
    $('#popup').hide();
    $('#currencyConverter').hide()
    $('#Reviews').hide()
    $('#writeReview').hide()
    $('#reviewInput').hide()
    $('#existingReview').hide()
    $('#countrySearch').submit(function () {
        var info = $('#country').val()
        if (!info){
            alert("Enter a country name")
            // $('#worldMap').show()
            // $('#currentTitle').text("Project Rocket")
            // $('#currentTitle').show()
            // $('#appDescription').show()
            // $('#capital').empty()
            // $('#region').empty()
            // $('#currency').empty()
            // $('#currencyConverter').hide()
            // $('#conversionResult').empty()
            // $('#population').empty()
            // $('#code').empty()
            // $('#timezone').empty()
            // $('#flag').empty()
            // $('#languages').empty()
            // $('#errorHandling').hide()
        }
        else {
            $('#worldMap').hide()
            $('#appDescription').hide()
            $('#currentTitle').hide()
            $('#countryName').hide()
            getCountryInfo(info)
            $("#currencyInput").val('').focus().blur();
            $("#country").val('').focus().blur();
	   // $('#Reviews').show();
        }
        return false
    });
    $('#home').click(function() {
        $('#worldMap').show()
        $('#currentTitle').show()
        $('#countryName').hide()
        $('#appDescription').text("Search for a Country. Share your Experience.")
        $('#appDescription').show()
        $('#capital').empty()
        $('#region').empty()
        $('#currency').empty()
        $('#currencyConverter').hide()
        $('#conversionResult').empty()
        $('#population').empty()
        $('#code').empty()
        $('#timezone').empty()
        $('#flag').empty()
        $('#languages').empty()
        $('#errorHandling').hide()
        $("#country").val('').focus().blur()
        $('#Reviews').hide()
        $('#reviewLine').hide()
        $('#writeReview').hide()
        $('#reviewInput').hide()
        $('#existingReview').hide()
    });
    $('#currencyConvert').submit(function () {
        $('#conversionResult').empty()
        var amount = $('#currencyInput').val()
        if (amount){
            var amountCpy = Math.round(amount);
            if (Number.isInteger(amountCpy)) {
                getCurrencyInfo(amount)
            }
            else {
                alert("Please enter a number")
                console.log("Currency input not a number")
            }
        }
        else {
            alert("Enter a dollar amount in CAD")
            console.log("No currency input")
        }
        $("#currencyInput").val('').focus().blur();
        return false
    });

    //when edit button is clicked
    $(document).ready(function() {
        $("#editReview").click(function(){
            $('#reviewInput').prop("disabled", false);
            $('#reviewSubmit').attr("style", 'float: right')
            $(':radio').attr("disabled", false)
            $('#reviewSubmit').attr("formaction", '/putReview');

            if ($(this).text() == "Edit"){
                $(this).text("Cancel");
            }
            else {
                $(this).text("Edit");
                $('#reviewInput').prop("disabled", true);
                $('#reviewSubmit').attr("style", 'display: none');
                $('#reviewSubmit').attr("formaction", '/reviews');
                $(':radio').attr("disabled", true)
                var star = $('#star').attr('value');
                $('#rating'+star).prop("checked", true);

            }
            return false;
    });
});
});
