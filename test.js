const request = require('request')

    function rot13(msg) {
        // implement this
    }

    request.get('http://wolf.teach.cs.toronto.edu:3090/secret-message/:lemicha3', function (err, resp, body){
        const secret_message = body;

        decrypted_message = rot13(secret_message)

        request.post({
            url: 'http://wolf.teach.cs.toronto.edu:3090/secret-message/:lemicha3',
            json: true, // don't forget,
            body: {
                'utorid': 'lemicha3',
                'message': 'basileusandotherlatepleistocenegraywolvesbutmorerobustandwithstrongerjaw'
            },
            function(err, resp, body){
                console.log(body)
            }
        });
        console.log('basileusandotherlatepleistocenegraywolvesbutmorerobustandwithstrongerjaw');
    })