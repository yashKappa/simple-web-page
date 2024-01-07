const express = require('express');
const mysql = require('mysql');
const path = require('path');
const ejs = require('ejs');

const app = express();
const port = 3000; // You can use any port you prefer

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'ads',
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('MySQL database connected!');
});

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Define a route to fetch data from the 'student' table
app.get('/status', (req, res) => {
  const query = 'SELECT * FROM student';
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing MySQL query:', err);
      res.status(500).send('Internal Server Error');
      return;
    }

    // Render the 'status.ejs' page and pass the query results
    res.render('status', { data: results });
  });
});

// Serve the status.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'status.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
