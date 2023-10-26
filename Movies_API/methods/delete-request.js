const writeFile=require('../utils/write-data');


module.exports= async (req,res)=>{
    let baseurl = req.url.substring(0, req.url.lastIndexOf('/'));
    let id = req.url.split('/')[3];
    console.log(baseurl + " " + id)
    
    if (baseurl === "/api/movies" && id) {
        res.statusCode=200;
        res.setHeader("Content-Type", "application/json");
        let index = req.movies.findIndex((movie) => {
            return movie.id == id;
        });
        if(index===-1){
            res.statusCode = 400;
            res.write(JSON.stringify({ message: "movie not found" }));
            res.end();
        }
        else{
            req.movies.splice(index,1);
            await writeFile(req.movies);
            console.log(req.movies)
            res.writeHead(201,({"Content-Type":"application/json"}));
            res.write(JSON.stringify({message:"Succesfully deleted"}));
            res.end();
        }
        
    }
    res.end();
};
