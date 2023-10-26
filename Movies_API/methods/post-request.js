const requestBodyParser=require('../utils/body-parser')
const writeFile=require('../utils/write-data');

module.exports=async (req,res)=>{
    if(req.url==='/api/movies/'){
        try {
            let body=await requestBodyParser(req)
            await req.movies.push(body);
            await writeFile(req.movies);
            res.writeHead(201,{"Content-Type":"application/json"});
            res.write(JSON.stringify({message:"updated sucessfully"}))
            res.end();
        } catch (error) {
            console.log(error);
        }
    }
    res.end();
};
