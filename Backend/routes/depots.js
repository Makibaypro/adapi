import express from "express";
import { pool } from "./../server/db.js"

export const routerDepots = express.Router();

routerDepots.get('/', async (req,res) => {

})

routerDepots.get('/:id', async (req,res) => {
    try{
    const id = req.params.id;

    const { rows } = await pool.query(`
        SELECT depot.* FROM depot
        WHERE depot.id = $1`,
    [id])

    res.json(rows[0]);
    } catch (error) {
        console.error("Wrong Id", error);
        res.status(404).json("Wrond Id", error);
    }
})

routerDepots.post('/', async (req,res) => {
    try{
        const {id, date_depot, type, personne_id} = req.body;

        const { rows } = await pool.query(`
            INSERT INTO depot (id, date_depot, type, personne_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *`,
        [id, date_depot, type, personne_id]);

        res.status(201).json(rows[0]);
    } catch (error){
        console.error("Dommage", error);
        res.status(404).json("Wrong Inputs", error)
    }
})