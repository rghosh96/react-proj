# A simple React app deployed via Heroku.

### How to make local changes & test locally:
1. Clone the repository from [GitHub](https://github.com/rghosh96/react-proj) onto your local machine.
2. Cd into the directory.
3. Make the desired changes.
3. Log in to heroku via the command: 
`heroku login`
5. Changes can be tested in two ways:
  * __Npm__: run the following commands in order to test it completely locally via your localhost:3000 port:
  `npm install`     in order to install all dependencies for the app
  `npm start`       the command line will open the app running locally in your default browser
  * __Heroku loca__l:  run the following commands in order to ensure Heroku can properly deploy it:  
  `npm install`     in order to install all dependencies for the app  
  `heroku local` in order to run the app locally via Heroku  
    * To exit from either, simply type `Ctrl + C`
    * Note: In order to pass code review for front end changes, code changes **must** pass the above two tests.



### How to deploy changes made to the app:
1. Clone the repository from [GitHub](https://github.com/rghosh96/react-proj) onto your local machine.
2. Cd into the directory.
3. Log in to heroku via the command: 
`heroku login`
3. After the desired changes are made, (previous step)
  * **DO NOT** proceed until you have done so and the changes have been tested and ran by all other members!
4. Merge changes to master (Must pass code review in order to proceed with this step).
5. Now a remote heroku master branch must be created locally in order to prepare Heroku to receive the source code via the command `heroku git:remote -a quiet-shore-79782`
6. Now you can deploy it!
`git push heroku master`
7. And boom! :D See your successfully deployed changes [here!](https://quiet-shore-79782.herokuapp.com/)






