# Phonica Server

This is the Node/express server for the Phonica Flashcard app. So far it does nothing. I am just setting up the seed data and trying to associate phonemes to graphemes. 

The phoneme &#230; as in apple has a grapheme a.

&#601;&#650; has - oa, ow or o (goat, show, no)

In this case I want to create the data for the DB with associations. I can look up a phoneme (sound) and list its 1 or more graphemes. We don't actually use the 	&#601;&#650; characters but I want them for the teachers, as some phonemes are tricky to identify written with normal letters. Like 'th'. 'Thick'(&#952;) and 'The'(&#240;)

These are the graphemes

![graphemes](http://jollylearning.co.uk/wordpress/images/LetterSounds.gif)
## Install
`git clone git@github.com:leonormes/phonica-server.git`

cd into `phonica-server` dir.

You will need to edit the `server/config/config.json` file to point to a local DB. Mine is set up to use env variables as it points to a heroku postgres DB.

`npm i` 

to install dependencies.

## DB

Postgresql to create a DB

`createdb phonics`

Make sure you have sequelize CLI installed.

`npm install -g sequelize-cli`

Sequelize deals with the DB. 

Actually you don't need to run the migrations as I have a `db.sync()` method when the server starts that will make
the tables from the models when you start the server.

`npm run start:dev`

Will create the tables

then run

 `node seed.js`

This should run a script to add stuff to the database. At the moment it just adds Graphemes. 

## Test API

In postman 

`get http://localhost:8000/graphemes`

and you should see an object of all the graphemes in the db returned.
## Technology used

- Node with Express
- Postgres
- Sequelize
- Heroku
