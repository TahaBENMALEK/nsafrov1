const express = require('express');
const { Pool } = require('pg'); // Import PostgreSQL client

const app = express();

// Middleware to parse incoming requests
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

// Create a new Pool instance to manage PostgreSQL connections
const pool = new Pool({
  user: 'postgres', // replace with your PostgreSQL username
  host: 'localhost',    // your PostgreSQL host
  database: 'postgres', // replace with your PostgreSQL database name
  password: '', // replace with your PostgreSQL password
  port: 5432,           // default PostgreSQL port
});

// Serve the form HTML file
app.get('/', function (req, res, next) {
  res.sendFile(__dirname + '/form.html');
});

// Handle form submission
app.post('/', async (req, res) => {
  const { budget, currency, destination } = req.body;

  // Ensure required fields are filled
  if (!budget || !currency || !destination) {
    return res.status(400).send("All fields are required");
  }

  try {
    // Insert form data into the PostgreSQL database
    const result = await pool.query(
      'INSERT INTO user_data (budget, currency, destination) VALUES ($1, $2, $3) RETURNING *',
      [budget, currency, destination]
    );

    console.log('Data saved:', result.rows[0]); // Log the inserted data
    res.status(201).send('Form data successfully saved!');
  } catch (err) {
    console.error('Error saving data:', err);
    res.status(500).send('Error saving data');
  }
});

// Start the server
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
