const http = require('http')

const getReq=require('./methods/get-request')
const postReq=require('./methods/post-request')
const putReq=require('./methods/put-request')
const deleteReq=require('./methods/delete-request')

let movies=require('./movies.json')
require("dotenv").config();

const PORT = process.env.PORT || 3600;

const server = http.createServer((req, res) => {
    req.movies=movies;
    switch (req.method) {
        case "GET":
            getReq(req, res);
            break;
        case "POST":
            postReq(req, res);
            break;
        case "PUT":
            putReq(req, res);
            break;
        case "DELETE":
            deleteReq(req, res);
            break;
        default:
            res.statusCode = 404;
            res.setHeader("Content-Type", "application/json");
            res.write(JSON.stringify({ message: "page NOT found", name: "Boopathi" }));
            res.end()
    }

});

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})