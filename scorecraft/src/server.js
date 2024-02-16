// server.js
const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// SQLite database setup
const db = new sqlite3.Database('./my-database.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log('Connected to the database.');
  }
});

db.run(`
  CREATE TABLE IF NOT EXISTS student_table (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    column1 TEXT,
    column2 INTEGER
  )
`);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
app.get('/api/data', (req, res) => {
  db.all('SELECT * FROM student_table', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Example route for adding data to the database
app.post('/api/data', (req, res) => {
  const { column1, column2 } = req.body;
  const sql = 'INSERT INTO student_table (column1, column2) VALUES (?, ?)';
  const params = [column1, column2];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Data added successfully',
      data: { id: this.lastID, column1, column2 },
    });
  });
});
