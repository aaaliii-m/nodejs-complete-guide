const http = require('http');

const server = http.createServer((req, res) => {
    console.log(req);
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Response Content</title></head>');
    res.write('<body><h1>Hello, this is my first Nodejs application.</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);