// What are modules?
// In simple terms modules are building blocks of Nodejs application
// (They are reusable)

// a. Core modules(Built -in module)use file_system{fs}system
import fs from 'fs';

fs.readFile('example.txt','utf8',(err,data) =>{
    if (err) console.log(err);
    else console.log(data)
} )

//b. Local Module
import * as math from './math.js'

console.log(math.add(10,5))
console.log(math.multiply(2,5))



// c. Third Party Modules
import express from 'express';
const app = express()
app.get('/',(req,res) => {
    res.send('Hello World')  
});
app.listen(3000)

 // Change: require('express') -> import express from 'express'
import chalk from 'chalk';    // Change: require('chalk') -> import chalk from 'chalk'

app.get('/', (req, res) => {
    res.send('Hello World');
});

// Chalk usage remains the same
console.log(chalk.blue('Hello from chalk'));

// Start the server
app.listen(3000, () => {
    console.log(`Server running at ${chalk.green.bold('http://localhost:3000')}`);
});




// Modules help to organize our code and separation by functionality(Oraganization)
// You can always reuse functions across multiple files(Reusability)
// Maintainability
// Modularity

