const _ = require('lodash');
const axios = require('axios');
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true })); // for URL -encoded Body parsing

app.get('/', (req,res) => {
    //res.send('Hello World from Express');
    console.log(`Request Method: ${req.method}`);
    console.log(`Request URL:${req.url}`);
    console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
    const name = req.query.name || 'Samuel ';
    const age = req.query.age || 20;
    res.json({ message: `Hello, ${name}, You are ${age} years old`});
    //res.json({message: "Hello World from here"})
});

let postedData =[];
app.post ('/', (req,res) => {
    console.log(`Received request body: ${JSON.stringify(req.body)}`);
})
app.get('/posted-data', (req,res) =>{
    console.log(postedData)
}); 

app.get('/fetch-post', (req,res) =>{
    res.send(`
        <html>
            <body>
            <script>
            fetch('/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },             
                body: JSON.stringify({ title: 'foo', body: 'bar', userId: 1})
             })
            .then(response => response.json())
            .then(data => console.log('Success:', data))
            .catch((error) => {console.error('Error:', error);
            });
            </script>
            </body>
        </html>`)
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>{
    console.log(`Server is running on PORT ${PORT}`);
});



//shuffled Array
console.log("shuffled array:", _.shuffle([1, 2, 3, 4, 5]));
//chunk array
console.log("chunked array:", _.chunk([1 ,2 ,3 ,4 ,5 ,6], 2));


const debouncedFunction =_.debounce(() => {
    console.log("debouced function executed"); 
}, 2000);

debouncedFunction();
debouncedFunction();
debouncedFunction();

// testing
console.log("Hello from the winning side");

// using axios to make GET request
axios.get('https://jsonplaceholder.typicode.com/todos/1')
.then(r => console.log("Axios GET response:", r.data))
.catch(e => console.log("Axios GET error: ",e));
 