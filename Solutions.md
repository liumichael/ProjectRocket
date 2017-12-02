## Group Members:
- Student 1: Zhen Bang Liu (1002374012)
- Student 2: Yun-Yi Liu (1002063964)
- Student 3: Michael Le (1002432183)
- Student 4: Amna Mahder Bashi (999552345)

## Important Notes (Design choices, Cool features, etc)
- If on local machine, app.js is our entry point (run node app.js and the url is localhost:3964)
- If on Heroku: https://mysterious-hollows-73808.herokuapp.com
- Our search bar provides autocompletion
- When searching for a country, it is better to choose a country name that is suggested by the autocompletion because common names won't work (ex: you need to type United States of America instead of US, USA, America, or United States)
- Post methods allow one insert at a time
- Our API collections: Countries and Currencies **(Detailed [API documentation](https://github.com/FallCSC309/assignment-3-teamrocket/blob/master/Solutions.md#web-application-description) is written in the section after Web Application Description)**
- For post and put, have to include **--header "Content-Type: application/json"**
- The name field in a country is stored as all upper case (CRUD methods for country automatically change the name field to upper case for the users).

## Web Application Description

Project Rocket is a web application that allows users to search for a country, submit a review to share their travelling experiences of that country, and read other user’s experiences.

When the application is first opened, users are directed to the homepage. Here they can type a country in the search bar (with auto complete) and information of the country will show up. This information includes the country name, flag, capital, region, population, official languages, currency, calling code, and time zones. It also includes a currency converter, where a user can enter a number and it will convert CAD to the respective country's currency. If users misspell a country or type in a country that doesn’t exist, an error page will show up. Below the country information, users can see the "Rate and Review Country" section where they can hover over the stars to rate their travel experience and write a review for that country. If users wish to go back to the homepage, they can click on the logo on the top left corner.

[New features to be updated here]

## RESTful API Documentation

#### Countries
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



#### Currencies
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



#### Messages
- GET method:
  - Get messages example: curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/messages

  - Get one message example: curl -XGET https://mysterious-hollows-73808.herokuapp.com/api/messages/5a20ef313997c26701fb5507

- POST method:
  - POST message example *with JSON data*: curl -XPOST --data '{"data":"Testing hehehehe"}' --header 'Content-Type: application/json' https://mysterious-hollows-73808.herokuapp.com/api/messages

  - POST message example *with urlencoded data*: curl -XPOST --data "data=Testing hehehehe" https://mysterious-hollows-73808.herokuapp.com/api/messages

- DELETE method:
  - DELETE message example: curl -XDELETE https://mysterious-hollows-73808.herokuapp.com/api/messages/5a20ef313997c26701fb5507



### TODO:
- **Figure the most important part of our web app: Submitting/Updating actual REVIEWS**
- Demonstrate some sort of session management
- Implement the <del>front</del> and back end for Sign Up and Log in (session management) **(Front end done. Need to work with the database for login-signup.js to work)**
- <del>Database</del>
- Work with the database to actually push the status messages to the page. Only display a msg that hasn't been read yet. Display only 1 msg at a time.
- Document the API (clear and concise, demonstrate understanding of RESTful design)
- <del>Implement a RESTful API that allows individual users to perform the 4 basic REST operations (even if the original API doesn't allow those operations)</del>
- <del>The API also needs to have 3 endpoints GET /api/messages, POST /api/messages, DELETE /api/messages/1234 so admin can push status messages to all users </del>
- Display the reviews in "Other Reviews" in pages (only do this if we have time)
- <del>Implement the things mentioned in the feedback</del>
