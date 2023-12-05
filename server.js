'use strict'

import express from 'express';
import cors from 'cors';
import pg from 'pg';
import dotenv from 'dotenv';

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

app.post('/login', async (req, res, next) => {
    const {username, password} = req.body;
    try {
        const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
            if (result.rows.length === 1){
                const user = result.rows[0];
                if (password === user.password){
                    res.status(200).json(result.rows)
                } else {
                    res.status(401).json({message: 'Authentication Failed'})
                }
            } else {
                res.status(404).json({ message: 'User Not Found'})
            }
        }catch(err){
        next(err)
    }
})

app.use((error, req, res, next) => {
    res.type('text/plain');
    res.status(error.status || 500).json({error: error.message})
})

const PORT = process.env.PORT
app.listen(PORT, (req, res) => {
    console.log(`Listening on Port: ${PORT}`)
})