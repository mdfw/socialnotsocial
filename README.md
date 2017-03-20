# Social, not Social
Share your joy

## Description
Private blogging site where users can post a status message and then send it to Facebook and or to multiple email addresses.

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
* less -> css

### Previous features
* PassportJS (before 245623b0232d62e601508103040d811d112a7fb2) - [why I switched from Passport] (readme/why_not_passport.md)
* MongoDB and Mongooes (before dabaad5748b607d3e04b90acb8b2e4d23d8317ff) - [why I switched from Mongo](readme/why_not_mongodb_and_mongoose.md)

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


## Acknowledgments
* Children Jumping by Jon Grainger (https://flic.kr/p/oE1tQH) under CC BY 2.0
* Frustration by Jason Bolonski (https://flic.kr/p/bvH8Dv) under CC BY 2.0
* FUN by yeskefo (https://flic.kr/p/enqCB9) under CC BY-SA 2.0
* Bubble reflection by Isabelle Acatauassú Alves Almeida (https://flic.kr/p/oeDX8v) under CC BY 2.0
* Dandelion by Alice Noir from the Noun Project (https://thenounproject.com/term/dandelion/641025/)  under CC BY 3.0 US
* Eye Of Providence by Kev from the Noun Project (https://thenounproject.com/term/eye-of-providence/673596/) under CC BY 3.0 US
* Thumbs Up by John T. Garcia from the Noun Project (https://thenounproject.com/term/thumbs-up/158118/) under CC BY 3.0 US
