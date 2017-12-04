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
    $('#popup').hide();
});
