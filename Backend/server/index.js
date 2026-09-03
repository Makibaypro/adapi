import express from "express";
import cors from "cors";
import { routerCategories } from "./../routes/categories.js";
import { routerDepots } from "./../routes/depots.js";
import { routerObjets } from "./../routes/objets.js";
import { routerPersonnes } from "./../routes/personnes.js";
import { routerStats } from "./../routes/stats.js";

const app = express();

app.use(cors({
  // origin: 'http://localhost:5473',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

// app.use(err,req,resizeBy, next)

app.use(express.json());
app.use(`/categories`, routerCategories);
app.use(`/depots`, routerDepots);
app.use(`/objets`, routerObjets);
app.use(`/personnes`, routerPersonnes);
app.use(`/stats`, routerStats);

app.listen(3000, () => {
    console.log("Server Up : http://localhost:3000");
});

