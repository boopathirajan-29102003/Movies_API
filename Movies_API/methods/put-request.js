const requestBodyParser = require('../utils/body-parser');
const writeFile = require('../utils/write-data');


module.exports = async (req, res) => {

    let baseurl = req.url.substring(0, req.url.lastIndexOf('/'));
    let id = req.url.split('/')[3];
    console.log(baseurl+" "+id)
    if (baseurl === "/api/movies" && id) {
        try {
            let index = req.movies.findIndex((movie) => {
                return movie.id == id;
            });
            let body = await requestBodyParser(req);
            req.movies[index]={id,...body};
            res.writeHead(200,{"Content-type":"application/json"});
            await writeFile(req.movies);
            res.write(JSON.stringify({ message: "Succesfully updated" }));
            res.end();
        } catch (error) {
            res.statusCode = 200;
            res.write(JSON.stringify({ message: "movie not found" }));
            res.end();
        }
        
    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "page NOT found", name: "Boopathi" }));
        res.end();
    }
};
