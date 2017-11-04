// This will be our application entry. We'll setup our server here.
const http = require('http');
const app = require('../app'); // The express app we just created
const db = require('../db');
const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);
const server = http.createServer(app);

server.listen(port, function() {
  db
    .sync({force: false})
    .then((message) => {
      console.log('...and db is synced!');
    })
    .catch(function(err) {
      throw err;
    });
});
