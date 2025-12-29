const express = require('express');
const app = express();
PORT = 3000

app.get('/home',(req,res) =>{
    res.send('Welcome to my SERVER')
})

app.listen(PORT);