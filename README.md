# Poll App Backend code (React and React Router is set up already)


## Setup

- run `npm install`

- Edit `config/config.json`
    + Add your username, password, and database names

## RUN

- running the app 
    + `npm run dev`
    + on seperate terminal, `npm start`
    + app will be running on port 8000


# Features

- Local Authentication
    + user has to be logged to create a poll, vote on a poll
    + user can only modified and delete polls s/he created
    + user can vote on any polls
    
- Models Associations
    + user belongsToMany polls, a poll has only one owner
    + polls belongsToMany options, option belongs to many polls, relationship is store in join table, 'poll_option_detail'
    + votes count for each poll & option combination is store in join table, 'poll_option_detail', as extra column called 'votes'
    + user's voting history is store in join table, 'user_choice'
    
## APIs

- Rules
    + all backend routes start with '/api', e.g. localhost:8000/api/polls'
    + you have to be logged in to access most routes, e.g, post, put and delete routes
    
## GET    

- '/api/polls'
    + returns all polls with their options and poll_option_deatil included
    + the votes count for each option of this poll is nested in poll object, `poll.PollOptions.Poll_option_detail.votes`

- '/api/polls/:id'
    + returns poll #id with its options included
    
- '/api/pollOptions'
    + returns all options
    
- '/api/users/polls'
    + returns all polls created by a signed in user
    
- '/api/users/voted'
    + returns all voting history of a signed user
    
## POST

- '/api/users/signup'
    + new user sign up, (takes in email and password), one email can only be sign up once

- '/api/users/login'
    + user login

- '/api/pollOptions'
    + post a new option, (takes in option text)

- 'api/polls'
    + post a new polls, must be signed in
    + need to send in a array of option ids, the input option ids will then be associated with newly created poll
    + signed user will also become owner of this poll
    
## PUT

- '/api/polls/:id'
    + when an user vote for poll #id, use this rout update the option votes count 
    + selected option's vote count will increment by 1
    + and this voting record will also be added to the 'user-choice' table

## DELETE

- '/api/polls/:id'
    + deletes a poll, all its associated voting records will also be deleted
    

## Explanations

- `/config/config.json`
    + This file contains the credentials for connecting to your postgres database. You need to make sure these details match your DB setup.
- `/controllers`
    + This is where you should store all the logic handling URL routes and business logic for your app.
    + `index.js` is where you load up the different files
    + You can write your controller code in many styles. I've provided you two options in the `home.js` and the `alt.js` files. Pick one style and use it for all of your controllers. This is really a matter of preference.
- `/models`
    + This is where your sequelize models will go.
    + `index.js`: you **do not** have to modify this file. This file connects to the Postgres database for you, loads up all models in the folder, and sets up all associations.
- `app.js`
    + This file sets up the basic packages for our projects. Feel free to add more as you see fit.
    + This file already loads up your controllers, so no additional loading is necessary for that to work.

## Optional

- If you want to add views and handlebars to your server side
    + Uncomment the corresponding code in `app.js`
    + Add a `/views` folder and the appropriate templates
