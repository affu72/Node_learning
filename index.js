//server
/*
const http = require('http');
const server = http.createServer((req, res) => {
  res.end("hello there from web")
});

//running a server
server.listen(3000, "127.0.0.1", () => {
  console.log("server started")
})

*/

const http = require('http');
const url = require('url');

const slugify = require('slugify');

const server = http.createServer((req, res) => {
  console.log(req.url); // gives us the url, use url module to extract the param in form of object

  //creating a route
  const pathName = req.url;

  if (pathName === '/' || pathName === '/overview') {
    res.end('This is an overview');
  } else if (pathName === '/product') {
    res.end('this is a product');
  } else {
    //http : status code
    //http header is a piece of information that we send with the response
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello there',
    });
    res.end('<h1>Page not found</h1>');
  }
});

console.log(slugify('Afzal Nomani hello', { lowercase: true }));

server.listen(3000, '127.0.0.1', () => {
  console.log('<h1>server started</h1>');
  console.log('hello there how are you finer');
});

//SIMPLE API


