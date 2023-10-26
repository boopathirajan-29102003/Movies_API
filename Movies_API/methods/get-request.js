module.exports = (req, res) => {
    let baseurl = req.url.substring(0, req.url.lastIndexOf('/'));
    let id = req.url.split('/')[3];
    console.log(baseurl + " " + id)
    if (req.url === '/api/movies') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.write(JSON.stringify(req.movies));
        res.end();
    }
    else if (baseurl === "/api/movies" && id) {
        
        res.setHeader("Content-Type", "application/json");
        let filterMovies = req.movies.filter((movie) => {
            return movie.id == id;
        });
        if (filterMovies.length>0) {
            res.statusCode = 200;
            res.write(JSON.stringify(filterMovies));
        }
        else {
            res.statusCode = 200;
            res.write(JSON.stringify({ message: "movie not found" }));
        }
        res.end();

    }
    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.write(JSON.stringify({ message: "page NOT found", name: "Boopathi" }));
        res.end();
    }
};