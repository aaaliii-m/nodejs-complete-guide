const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {

    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>');
        res.write('<head><title>User Input</title></head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message" placeholder="Enter your message" /><button type="submit">Submit</button></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === 'POST') {

        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });

        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            console.log(parsedBody);
            const message = parsedBody.split('=')[1];
            fs.writeFileSync('./message.txt', message);
        })

        res.statusCode = 302;
        res.setHeader('location', '/');
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>Response Content</title></head>');
    res.write('<body><h1>Congratulations, You Won!</h1></body>');
    res.write('</html>');
    res.end();
});

server.listen(3000);