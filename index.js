const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser'); // Import body-parser middleware
const cors = require('cors');

const app = express();
const port = 3000; // you can change the port if needed

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// MySQL database connection
const connection = mysql.createConnection({
host: 'localhost',
  user: 'root',
  password: 'qwerty',
  database: 'nodekatse'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as ID ' + connection.threadId);
});



app.use(cors());
// API endpoint to insert name into the database
app.post('/insert-name', (req, res) => {
  // Ensure the request body is properly parsed as JSON
  if (!req.body || !req.body.name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  // Extract the name from the request body
  const { name, password } = req.body;

  const crypto = require('crypto')

  let hash = crypto.createHash('md5').update(password).digest("hex")


  // Perform the database insertion
  const insertQuery = 'INSERT INTO users (name, password) VALUES (?, ?)';
  connection.query(insertQuery, [name, hash], (error, results, fields) => {
    if (error) {
      console.error('Error inserting name: ' + error.stack);
      return res.status(500).json({ error: 'Internal server error' });
    }
    res.status(200).json({ message: 'Name inserted successfully' });
  });
});


// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
