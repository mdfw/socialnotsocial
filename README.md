# App: Social not social
## Description
Private blogging site where users can post a status message and then send it to Facebook and or to multiple email addresses at the same time.

## Features
* React(ES6) & Redux based SPA application
* Express on node backend
* API server as a separate node process proxied from main server
* PostgreSQL database for core storage
* Sequelizejs for PostgreSQL ORM
* Salted bcrypt and peppered AES256 encrypted passwords
* Redis for session storage
* Material-UI use for some UI, custom fields for others
* Production configuration for webpack to reduce build sizes
* chai & mocha based tests

### Previous features
* PassportJS (before 245623b0232d62e601508103040d811d112a7fb2) - why I switched from Passport
* MongoDB and Mongooes (before dabaad5748b607d3e04b90acb8b2e4d23d8317ff) - why I switched from Mongo

## Screen shots
*Welcome Page*

![Welcome](https://github.com/mdfw/socialnotsocial/blob/master/readme/social_not_social_about_top.png "Welcome Page")
![Welcome middle text](https://github.com/mdfw/socialnotsocial/blob/master/readme/social_not_social_about_mid.png "Welcome Page - middle")

*Login*

![Login](https://github.com/mdfw/socialnotsocial/blob/master/readme/social_not_social_login.png "Login")

*Initial share page with no posts*

![Create post](https://github.com/mdfw/socialnotsocial/blob/master/readme/social_not_social_top.png "Create post area")

*Share page with a post*

![Share with posts](https://github.com/mdfw/socialnotsocial/blob/master/readme/social_not_social_share.png "Share page with a post")


## User Stories - implemented
* As a user, I should be able to create an account.
* As a user, I should be able to post a message to share.
* As a user, I should be able to configure recipients to send messages to.
* As a user, I should be able to add multiple email addresses to my 'send to' bucket

### Future
* As a user, I should be able to configure Facebook.
* As a user, I should be able to post a status update with one picture.
* As a user, I should be able to post that status update to Facebook and email addresses.


## Initial interface sketches

*Login*

![LoginSketch](https://github.com/mdfw/socialnotsocial/blob/master/readme/designSketchLogin.png "Login")

*Register*

![RegisterSketch](https://github.com/mdfw/socialnotsocial/blob/master/readme/designSketchRegister.png "Register")

*Share page with posts*

![ShareSketch](https://github.com/mdfw/socialnotsocial/blob/master/readme/designSketchPost.png "Share")