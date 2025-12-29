const express = require("express");
const app = express();
const PORT = 3000;

//Middleware is a function that processes request before (or after) it reaches
// a route.

app.use((req,res, next) =>{
    console.log(`${req.method} request received at ${req.url}`);
    next();
})


// defining a route
app.get('/', (req,res) =>{
    res.send("Welcome to Express Js Server")
});

app.get('/about',(req, res)=>{
    res.send("This is the about page")
} );

app.get('/contact', (req, res) =>{
    res.send('Contact us via email')
})

//Defining post route
app.post('/about', (req,res) =>{
    res.send('')
})

//starting the server
app.listen(PORT, ()=>{
    console.log(`Server has started on port: ${PORT}`);
})