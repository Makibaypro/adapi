import express from "express";
import { pool } from "./../server/db.js"

export const routerCategories = express.Router();

routerCategories.get('/', async (req,res) => {
    const { rows } = await pool.query(`
        SELECT id, libelle FROM categorie`)
    res.json(rows);
});


