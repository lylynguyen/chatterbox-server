/*************************************************************

You should implement your request handler function in this file.

requestHandler is already getting passed to http.createServer()
in basic-server.js, but it won't work as is.

You'll have to figure out a way to export this function from
this file and include it in basic-server.js so that it actually works.

*Hint* Check out the node module documentation at http://nodejs.org/api/modules.html.

**************************************************************/
//var url = require('url');
var fs = require('fs');
var path = require('path');
var mime = require('mime');
var messages = {results:[{"username":"Jon",text:"Hello, this is a test","roomname":"Test Room"}]};


var requestHandler = function(request, response) {
 console.log(request.method);
  console.log("Serving request type " + request.method + " for url " + request.url);

  // var filePath = false;
  // if(request.url == '/'){
  //   filePath = 'client/index.html'; 
  // } else {
  //   filePath = 'client/' + request.url;
  // }

  // var absPath = './' + filePath;

  var statusCode = 200;
  //console.log(request.json(request.body))
  // See the note below about CORS headers.
  var headers = defaultCorsHeaders;
  headers['Content-Type'] = "text/html"
  response.writeHead(statusCode, headers);
  // Tell the client we are sending them plain text.
  
  //creating our methods to fetch our messages
  console.log(request.method);
  if(request.method === "GET"){
    response.writeHead(200, {'Content-Type': 'text/html'});
    console.log((JSON.stringify(messages)));
    response.end(JSON.stringify(messages));
  } 

  else if(request.method === "POST"){
    request.on('data', function(data){
      console.log(data)
      messages.results.push(JSON.parse(data));
      //response.end();
    });
  } else {

  };



  // You will need to change this if you are sending something
  // other than plain text, like JSON or HTML.
  // headers['Content-Type'] = mime.lookup(path.basename(filePath));

  // .writeHead() writes to the request line and headers of the response,
  // which includes the status and all headers.
  // console.log(absPath)
  // fs.exists(absPath, function(exists) {
  //   if (exists) {
  //     fs.readFile(absPath, function(error, data){
  //         response.end(data);
  //     });
  //   }
  //   else{
  //     console.log("hey")
  //     response.end();
  //   }
  // });

  // var messages = {"username": "anonymous", "text": "Hello", "roomname": "lobby"};

  // var data = {};

  // data.results.push(messages);




  // console.log(response);
  // The outgoing status.

  // Make sure to always call response.end() - Node may not send
  // anything back to the client until you do. The string you pass to
  // response.end() will be the body of the response - i.e. what shows
  // up in the browser.
  //
  // Calling .end "flushes" the response's internal buffer, forcing
  // node to actually send all the data over to the client.
  //response.end("Hello, World!");
};

// These headers will allow Cross-Origin Resource Sharing (CORS).
// This code allows this server to talk to websites that
// are on different domains, for instance, your chat client.
// Your chat client is running from a url like file://your/chat/client/index.html,
// which is considered a different domain.
//
// Another way to get around this restriction is to serve you chat
// client from this domain by setting up static file serving.
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10 // Seconds.
};

exports.requestHandler = requestHandler;