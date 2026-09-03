import express from "express";
import { pool } from "./../server/db.js"

export const routerPersonnes = express.Router();

routerPersonnes.post('/', async (req,res) => {
    try {
        const { id, nom, prenom, telephone, adherente } = req.body;

        if(!nom){
            
        }

        if(!prenom){

        }

        const { rows } = await pool.query(`
            INSERT INTO personne (id, nom, prenom, telephone, adherente)
            VALUES ($1, $2, $3, $4, $5::boolean)
            RETURNING *`,
        [id, nom, prenom, telephone, adherente]);

        res.status(201).json(rows[0]);
    } catch (error){
        console.error("Dommage", error);
        res.status(500).json(error);
    }
});



