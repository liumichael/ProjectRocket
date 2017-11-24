## Group Members:
- Student 1: Zhen Bang Liu (1002374012)
- Student 2: Yun-Yi Liu (1002063964)
- Student 3: Michael Le (1002432183)
- Student 4: Amna Mahder Bashi (999552345)



## Web Application Description

### Important Notes (Design choices, Cool features, etc)
- For the submit review section, you can hover over the stars to rate your experience.
- When window width is less than 576px, we chose to move the search button to the top of the input bar so it won't be covered by the autocomplete.

### Description

In Project Rocket, users can share their experiences of a country. It is a web application that allows users to search for a country, submit a review to share their experience of that country, and read other user’s experiences. The end users are those who are seeking information about a country for research, planning a trip and want to get a personal experience of a country, or wanting a place to talk about their experiences in a specific country.

When the application is first opened, users are directed to the homepage. Here they can type a country in the search bar and information of the country will show up. This information includes the country name, flag, capital, region, population, official languages, currency, calling code, and time zones. It also includes a currency converter, where a user can enter a number and it will convert CAD to the respective country's currency. If users misspell a country or type in a country that doesn’t exist, an error page will show up. Below the country information, users can see the "Rate and Review Country" section where they can hover over the stars to rate their travel experience and write a review for that country. A notification will pop up when users submit their reviews. Reviews submitted from other users are shown in the "Other Reviews" section (currently hardcoded). If users wish to go back to the homepage, they can click on the logo on the top left corner.

[New features to be updated here]



### TODO:
- **Figure the most important part of our web app: Submitting/Updating actual REVIEWS**
- Display the reviews in "Other Reviews" in pages (maybe 5 reviews per page or something)
- <del>Implement the things mentioned in the feedback</del>
- Implement the <del>front</del> and back end for Sign Up and Log in (session management) **(Front end done. Need to work with the database for login-signup.js to work)**
- Database
- Server side (things should be responsive and shown in real-time) **(All the things we need other than the database are done)**
- <del>Implement a RESTful API that allows individual users to perform the 4 basic REST operations (even if the original API doesn't allow those operations)</del> **(All the things we need other than the database are done)**
- The API also needs to have <del>3 endpoints GET /api/messages, POST /api/messages, DELETE /api/messages/1234 </del>so admin can push status messages to all users **(Endpoints and front end for pushing the status messages are done. Need to work with the database and actually push the messages to the page)**
- Document the API (clear and concise, demonstrate understanding of RESTful design)
