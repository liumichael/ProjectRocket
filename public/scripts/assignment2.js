var currencyCode;

function getCountryInfo(country) {

    // Change to this one when running on Heroku
    //var url = "https://mysterious-hollows-73808.herokuapp.com/api/countries/" + country
    // Change to this one when testing locally
    var url = "http://localhost:3964/api/countries/" + country

    // Use ajax to handle errors
    $.ajax({
        url: url,
        dataType: 'json',
        type: "GET",
        success: function(data) {
            if (data.length > 0) {
                $('#countryName').text(data[0].name)
                $('#region').html("<p><b>Region: </b></br>" + data[0].region + "</p>")
                $('#capital').html("<p><b> Capital: </b></br>" + data[0].capital + "</p>")
                $('#currency').html("<p><b> Currency: </b>"+ data[0].currency + "</p>")
                $('#population').html("<p><b> Population: </b></br>"+ data[0].population + "</p>")
                $('#code').html("<p><b> Calling Codes: </b>"+ data[0].callingcodes + "</p>")
                $('#timezone').html("<p><b> Timezones: </b></br>"+ data[0].timezones + "</p>")

                var officialLanguages = data[0].languages
                console.log(officialLanguages)
                var language = ""
                for (index in officialLanguages){
                    language += officialLanguages[index] + ", "
                }
                language = language.replace(/,\s*$/, "");
                $('#languages').html("<p><b> Languages: </b></br>" + language + "</p>")

                var imageTag = "<img class='img-thumbnail mx-auto d-block' src=" + data[0].flag + " alt=" + data[0].name + "'s Flag>"
                $('#flag').html(imageTag + "</br>")

                $('#worldMap').hide()
                $('#currentTitle').hide()
                $('#countryName').show()
                $('#appDescription').text("Share your Experience.")
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
                $('#rating1').show()
                $('#rating2').show()
                $('#rating3').show()
                $('#rating4').show()
                $('#rating5').show()
                currencyCode = data[0].currency
            }
            else {
                $('#writeReview').hide()
                $('#reviewInput').hide()
                $('#existingReview').hide()
                $('#rating1').hide()
                $('#rating2').hide()
                $('#rating3').hide()
                $('#rating4').hide()
                $('#rating5').hide()
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
            $('#rating1').hide()
            $('#rating2').hide()
            $('#rating3').hide()
            $('#rating4').hide()
            $('#rating5').hide()
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

function getCurrencyInfo(amount) {
    //var url = "https://mysterious-hollows-73808.herokuapp.com/api/currencies";
    var url = "http://localhost:3964/api/currencies"
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

$(document).ready(function() {
    // Hide the Status message when there is no messages to show.
    //$('#popup').hide()
    $('#popup').show()
    $('#currencyConverter').hide()
    $('#Reviews').hide()
    $('#writeReview').hide()
    $('#reviewInput').hide()
    $('#existingReview').hide()
    $('#rating1').hide()
    $('#rating2').hide()
    $('#rating3').hide()
    $('#rating4').hide()
    $('#rating5').hide()
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
        $('#rating1').hide()
        $('#rating2').hide()
        $('#rating3').hide()
        $('#rating4').hide()
        $('#rating5').hide();
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
    $('#writeReview').submit(function () {
        alert("Thank you for your review!")
        console.log("User submitted review")
        $("#reviewInput").val('').focus().blur();
        return false
    });

});
