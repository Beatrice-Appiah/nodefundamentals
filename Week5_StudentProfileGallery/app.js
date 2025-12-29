require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/students');

const app = express();

// --- Database Connection ---
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// --- Middleware ---
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true })); // Parses form data (for creating/updating)
app.use(express.json()); // Parses JSON data (for the delete button fetch request)
app.use(express.static('public'));

app.get('/welcome', (req, res) => {
    res.render('welcome');
});

// 1. HOME: Show all students from Database
app.get('/', async (req, res) => {
    const students = await Student.find().sort({ createdAt: -1 });
    res.render('index', { students });
});

// 2. NEW: Show the add form
app.get('/new', (req, res) => {
    res.render('new');
});

// 3. CREATE: Save new student to Database
app.post('/new', async (req, res) => {
    const { name, age, course, photo } = req.body;
    await Student.create({ name, age, course, photo });
    res.redirect('/');
});

// 4. EDIT: Show the edit form with existing data
app.get('/edit/:id', async (req, res) => {
    try {
        const student = await Student.findById(req.params.id);
        if (!student) return res.redirect('/');
        res.render('edit', { student });
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// 5. UPDATE: Save changes to Database
app.post('/edit/:id', async (req, res) => {
    try {
        const { name, age, course, photo } = req.body;
        // Find the student by ID and update their info
        await Student.findByIdAndUpdate(req.params.id, { name, age, course, photo });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.redirect('/');
    }
});

// 6. DELETE: Remove student from Database
// This handles the 'fetch' request from your index.ejs script
app.delete('/students/:id', async (req, res) => {
    try {
        await Student.findByIdAndDelete(req.params.id);
        res.json({ message: "Student deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Error deleting student" });
    }
});



// --- Server Start ---
app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});