# Twitter Clone.

Coded in React, Redux, Typescript.
Jest and Enzyme were used for Unit and Integration testing.

## Installation

```bash
git clone http://xxx twitter-clone
cd twitter-clone
npm install
```

## Usage

### Start up the API server for testing (it will run on http://localhost:3000):

```bash
cd twitter-clone
json-server --watch db.json
```

### Start up the client (it will run on http://localhost:4000):

```bash
cd twitter-clone
npm start
open: http://localhost:4000
```

### Start Unit & Integration testing:

```bash
cd twitter-clone
npm test
```

## What was done:

Task 1.1: Create the app with Typescript and Redux: **DONE**
Task 1.2: Add API url to .env: **DONE**
Task 2.1: Implement services and actions for listing API endpoint [GET] /tweets: **DONE**
Task 2.2: Implement UI components for listing "tweets": **DONE**
Task 2.3: Write unit tests: **DONE**
Task 3.1: Implement services and actions for API endpoint [POST] /tweets: **DONE**
Task 3.2: Implement UI components for sending "tweet" with hardcoded userID:1: **DONE**
-- **NOTE**: posts are done with dynamic userId, depends on what user you are logged in with.
Task 3.3: Write unit tests: **DONE**
Task 4.1: Improve listing with pagination: **DONE**
-- **NOTE**: very rudimentary pagination implemented on a main tweets listings page / home page due to time limitations.
Task 4.2: Implement services and actions for API endpoints [PUT, DELETE] /tweets: **DONE**
Task 4.3: Implement UI components for deleting the users own "tweets": **DONE**
Task 4.4: For each "tweet" implement a button what increase a counter when clicked (like the Medium article "clap" functionality): **DONE**
Task 4.5: Write unit tests: **DONE**
Task 5.1: Implement services and actions for API endpoint [GET] /users: **DONE**
Task 5.2: Implement UI for user details page, listing the users own "tweets": **DONE**
Task 5.3: Implement statistics, tweets/day of the last 10 days: **DONE**
-- **NOTE**: On users Profile page there are additional stats for users total tweets and users total claps.
-- **NOTE**: Some tweets would have to be posted to see some data on the chart, as all the data in the API is older than 10 days.
Task 5.4: write unit tests: **DONE**

## Features:

1. App starts in a non-logged in state.
2. Available tweets are pulled from a server and displayed on pages of 10 tweets per page.
3. Clicking on "Login" button will choose a random user and log you in.
4. "Login" button is a toggle. It will log you out if you are logged in.
5. Logged in user will get an ability to:
   -- post new tweets
   -- view own profile
   -- delete own tweets
   -- view own statistics
6. "Stats" button on main navigation will show site-wide stats for last 10 days of posts per day.
7. Logged in user will be able to view his own stats via "Stats" link inside the "Profile" page.
8. Anybody can use a "clap" feature for any post.

## Notes:

1. Some things I would have liked to implement for this demo, but did not due to time limitation:
   -- Better pagination
   -- Loading component / spinner for everything (provisions for it were made when construing reducers - "loading" parameter is available)
   -- More complete test coverage. I tested all actions, reducers, some components, some integration tests. Usually I like to do a full code coverage with Unit Testing, and then full Integration Test of all parts of software.
   -- Docker'ise the application.
   -- Spend more time making CSS / Responsive design tighter. Ideally I'd use Ant Design components.
   -- Utilize CI/CD pipeline with automated building / testing / deployment on AWS with Cloud Formation.
   -- Code a proper authentication / registration functionality including OAuth 2.0 and JWT.
2. Regarding data fetching. At first I fetched the tweets from API, then each tweet as it was loading would get the user information for user that created that post. That was problematic as that was lots of over-fetching would happen, as there are multiple posts by same users. I had tom come up with the better solution to get user data. I could use "memoization", where if user was already fetched, previously fetched data would be used, so no new network request would be made. But that was not ideal, as if changes were made on users data, memoized data would still be showing. Instead I made a list of all unique users on the system and fetched those users data just once, so no over-fetching happened.
3. The app could have been written in 3 basic ways:
   -- Most popular way with Class and Functional components.
   -- More new way with using React Hooks.
   -- The latest and greatest way of using Redux Toolkit.
   Considering that most of legacy code out there uses old way of doing things, I decided to write the app using React Hooks way, to demonstrate that I am familiar with old way of doing things and will be able to support it, but at the same time I do know newer way of doing things.
4. For async actions in Redux, I chose to use redux-thunk, as it is what recommended by Redux creators themselves. The feel that thunk covers 99% of use cases and it a lot nicer / cleaner compare to redux-saga - i tend to agree. Also redux-thunk is added by default in latest Redux Toolkit.

## Author

[James La Guma](https://www.linkedin.com/in/jlaguma/)
