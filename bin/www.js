const http = require('http');
const app = require('../app');
const port = parseInt(process.env.PORT, 10) || 8000;
const db = require('../db');

// console.log('flashcard protoype:', db.flashcards.prototype);
app.set('port', port);
const server = http.createServer(app);
server.listen(port, function() {
  // db.sequelize
  //   .sync({force: false})
  //   .then((message) => {
  //     console.log('...and db is synced!');
  //   })
  //   .catch(function(err) {
  //     throw err;
  //   });
});
