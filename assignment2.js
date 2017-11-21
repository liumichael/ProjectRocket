var currencyCode;

function getCountryInfo(country) {
    fields = "?fields=capital;currencies;population;flag;timezones;languages;callingCodes;subregion;name"

    // Hard code the result for South and North Korea but might wanna come up with something better.
    var fullText = "?fullText=true";
    var kimJongUn = 0
    if ((country == ("North Korea")) || (country == ("north korea"))) {
        kimJongUn = 1
        country = "Korea"
        fullText = ""
    }
    else if ((country == ("South Korea")) || (country == ("south korea")) || (country == ("korea"))) {
        kimJongUn = -1
        country = "Korea"
        fullText = ""
    }
    else if (country == "Korea") {
        fullText = ""
    }
    //url = "https://restcountries.eu/rest/v2/name/" + country + fields
    // Changed url to search by country full name
    var url = "https://restcountries.eu/rest/v2/name/" + country + fullText

    // Use ajax to handle errors
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            var i = 0
            if (data.length > 1) {
                if (country == "Korea"){
                    if (kimJongUn != 1) {
                        i = 1
                    }
                }
              //suggest other countries
            }
            $('#currentTitle').text(data[i].name)
            $('#region').html("<p><b>Region: </b></br>" + data[i].subregion + "</p>")
            $('#capital').html("<p><b> Capital: </b></br>" + data[i].capital + "</p>")
            $('#currency').html("<p><b> Currency: </b>"+ data[i].currencies[0].code + "</p>")
            $('#population').html("<p><b> Population: </b></br>"+ data[i].population + "</p>")
            $('#code').html("<p><b> Calling Codes: </b>"+ data[i].callingCodes + "</p>")
            $('#timezone').html("<p><b> Timezones: </b></br>"+ data[i].timezones + "</p>")

            var officialLanguages = data[i].languages
            var language = ""
            for (index in officialLanguages){
                language += officialLanguages[index].name + ", "
            }
            language = language.replace(/,\s*$/, "");
            $('#languages').html("<p><b> Languages: </b></br>" + language + "</p>")

            var imageTag = "<img class='img-thumbnail mx-auto d-block' src=" + data[i].flag + " alt=" + data[i].name + "'s Flag>"
            $('#flag').html(imageTag + "</br>")

            $('#worldMap').hide()
            $('#currentTitle').show()
            $('#appDescription').hide()
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
/*review*/  $('#Reviews').show()
            $('#reviewLine').show()
	    $('#Reviews').show()
            $('#writeReview').show()
            $('#reviewInput').show()
            $('#existingReview').show()
            $('#rating1').show()
            $('#rating2').show()
            $('#rating3').show()
            $('#rating4').show()
            $('#rating5').show()
            currencyCode = data[i].currencies[0].code
        },
        error: function(data) {
	    $('#Reviews').hide()
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
            $('#errorHandling').html("<img class='img-thumbnail mx-auto d-block panel-transparent' src=\"pictures/errorLogo.png\" alt=\"errorLogo\"> <p><b>Country Not Found!</b></p>")
            $('#errorHandling').show()
        }
    });
}

function getCurrencyInfo(amount) {
    var url = "http://api.fixer.io/latest?base=CAD"
    $.ajax({
        url: url,
        dataType: 'json',
        success: function(data) {
            if ((currencyCode in data.rates) || (currencyCode == "CAD")){
                if (currencyCode == "CAD") {
                    $('#conversionResult').html("<p>" + amount + " CAD is " + amount + " " + currencyCode + "</p>")
                }
                else {
                    var result = amount * (data['rates'][currencyCode])
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
        var info = $('#info').val()
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
            getCountryInfo(info)
            $("#currencyInput").val('').focus().blur();
            $("#info").val('').focus().blur();
	   // $('#Reviews').show();
        }
        return false
    });
    $('#home').click(function() {
        $('#worldMap').show()
        $('#currentTitle').text("Project Rocket")
        $('#currentTitle').show()
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
        $("#info").val('').focus().blur()
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
