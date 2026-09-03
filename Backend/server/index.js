import express from "express";
import cors from "cors";
import { routerCategorie } from "./routes/categorie.js";
import { routerDepot } from "./routes/depots.js";
import { routerObjets } from "./routes/objets.js";
import { routerPersonnes } from "./routes/personnes.js";
import { routerStats } from "./routes/stats.js";

const app = express();

app.use(cors({
  // origin: 'http://localhost:5473',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use('/categorie', routerCategorie);
app.use('/depot', routerDepot);
app.use('/objets', routerObjets);
app.use('/categorie', routerPersonnes);
app.use('/categorie', routerStats);

app.listen(3000, () => {
    console.log("Server Up : http://localhost:3000");
});