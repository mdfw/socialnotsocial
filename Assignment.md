# Project Requirements

Your highest level requirement is to build a full stack JavaScript app that does something users find valuable.

Here are some specific requirements:

## Server
* use Node/Express
  * use a db
  * must have RESTful API and/or Socket.io layer
  * serve static assets
  * comprehensive testing
  * high code quality. Amongst other things, that means choosing good variable names, writing functions that have a single responsibility, and consistently following a style guide.
  * well architected
  
## Client
  * polished UI
  * responsive
  * follows accessibility best practices (for instance, all inputs wrapped in forms, all inputs have labels. For a quick view of how well your app supports accesibility, the free Wave web accesibility evaluation is a good start.
  * bundled and optimized for delivery
  * comprehensive testing
  * high code quality.
  * well architected
  * cross browser tested, with support for current version of popular browsers.
  
**Comprehensive README.md** Before you consider this project complete, make sure you create an in depth README file, on par with former Thinkful student Jon Wade’s [README.md](https://github.com/jon-wade/pw-vault)

---

## Design Your App
Spend up to two hours deciding on an app idea and defining the user stories you plan to support in your MVP. Err towards descoping. You should aim to generate a small number (~3) user stories that your MVP will support.

Come up with a name for your app. Write out a one sentence description of its purpose. Write out your user stories. Put all of this in a gist, and share a link below to notify your mentor.

---

## Implement your mvp

Your goal is to get a minimal version of your app out the door as quickly as possible so you can get a round of feedback and iterate, before focusing on styling your app.

Here's some friendly advice:

* **CI and Deployment** Set up continuous integration right away, and have tests automatically run each time you push to GitHub
* **Git and GitHub** Develop on a feature branch, and when you're ready to deploy to your production environment, do a pull request from your feature branch into master, triggering an automatic deploy from Travis CI (assuming your tests pass). Be diligent in committing your work. You'll definitely want to have distinct commits each time you fully implement support for a user story. You'll probably want even more granular commits.
* Each time you write code that fulfills serves the user story, you've met an important develop milestone. Your MVP is done when all the user stories have been supported (or else descoped).
* **Create your client with mock data before creating your API**. This is the process we covered in the Node capstone lesson. Remember that this process forces you to define your API resources and the schema for the data they return as you code up your front end.
* **Be smart about unit testing** This goes for both server and client side code. As you complete a feature or support a user story, that's the moment you should write tests. Strive for comprehensive test coverage for both server- and client-side code. At a minimum, that means testing routes, components, actions, and reducers.

---

## Gather User Feedback and Iterate

Now that your MVP is live, it's time to get user feedback. The sorts of things you're going to want to find out about are:

* Do my users think the app is interesting or valuable?
* Did my users use the app as I intended?
* Did my users encounter any bugs or broken features?
* Did my users understand how to use the app?
* Get feedback from real life people who are not you and your mentor. Then, based on what you learn, do a round of iteration on your MVP to address any issues that came up.

Finally, write down your findings from your user feedback and what, if anything, you did about it. Copy this text into a gist, and share a link with your mentor by submitting below.

---

## Style Your App

In this final iteration, it's up to you to create a compelling, polished experience for your user.

Use stylistic flourishes when they contribute to the overall experience, but don't let styling get in the way of readability.

Remember that your app must be responsive, so use media queries to optimize the experience for different screen widths.

--- 

## Documentation and Cleanup

Do a final round of cleanup on your code. Remove unused code, check for forgotten debugger statements, and add comments or doc strings where appropriate.

Create a comprehensive README.md. At a minimum, this file should contain:

* The name of your app at the top of the file
* Documentation of your API.
* Screenshot(s) of your app. This makes your app description much easier to understand.
* A summary section. This should have a concise explanation of what your app does. Try to frame this from the standpoint of what the user does, or what the app enables for the user.
* A section on the technology used.
Submit a link to your repo below when you've completed this step.