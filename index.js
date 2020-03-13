const fs = require('fs');
const http = require('http');

const express = require('express');




const app = express();


app.use((req, res, next) => {
    console.log(" ==> z use ");
    next();
})
app.use((req, res, next) => {
    console.log(" ==> z use second ")
    res.send('<h3>Response</h3>')
})
app.use((req, res, next) => {
    console.log(" ==> z use ")
})



const routes = require('./routes')

const PORT = 8080;

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))