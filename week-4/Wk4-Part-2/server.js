require('dotenv').config();
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

// middleware
app.use(bodyParser.json());

// Connect to MongoDB; starting server also
console.log("Connecting", process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI)
    .then (() =>{
        console.log('Connected to MongoDB');

        // Starting server
        app.listen(process.env.PORT,()=>{
            console.log(`Server is running on: ${process.env.PORT}`);
        })
    })
    .catch((err) =>{
        console.error('Error connecting:', err);
    })