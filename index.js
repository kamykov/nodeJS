const fs = require('fs');
const http = require('http');

const PORT = 8080;

function reqListener (req, res) {

    const {url, method, } = req;

    if(url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html>')
        res.write('<head><title>NodeJS Sample</title></head>')
        res.write('<body><h1>ELO FOLKS!</h1><form action="/message" method="POST"><input name="message" /><input type="submit" value="Submit"></form></body>');
        res.write('</html>');
        return res.end();
    }

    if (url === '/message' && method === "POST") {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk);

        })
        return req.on('end', ()=> {
            const parseBody = Buffer.concat(body).toString();
            const message = parseBody.split('=')[1];
            console.log(parseBody);
            fs.writeFile('message.txt', message, (err) => {
                res.statusCode = 302;
                res.setHeader('Location', '/');
                return res.end();
            });
        })
    }

    res.setHeader('Content-Type', 'text/html');
    res.write('<html>')
    res.write('<head><title>NodeJS Sample</title></head>')
    res.write('<body><h1>Message send!</h1></body>')
    res.write('</html>');
    res.end();
}

const server = http.createServer(reqListener);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))