## Group Members:
- Student 1: Zhen Bang Liu (1002374012)
- Student 2: Yun-Yi Liu (1002063964)
- Student 3: Michael Le (1002432183)



## Important Notes
- If on local machine, app.js is our entry point (run node app.js and the url
is localhost:3964)

- If on Heroku: https://mysterious-hollows-73808.herokuapp.com

- When searching for a country, it is better to choose a country name that is
suggested by the autocompletion or make sure that you spell it correctly
because common names aren't valid inputs (ex: you need to type United States of
America instead of US, USA, America, or United States)

- Post methods allow one insert at a time

- Our API collections are Countries and Currencies **(Detailed [API documentation](https://github.com/FallCSC309/assignment-3-teamrocket/blob/master/Solutions.md#web-application-description) is written in the section after Web Application
Description)**

- When passing in JSON data for post and put methods, please indicate it with
the header **--header "Content-Type: application/json"**

- The letters in the name field in a country are upper case (CRUD methods for
country automatically change the name field to upper case for the users). This
makes our search bar not case sensitive (i.e. canada, Canada, CaNadA all work).
We believe this will allow the users to search for a country more conveniently



## Web Application Features

### Project Description

- Project Rocket is a web application that allows users to search for a country,
submit a review to share their travel experiences of that country, and read
other users' experiences (Basically like yelp but instead of writing reviews
and rating restaurants, we rate and write reviews on how good it is to travel
to a certain country)

- Users can search for a country with the search bar. Our search bar provides
autocompletion and will show a list of all countries whose country names'
contain the letters that are typed in by the users

- The rocket logo on the top left corner redirects users back to the homepage
and the login/signup buttons redirect users to the corresponding pages

- If the admin pushes some status messages, they'll show on the top left part
of our page and below the logo

- When users type in a valid country name and press Search, that country's page
will show up

  - This page includes information about that country such as country name,
  flag, capital, region, population, official languages, currency, calling
  codes, and timezones

  - It also includes a currency converter, where users can enter an amount of
  money in CAD and it will convert that amount to the respective country's
  currency if the currency is supported by our API

  - Below the country information, users can see the "Rate and Review Country"
  section where they can hover over the stars to rate their travel experience
  and submit a review for that country, given that the users are logged in

  - The "Other Reviews" section is where users can see the experiences shared
  by other users. All users can see this section no matter if they are logged
  in or not

- The users get redirected to an error page if some invalid input was entered
in the search bar



### Session Management

- If users aren't logged in, they can only view other people's review but won't
be able to submit their own review

- When users are logged in, the buttons on the top right corner change from
login/signup to profile/logout

  - Clicking on the Profile button redirects users to their profile page where
  they can change their user name and see the reviews that they submitted

  - Clicking on the Logout button logs the users out of the system

- The profile page contains data that belongs to a specific user, meaning that
each user should see his/her own data on the page. On the profile page, users
are able to:

  - See the reviews that they have submitted
  - Change their username

- When users submit some reviews, their usernames will show underneath the
reviews that they submitted (i.e. A logged in user with a username Alice would
see "Reviewed by Alice" after submitting a review. If another logged in user
with a username Bob submits a review at the same time, he would see "Reviewed
by Bob" underneath his review)



### Status Messages

- Changes will show when users click on anywhere (that is not a clickable
button) on the page and we assume a message has been read by the user once it
shows up on the page

- If users have read all the messages, nothing will show on the top left corner
since we only want to show the messages that haven't been read yet

- If there are messages that users haven't read yet, the messages will show on
the top left corner one at a time. The next message will show as soon as users
click on anywhere on the page. Otherwise, the message will fade after 5 seconds
and the next message will wait until the users click on the page

- For testing status messages:

  - Run curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/messages
  to check all the messages

  - Only the ones that haven't been read will show on the page, one at a time

  - Run curl -XPOST --data "data=blah" https://mysterious-hollows-73808.herokuapp.com/api/messages

  - If you run curl -XGET before clicking anywhere on the page, you should see
  that the read attribute of the message you just posted is false

  - Click anywhere on the page and the message will show up

  - Run get again and you should see that the read attribute is now true



## RESTful API Documentation (Not done yet)
- We have two collections in our API, Countries and Currencies.

### Countries
- The endpoints for our country API **aren't** case sensitive

- All methods automatically turn a country name to all upper case (TestDataFlag into TESTDATAFLAG)


- GET method:
  - GET countries example: curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/countries

  - GET one country example: curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/countries/canada


- PUT method:
  - PUT country example *with JSON data* : curl -XPUT --data '{ "capital": "blah" }'  --header "Content-Type: application/json" https://mysterious-hollows-73808.herokuapp.com/api/countries/canada

  - PUT country example *with urlencoded data* : curl -XPUT --data "capital=blah" https://mysterious-hollows-73808.herokuapp.com/api/countries/canada


- POST method:
  - Users will see an error message if the data they pass in doesn't have the attribute **name**. Fields other than "name" can be undefined but "name" is a required field.

  - POST country example *with JSON data*: curl -XPOST --data '{ "name": "TestDataFlag", "capital": "blah" }'  --header "Content-Type: application/json" https://mysterious-hollows-73808.herokuapp.com/api/countries

  - POST country example *with urlencoded data*: curl -XPOST --data "name=TestDataFlag&capital=blah" https://mysterious-hollows-73808.herokuapp.com/api/countries


- DELETE method:
  - DELETE country example: curl -XDELETE https://mysterious-hollows-73808.herokuapp.com/api/countries/TestDataFlag



### Currencies
- The endpoints for our currency API **are** case sensitive

- GET method:
  - Get currencies example: curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/currencies

  - Get one currency example: curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/currencies/AUD


- PUT method:
  - Users will see an error message if the data they pass in has the attribute rate but the value of rate isn't a number

  - PUT currency example *with JSON data*: curl -XPUT --data '{ "rate": 1 }'  --header "Content-Type: application/json" https://mysterious-hollows-73808.herokuapp.com/api/currencies/AUD

  - PUT currency example *with urlencoded data*: curl -XPUT --data "rate=1" https://mysterious-hollows-73808.herokuapp.com/api/currencies/AUD


- POST method:
  - Users will see an error message if the data they pass in doesn't have attributes **code** and **rate**, or if the value of rate isn't a number

  - POST currency example *with JSON data*: curl -XPOST --data '{ "code": "KPW", "rate": 699.12 }'  --header "Content-Type: application/json" https://mysterious-hollows-73808.herokuapp.com/api/currencies

  - POST currency example *with urlencoded data*: curl -XPOST --data "code=KPW&rate=699.12" https://mysterious-hollows-73808.herokuapp.com/api/currencies


- DELETE method:
  - DELETE currency example: curl -XDELETE https://mysterious-hollows-73808.herokuapp.com/api/currencies/KPW



### Messages
- GET method:
  - Get messages example: curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/messages

  - Get one message example: curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/messages/5a20ef313997c26701fb5507

- POST method:
  - POST message example *with JSON data*: curl -XPOST --data '{"data":"Testing hehehehe"}' --header 'Content-Type: application/json' https://mysterious-hollows-73808.herokuapp.com/api/messages

  - POST message example *with urlencoded data*: curl -XPOST --data "data=Testing hehehehe" https://mysterious-hollows-73808.herokuapp.com/api/messages

- DELETE method:
  - DELETE message example: curl -XDELETE https://mysterious-hollows-73808.herokuapp.com/api/messages/5a20ef313997c26701fb5507
