import express from "express";
import { LogHandler } from "./logger/logger.ts";
import { getTitle, getTitleList } from "./API/controller.ts";



const PAGE_SIZE : number = 10;

const app = express();
app.use(express.json());


app.use(LogHandler);


app.get("/api/titles", async (req,res) => {
    const data = await getTitle(req.body.title);
    res.status(200).json ( data );

    return;
})

app.get("/api/list", async (req, res) => {
    let page = Number(req.query.page);
    let start : number = (page - 1)*10;
    let end : number = start + PAGE_SIZE;
    let data = getTitleList(start, end);
    
    res.status(200).json ( data );

    return;
})



app.listen(3000, () => {
    console.log("Listening on port 3000");
})



// getTitle("Zootopia")
//     .then(val => console.log(val))
//     .catch(err => console.error(err));


// getTitleList()
//     .then(() => console.log(MOVIE_ARRAY[0]))
//     .catch(err => console.error(err)); 