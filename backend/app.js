const client = require('./connection.js')
const express = require('express');
const app = express();

app.listen(3300, ()=>{
    console.log("Sever is now listening at port 3300");
})

client.connect();

app.get('/person', (req, res)=>{
    client.query(`Select * from person`, (err, result)=>{
        if(!err){
            res.send(result.rows);
        }
    });
    client.end;
})

