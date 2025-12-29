require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Post = require('./models/post'); 

const app = express();

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// view engine setup
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: true}));

// homepage route
app.get('/', async (req,res) =>{
    const posts = (await Post.find().sort({createdAt: -1}));
    res.render('index', {posts});
});

// show create post form

app.get("/new", (req,res)=>{
    res.render("new");
})

// handle form submission
app.post('/new', async(req,res) =>{
    const {title, content} = req.body;
    await Post.create({ title, content});
    res.redirect('/');
})

// start server
app.listen(process.env.PORT,() =>{
    console.log(`Connected to PORT ${process.env.PORT} successfully`)
})