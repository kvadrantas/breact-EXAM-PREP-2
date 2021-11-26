import isValid from "./js/isValid.js";


// ----------------- EXPRESS SERVER -----------------
import express, { json } from "express";
const app = express()
const port = 3003
app.listen(port, () => {
console.log(`Example app listening at http://localhost:${port}`)
})

import cors from "cors";
app.use(cors())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());


// ----------------- MY SQL CONNECT -----------------
import mysql from "mysql";

const con = mysql.createConnection({
    host: "localhost",
    user: "farm",
    password: "Laikinas1",
    database: "Ferma",
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});
// -------------------------------------------------




// GET ALL RECORDS FROM TABLE
app.get('/farm/', (req, res) => {
    const sql = `
        select * from farm
    `
    con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(results);
    });
})


// INSERT NEW RECORD IN TABLE
app.post('/farm', (req, res) => {
    const sql = `
        insert into farm
        (name, weight, total_milk, last_milking_time)
        values (?, ?, ?, ?)
    `
    if(
        isValid('txt', 'required', req.body.name) &&
        isValid('num', 'required', req.body.weight) &&
        isValid('num', 'optional', req.body.total_milk) &&
        isValid('txt', 'optional', req.body.last_milking_time.slice(0, 10))      
    ) {
        con.query(sql, [
            req.body.name, 
            req.body.weight, 
            req.body.total_milk||0, 
            req.body.last_milking_time.slice(0, 10)||'0001-01-01',           
        ], (err, results) => {
            try {
                if (err) throw err;
                res.send(results)
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err)
            }
        });
    } else console.log('BAD DATA');
})


// EDIT RECORD 
app.put('/farm/:id', (req, res) => {
    const sql = `
        UPDATE farm
        SET name = ?, weight = ?, total_milk = ?, last_milking_time = ?
        WHERE id = ?
    `;
    if(
        isValid('txt', 'required', req.body.name) &&
        isValid('num', 'required', req.body.weight) &&
        isValid('num', 'required', req.body.total_milk) &&
        isValid('txt', 'optional', req.body.last_milking_time.slice(0, 10)) &&    
        isValid('num', 'required', req.params.id)
    ) {
        con.query(sql, [
            req.body.name,
            req.body.weight,
            req.body.total_milk,
            req.body.last_milking_time.slice(0, 10),       
            req.params.id
        ], (err, results) => {
            try {
                if (err) {
                    throw err;
                }
                res.send(results);
            } catch(err) {
                console.log('THIS IS HANDLED ERROR: ', err);
            }
        }) 
    } else console.log('BAD DATA');
})


// DELETE RECORD 
app.delete('/farm/:id', (req, res) => {
    const sql = `
        DELETE FROM farm
        WHERE id = ?
        `;
    con.query(sql, [req.params.id], (err, result) => {
        try {
            if (err) {
                throw err;
            }
            res.send(result);
        } catch(err) {
            console.log('THIS IS HANDLED ERROR: ', err);
        }
    })
})
// -------------------------------------------------


// FILTER - GET DATA
app.get('/farm-filter/:t', (req, res) => {
    const sql = `
        SELECT *
        FROM farm
        WHERE weight > ?
    `;
    console.log(req.params.t);
    con.query(sql, [parseFloat(req.params.t)], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})


// SEARCH DATA
app.get('/farm-search', (req, res) => {
    const searchText = (`%${req.query.s}%`).toLowerCase();
    const sql = `
        SELECT *
        FROM farm
        where LOWER(name) like ? OR LOWER(weight) like ? OR LOWER(total_milk) like ? OR LOWER(last_milking_time) like ?
    `;
    con.query(sql, [searchText, searchText, searchText, searchText], (err, results) => {
        if (err) {
            throw err;
        }
        res.send(results);
    })
})

// STATISTICS
app.get('/statistics', (req, res) => {    
    let totalAnimal;
    let totalMilk;
    
    let sql = `
    SELECT 
    count(id) as totalAnimal,
    sum(total_milk) as totalMilk
    FROM farm;
    `;
    con.query(sql, (err, results) => {
        if (err) {
            throw err;
        }
         
            totalAnimal = results[0].totalAnimal;
            totalMilk = results[0].totalMilk;
 
        res.send({
            totalAnimal,
            totalMilk
        });
    });
})
