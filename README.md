
# Welcome to Band Together!

## What is Band Together?
- Band Together is an internet forum to discuss the latest and greatest music hits
- Users can create Song Posts with their favorite jams as well as comment on other user's Song Posts

## How to Start the Dev Environment
- Create database with psql
- Add variables to `.env` file using the format of the provided `.env.example` file
- Run `npm install`
- Migrate the database:
   - Run `npx dotenv sequelize db:migrate`
- Seed the database:
  - Run `npx dotenv sequelize db:seed:all`
- Run `npm start`
- Navigate to your localhost:8080
- If you don't want to register, click the login button in the navigation bar and click on the demo user button
- Profit

## Technologies Used
- Express.js
- Node.js
- Sequelize
- CSS
- Javascript
- AJAX

## Our Site!
### https://band-together-aa.herokuapp.com/

## Our Wiki
### https://github.com/nkuek/band-together/wiki

## Gold Stars
- Notes (comment section)
   - AJAX will allow you to post `notes` without the page refreshing
   - `Edit` and `Delete` buttons will only appear if the `note` belongs to the user
   - `Update` and `Cancel` buttons will appear if you click on `Edit`
   - `notes`that are posted will appear at the top of the `Notes` section
   
## Challenges
- AJAX in general
   - We definitely struggled the most with AJAX. When we fixed one thing, another problem would seemingly appear. This required a lot of debugging and discussion to come up with solutions.
- Ensuring routes were correct
   - In the same vein as AJAX, debugging and walking through our code allowed us to pinpoint errors.
- Deploying to Heroku
   - Routes had to be updated in order to work with Heroku, which we probably would not have known without the help of our Project Manager.

## Code Highlights
https://band-together-aa.herokuapp.com/ :)
