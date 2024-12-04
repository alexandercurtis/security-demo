const {getBackers, addBacker, checkLogin} = require('./db');

function handle( uri, body, response ) {

  if( uri === '/api/login' ) {
    checkLogin( body.name, body.password )
      .then( (success) => {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify({success}));
        response.end();
      });
  }

  else if( uri === '/api/signup' ) {
    addBacker( body.name, body.message )
      .then( (number) => {
        response.writeHead(200, {"Content-Type": "application/json"});
        response.write(JSON.stringify({number}));
        response.end();
      });
  }

  else if( uri === '/api/backers' ) {
    getBackers().then( backers => {
      response.writeHead(200, {"Content-Type": "application/json"});
      response.write(JSON.stringify(backers));
      response.end();
    });
  }

  else {
    response.writeHead(404, {"Content-Type": "text/plain"});
    response.write('Not found');
    response.end();
  }
}


module.exports = handle;

