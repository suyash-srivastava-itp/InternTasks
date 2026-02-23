import express from "express";
import { LogHandler } from "./logger/logger.ts";
import { getTitle, getTitleList } from "./API/controller.ts";
import cors from "cors";



const PAGE_SIZE: number = 10;

const app = express();
app.use(express.json());

app.use(LogHandler);

app.use(cors());

app.post("/api/titles", async (req, res) => {
  const data = await getTitle(req.body.title);
  res.status(200).json(data);

  return;
});

app.get("/api/list", async (req, res) => {
    let data;
  let page = Number(req.query.page);
  if (page) {
    let start: number = (page - 1) * 10;
    let end: number = start + PAGE_SIZE;

    data = await getTitleList(start, end);
  }
  else {
    data = await getTitleList();
  }
  res.status(200).json(data);

  return;
});

app.listen(3000, () => {
  console.log("Listening on port 3000");
});

// getTitle("Zootopia")
//     .then(val => console.log(val))
//     .catch(err => console.error(err));

// getTitleList()
//     .then(() => console.log(MOVIE_ARRAY[0]))
//     .catch(err => console.error(err));
