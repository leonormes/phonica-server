const http = require('http');
const app = require('../app');
const db = require('../db');
const port = parseInt(process.env.PORT, 10) || 8000;

app.set('port', port);
const server = http.createServer(app);

server.listen(port, function() {
  // db.sequelize
  //   .sync({force: true})
  //   .then((message) => {
  //     console.log('...and db is synced!');
  //   })
  //   .catch(function(err) {
  //     throw err;
  //   });
});
