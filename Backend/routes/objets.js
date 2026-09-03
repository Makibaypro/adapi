import express from "express";
import { pool } from "./../server/db.js"

export const routerObjets = express.Router();

routerObjets.get('/', async (req,res) => {

    const { statut, categorie_id} = req.query;

    if(categorie_id !== undefined && Number.isNaN(Number(categorie_id))){
        return res.status(404).json("Error Detected : id isn't a number.");
    }
    
    if(statut !== "recycle" || "arrive" || "en_reparation" || "en_rayon" || "vendu"){
        return res.status(404).json("Error Detected : Wrong status sent.")
    }

    const { rows } = await pool.query(`
        SELECT objet.*, categorie.libelle FROM objet
        JOIN categorie ON objet.categorie_id = categorie.id
        WHERE objet.statut = COALESCE ($1::statut_objet, objet.statut)
        AND categorie_id = COALESCE ($2::INT, categorie_id)`,
        [statut ?? null, categorie_id ?? null]);

    res.status(200).json(rows);
});

routerObjets.get('/:id', async (req,res) => {
    try{
        const id = req.params.id;

        const { rows } = await pool.query(`
            SELECT objet.* FROM objet
            WHERE objet.id = $1`,
        [id])

        res.status(200).json(rows[0]);
    } catch (error) {
        console.error("Id introuvable", error);
        res.status(404).json("Wrong Id", error);
    }
})