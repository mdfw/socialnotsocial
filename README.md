# App: Social not social
## Description
Allows a user to post a status message to facebook and send to multiple email addresses at the same time.

## Features
* React(ES6) & Redux based SPA application
* Express on node backend
* API server as a separate node process proxied from main server
* MongoDB database for accounts and posts
* Mongoose for Mongo models
* Salted bcrypt and peppered AES256 encrypted passwords
* Passportjs authentication middleware
* Redis for session storage
* Material-UI use for some UI, custom fields for others
* Production configuration for webpack to reduce build sizes
* chai & mocha based tests

## Style
* Main color: #459691
* Highlight: #c94f49
* Supporting: #4376a3
* Icon: Dandelion

## Screen shots
*Welcome Page*

![Welcome](https://github.com/mdfw/socialnotsocial/blob/master/readme/welcomePage.png "Welcome Page")

*Login*

![Login](https://github.com/mdfw/socialnotsocial/blob/master/readme/login.png "Login")

*Initial share page with no posts*

![initial](https://github.com/mdfw/socialnotsocial/blob/master/readme/IntialShare.png "Initial share page with no posts")

*Share page with a post*

![Share with posts](https://github.com/mdfw/socialnotsocial/blob/master/readme/shareWithPosts.png "Share page with a post")


## User Stories - implemented
* As a user, I should be able to create an account.
* As a user, I should be able to post a message to share.

### Future
* As a user, I should be able to configure Facebook.
* As a user, I should be able to post a status update with one picture.
* As a user, I should be able to post that status update to Facebook and email addresses.
* As a user, I should be able to add multiple email addresses to my 'send to' bucket


## Initial interface sketches

![Design sketches](https://github.com/mdfw/socialnotsocial/blob/master/readme/designsketches.pdf "Design sketches")
