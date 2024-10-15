const express = require('express');
const bodyParser = require('body-parser');
const {connection} = require('./connection')

const app = express();

// Database Conection 
connection('mongodb://localhost:27017/Voting System').then(()=>{
    console.log('Data base Connection successfully');
}).catch((error)=>{
    console.error("Database Connection failed");
})
// Server Creation on the port no 5000 Local Host
app.listen(5000, ()=>{
    console.log("Server is running to the 5000");    
});