## Group Members:
- Student 1: Zhen Bang Liu (1002374012)
- Student 2: Yun-Yi Liu (1002063964)
- Student 3: Michael Le (1002432183)


## Important Notes

- If on local machine, app.js is our entry point (run node app.js and the url is localhost:3964)

- If on Heroku: https://mysterious-hollows-73808.herokuapp.com

- **Detailed [API documentation](https://github.com/FallCSC309/assignment-3-teamrocket/blob/master/Solutions.md#restful-api-documentation) is written in the section after Web Application Features**

- **Other important features regarding session management and status messages are written in [Web Application Feature Section](https://github.com/FallCSC309/assignment-3-teamrocket/blob/master/Solutions.md#web-application-features)**

- When searching for a country, it is better to choose a country name that is suggested by the autocompletion or make sure that you spell it correctly because common names aren't valid inputs (e.g. you need to type United States of America instead of US, USA, America, or United States)

- Post methods allow one insert at a time

- When passing in JSON data for post and put methods, please indicate it with the header **--header "Content-Type: application/json"**

- The letters in the name field in a country are upper case (CRUD methods for country automatically change the name field to upper case for the users). This makes our search bar not case sensitive (i.e. canada, Canada, CaNadA all work). We make this decision because we believe that this will allow the users to search for a country more conveniently


## Web Application Features

### Project Description

- Project Rocket is a web application that allows users to search for a country, submit a review to share their travel experiences of that country, and read other users' experiences (Basically like yelp but instead of writing reviews and rating restaurants, we rate and write reviews on how good it is to travel to a certain country)

- Users can search for a country with the search bar. Our search bar provides autocompletion and will show a list of all countries whose country names contain the letters that are typed in by the users

- The rocket logo on the top left corner redirects users back to the homepage and the login/signup buttons redirect users to the corresponding pages

- If the admin pushes some status messages, they'll show on the top left part of our page and below the logo

- When users type in a valid country name and press Search, that country's page will show up

  - This page includes information about that country such as country name, flag, capital, region, population, official languages, currency, calling codes, and timezones

  - It also includes a currency converter, where users can enter an amount of money in CAD and it will convert that amount to the respective country's currency if the currency is supported by our API

  - Below the country information, users can see the "Rate and Review Country" section where they can hover over the stars to rate their travel experience and submit a review for that country, given that the users are logged in

  - The "Other Reviews" section is where users can see the experiences shared by other users. All users can see this section no matter if they are logged in or not

- The users get redirected to an error page if some invalid input was entered in the search bar


### Session Management

- If users aren't logged in, they can only view other people's review but won't be able to submit their own review

- When users are logged in, the buttons on the top right corner change from login/signup to profile/logout

  - Clicking on the Profile button redirects users to their profile page where they can change their user name and see the reviews that they submitted

  - Clicking on the Logout button logs the users out of the system

- The profile page contains data that belongs to a specific user, meaning that each user should see his/her own data on the page. On the profile page, users are able to:

  - See the reviews that they have submitted
  - Change their username

- When users submit some reviews, their usernames will show underneath the reviews that they submitted (i.e. A logged in user with a username Alice would see "Reviewed by Alice" after submitting a review. If another logged in user with a username Bob submits a review at the same time, he would see "Reviewed by Bob" underneath his review)


### Status Messages

- Changes will show when users click on anywhere (that is not a clickable button) on the page and we assume a message has been read by the user once it shows up on the page

- If users have read all the messages, nothing will show on the top left corner since we only want to show the messages that haven't been read yet

- If there are messages that users haven't read yet, the messages will show on the top left corner one at a time. The next message will show as soon as users click on anywhere on the page. Otherwise, the message will fade after 5 seconds and the next message will wait until the users click on the page

- For testing status messages:

  - Run ```curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/messages```
  to check all the messages

  - Only the ones that haven't been read will show on the page, one at a time

  - Run ```curl -XPOST --data "data=blah" https://mysterious-hollows-73808.herokuapp.com/api/messages```

  - If you run curl -XGET before clicking anywhere on the page, you should see that the read attribute of the message you just posted is false

  - Click anywhere on the page and the message will show up

  - Run get again and you should see that the read attribute is now true


## RESTful API Documentation

- We have 3 kinds of resources in our API: [Country](https://github.com/FallCSC309/assignment-3-teamrocket/blob/master/Solutions.md#countries), [Currency](https://github.com/FallCSC309/assignment-3-teamrocket/blob/master/Solutions.md#currencies), and [Message](https://github.com/FallCSC309/assignment-3-teamrocket/blob/master/Solutions.md#messages), and therefore 3 collections: Countries, Currencies, and Messages  

  - A Country resource has attributes country name (letter are all upper case), flag, capital city, region, population, official languages, calling codes, and timezones  

  - A Currency resource has attributes code and rate, where code is the currency code of a country and rate is the amount in that currency with respect to 1 Canadian Dollar (i.e. the rate value for AUD is 1.0297 because 1.0297 AUD = 1 CAD)  

  - A Message resource has attributes data and read, where data is the actual message and read is a flag that indicates if the message has been read (true) or not (false). We use the \_id attribute that mongoDB generated as the ID of a message

- All of post, get, put, delete operations are implemented for our resources

- Our API endpoints are nouns

  - Every API endpoints have a prefix '/api' attached

  - '/api/countries' refers to the whole country collection

  - '/api/currencies' refers to the whole currency collection

  - '/api/messages' refers to the whole message collection

  - '/api/countries/[country name]' refers to a single country resource in the country collection (e.g. '/api/countries/Canada' refers to Canada in the country collection)

  - '/api/currencies/[currency code]' refers to a single currency resource in the currency collection (e.g. '/api/currencies/AUD' refers to Australian Dollar AUD in the currency collection)

  - '/api/messages/[\_id]' refers to a single message resource in the message collection (e.g. '/api/messages/5a20ef313997c26701fb5507' refers to the message with \_id = 5a20ef313997c26701fb5507 in the message collection)

- The endpoints for our currencies and messages **are** case sensitive
(i.e. ```https://mysterious-hollows-73808.herokuapp.com/api/currencies/AUD``` is valid
but ```https://mysterious-hollows-73808.herokuapp.com/api/currencies/aud``` is not valid)

- The endpoints for our countries **are not** case sensitive because of we want to make it more convenient for users to search for a country with out web app, as mentioned in the last bullet point [here](https://github.com/FallCSC309/assignment-3-teamrocket/blob/master/Solutions.md#important-notes)

- **Important!** Because the default Content-type is 'application/x-www-form-urlencoded', if you want to pass in JSON data for post and put methods, please include a header *--header "Content-Type: application/json"* to indicate that the data being passed in is JSON. If you pass in urlencoded data, then there is no header needed

- Examples for performing CRUD methods on our API:

  ### Countries

  - All methods automatically turn a country name to all upper case as we want to enforce the name attribute to be all upper case in our database(e.g. canada automatically becomes CANADA in our database)

  - GET method:
    - GET all countries example:
    ```
    curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/countries
    ```

    - GET one country example: ```curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/countries/canada```

  - PUT method:
    - PUT one country example *with JSON data* : ```curl -XPUT --data '{ "capital": "blah" }'  --header "Content-Type: application/json" https://mysterious-hollows-73808.herokuapp.com/api/countries/canada```

    - PUT one country example *with urlencoded data* : ```curl -XPUT --data "capital=blah" https://mysterious-hollows-73808.herokuapp.com/api/countries/canada```

  - POST method:
    - Users will see an error message if the data they pass in doesn't have the attribute **name**. Fields other than "name" can be undefined but "name" is a required field.

    - POST one country example *with JSON data*: ```curl -XPOST --data '{ "name": "TestDataFlag", "capital": "blah" }'  --header "Content-Type: application/json" https://mysterious-hollows-73808.herokuapp.com/api/countries```

    - POST one country example *with urlencoded data*: ```curl -XPOST --data "name=TestDataFlag&capital=blah" https://mysterious-hollows-73808.herokuapp.com/api/countries```

  - DELETE method:
    - DELETE one country example: ```curl -XDELETE https://mysterious-hollows-73808.herokuapp.com/api/countries/TestDataFlag```

  ### Currencies

  - GET method:
    - Get all currencies example: ```curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/currencies```

    - Get one currency example: ```curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/currencies/AUD```

  - PUT method:
    - Users will see an error message if the data they pass in has the attribute rate but the value of rate isn't a number

    - PUT one currency example *with JSON data*: ```curl -XPUT --data '{ "rate": 1 }'  --header "Content-Type: application/json" https://mysterious-hollows-73808.herokuapp.com/api/currencies/AUD```

    - PUT one currency example *with urlencoded data*: ```curl -XPUT --data "rate=1" https://mysterious-hollows-73808.herokuapp.com/api/currencies/AUD```

  - POST method:
    - Users will see an error message if the data they pass in doesn't have attributes **code** and **rate**, or if the value of rate isn't a number

    - POST one currency example *with JSON data*: ```curl -XPOST --data '{ "code": "KPW", "rate": 699.12 }'  --header "Content-Type: application/json" https://mysterious-hollows-73808.herokuapp.com/api/currencies```

    - POST one currency example *with urlencoded data*: ```curl -XPOST --data "code=KPW&rate=699.12" https://mysterious-hollows-73808.herokuapp.com/api/currencies```

  - DELETE method:
    - DELETE one currency example: ```curl -XDELETE https://mysterious-hollows-73808.herokuapp.com/api/currencies/KPW```

  ### Messages

  - GET method:
    - Get all messages example: ```curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/messages```

    - Get one message by \_id example: ```curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/messages/5a20ef313997c26701fb5507```

  - PUT method:
    - Put one message by \_id example: ```curl -XPUT https://mysterious-hollows-73808.herokuapp.com/api/messages/5a20ef313997c26701fb5507```
      - This put method is for updating the message's read flag attribute to
      true after the user has read the message

  - POST method:
    - POST one message example *with JSON data*: ```curl -XPOST --data '{"data":"Testing hehehehe"}' --header 'Content-Type: application/json' https://mysterious-hollows-73808.herokuapp.com/api/messages```

    - POST one message example *with urlencoded data*: ```curl -XPOST --data "data=Testing hehehehe" https://mysterious-hollows-73808.herokuapp.com/api/messages```

  - DELETE method:
    - DELETE one message by \_id example: ```curl -XDELETE https://mysterious-hollows-73808.herokuapp.com/api/messages/5a20ef313997c26701fb5507```
    - DELETE all messages example: ```curl -XDELETE https://mysterious-hollows-73808.herokuapp.com/api/messages```
