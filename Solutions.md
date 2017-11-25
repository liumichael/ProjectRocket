## Group Members:
- Student 1: Zhen Bang Liu (1002374012)
- Student 2: Yun-Yi Liu (1002063964)
- Student 3: Michael Le (1002432183)
- Student 4: Amna Mahder Bashi (999552345)

## Important Notes (Design choices, Cool features, etc)
- If on local machine, app.js is our entry point (run node app.js and the url is localhost:3964)
- If on Heroku: https://mysterious-hollows-73808.herokuapp.com
- Note that because now we're using our own API with **https**, country search and all those stuff work only when you run our web app on Heroku (https://mysterious-hollows-73808.herokuapp.com <--You need that https there) and not locally
- Heroku git url: https://git.heroku.com/mysterious-hollows-73808.git (You probably need to sign up to Heroku first)
- Heroku Starting Guide: https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction

## Web Application Description

In Project Rocket, users can share their experiences of a country. It is a web application that allows users to search for a country, submit a review to share their experience of that country, and read other user’s experiences. The end users are those who are seeking information about a country for research, planning a trip and want to get a personal experience of a country, or wanting a place to talk about their experiences in a specific country.

When the application is first opened, users are directed to the homepage. Here they can type a country in the search bar and information of the country will show up. This information includes the country name, flag, capital, region, population, official languages, currency, calling code, and time zones. It also includes a currency converter, where a user can enter a number and it will convert CAD to the respective country's currency. If users misspell a country or type in a country that doesn’t exist, an error page will show up. Below the country information, users can see the "Rate and Review Country" section where they can hover over the stars to rate their travel experience and write a review for that country. A notification will pop up when users submit their reviews. Reviews submitted from other users are shown in the "Other Reviews" section (currently hardcoded). If users wish to go back to the homepage, they can click on the logo on the top left corner.

[New features to be updated here]

## RESTful API Documentation

[To be updated]



### TODO:
- **Figure the most important part of our web app: Submitting/Updating actual REVIEWS**
- Implement the <del>front</del> and back end for Sign Up and Log in (session management) **(Front end done. Need to work with the database for login-signup.js to work)**
- Database
- Work with the database and actually push the status messages to the page. Hide the status icon when there's no messages at all and show the icon once a messages has been pushed.
- Document the API (clear and concise, demonstrate understanding of RESTful design)
- <del>Server side (things should be responsive and shown in real-time)</del> **(All the things we need other than the database are done)**
- <del>Implement a RESTful API that allows individual users to perform the 4 basic REST operations (even if the original API doesn't allow those operations)</del> **(All the things we need other than the database are done)**
- <del>The API also needs to have 3 endpoints GET /api/messages, POST /api/messages, DELETE /api/messages/1234 so admin can push status messages to all users </del>
- Display the reviews in "Other Reviews" in pages (only do this if we have time)
- <del>Implement the things mentioned in the feedback</del>
