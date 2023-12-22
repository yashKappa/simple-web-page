
const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");
const multer = require('multer');
const session = require('express-session');
const MSSQLStore = require('connect-mssql')(session);
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = 9000;

const dbConfig = {
  user: 'sa',
  password: 'yash@2003',
  server: 'DESKTOP-4IBD93F',
  database: 'duplicate',
  options: {
      encrypt: true,  // Enable encryption
      trustServerCertificate: true,  // Ignore self-signed certificate
  },
};

sql.connect(dbConfig, (err) => {
  if (err) {
      console.error('Error connecting to SQL Server:', err);
  }
});



  // Parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(bodyParser.json());

app.post("/student", async function(req, res) {
  const username = req.body.username; // Correctly read username from req.body
  const password = req.body.password; // Correctly read password from req.body

  try {
      const pool = await new sql.ConnectionPool(dbConfig).connect();
      const request = new sql.Request(pool);
      request.input('username', sql.NVarChar, username); // Use the correct variable
      request.input('password', sql.NVarChar, password); // Use the correct variable

      const query = "SELECT * FROM student WHERE username = @username AND password = @password";
      const result = await request.query(query);

      if (result.recordset.length > 0) {
          // Store user data in the session
          req.session.user = { username: result.recordset[0].username };
          res.redirect("/student user/userpanel.html");
      } else {
          res.redirect("/student/student login.html");
      }
  } catch (error) {
      console.error("Error occurred during login:", error);
      res.redirect("/");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
