const http = require("http");
const url = require("url");
const path = require("path");
const fs = require("fs");
const handle = require("./api");
const port = 8000;

function respond404(response) {
  response.writeHead(404, {"Content-Type": "text/plain"});
  response.write("404 Not Found\n");
  response.end();
}

http.createServer(function(request, response) {

  const uri = url.parse(request.url).pathname;

  if( uri.startsWith('/api') ) {
    if( request.method === 'GET' ) {
        handle(uri, '', response);
    }
    else {
      let body = '';
      request.on('data', (chunk) => {
        body += chunk;
      });
      request.on('end', () => {
        handle(uri, JSON.parse(body), response);
      });
    }
  }

  else {
    let filename = path.join(process.cwd(), 'public', uri);

    fs.exists(filename, function(exists) {
      if(!exists) {
        respond404(response);
        return;
      }

      if (fs.statSync(filename).isDirectory()) filename += '/index.html';

      fs.readFile(filename, "binary", function(err, file) {
        if(err) {
          response.writeHead(500, {"Content-Type": "text/plain"});
          response.write(err + "\n");
          response.end();
          return;
        }

        response.writeHead(200);
        response.write(file, "binary");
        response.end();
      });
    });
  }
}).listen(port);

console.log('Listening on port',port);

