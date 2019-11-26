
# A simple React app deployed via Heroku.

## Editing the Source Code with Git (Basics)
It is VERY important you understand how this section works before moving on. This ensures we do not accidentally introduce bugs into each other's codes, and that we are all working from a synced master.
The following is the #1 rule to keep in mind:
**NEVER PUSH CHANGES TO MASTER UNLESS YOUR CHANGES HAVE BEEN CODE REVIEWED.**
This will make more sense as we follow along in this section.
#### 1. Cloning the Repository (getting the working source code on your local machine)
We always clone from master when creating a local repository. This is because master has the latest, working changes at all times. 
To clone the master branch to your local machine, enter the following into the command line:
`git clone https://github.com/rghosh96/react-proj.git`
Now check where you cloned this into on your local machine. You should see the react-proj folder!
#### 2. Creating a Local Branch (for you to work on and make changes to)
You will NOT be making changes to the master branch. From here, you will be creating your OWN personal branch to test your changes with. To do this, go into the project file you just cloned to your local machine. Now, type:
`git branch <branch-name>`
You have now created your own branch locally! Switch to that branch by typing in:
`git checkout <branch-name>`
And you are now successfully inside of your own branch! You are now free to make changes to the source code. Go ham!
#### 3. Pushing Local Changes to GitHub (to save your local changes to the online GitHub)
So your code looks good, and you want to push it to GitHub so everyone else can clone it and test it and run it. How do we do this?
If you are pushing your local branch to GitHub for the **first time**,  type the following:
`git push --set-upstream origin <branch-name>`
This puts your whole local branch on GitHub. Go to the online repo and select the drop down next to branches. You will see your branch now!
Say you make some more edits to your branch. Now all you have to do is simply type, 
`git push origin <branch-name>`

**DO NOT PROCEED TO THE NEXT STEP UNLESS YOUR CODE HAS BEEN CODE REVIEWED! TO SEE CHANGES LOCALLY, GO TO THE SECTION BELOW THIS.**
#### 4. Merging to Master (to deploy changes)
NOW for what we have all been waiting for. Pushing to master, and seeing our changes on the server! STOP and make sure your code has been code reviewed! If you push changes to master without your changes being checked, it could cause our app to crash!!! And there will be anger.
So! Your changes on your local branch are all good. You have pushed your branch to the online repo, everyone else has cloned and tested it, and it passed. Now we can merge it to master via the following commands:
First, switch to the master branch
`git checkout master`
Now let's update master and make sure it is up to date with the remote master on GitHub:
`git pull master`
Next, we merge changes from our local branch into master:
`git merge <local-branch-name>`
Finally, push it to the remote repo! And the app automatically deploys!
`git push origin master`
And boom! :D See your successfully deployed changes [here!](https://quiet-shore-79782.herokuapp.com/)

## Making Changes & Testing Locally with Heroku
1. Clone the repository from [GitHub](https://github.com/rghosh96/react-proj) onto your local machine.
2. Cd into the directory.
3. Make the desired changes.
4. Log in to heroku via the command: 
`heroku login`
5. Changes can be tested in two ways:
    * __Npm__: run the following commands in order to test it completely locally via your localhost:3000 port:  
  `npm install`     in order to install all dependencies for the app  
  `npm start`       the command line will open the app running locally in your default browser
    * __Heroku local__:  run the following commands in order to ensure Heroku can properly deploy it:  
  `npm install`     in order to install all dependencies for the app  
  `heroku local` in order to run the app locally via Heroku  
      * To exit from either, simply type `Ctrl + C`
      * Note: In order to pass code review for front end changes, code changes **must** pass the above two tests.










