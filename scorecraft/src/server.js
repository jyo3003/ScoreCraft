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

// Create GradingCriteria and Student tables
db.run(`
  CREATE TABLE IF NOT EXISTS GradingCriteria (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    criteriaName TEXT NOT NULL,
    score INTEGER NOT NULL,
    typeOfCriteria TEXT,
    gradingCriteriaGroupName TEXT,
    FOREIGN KEY (gradingCriteriaGroupName) REFERENCES Student(groupName)
  )
`);

db.run(`
  CREATE TABLE IF NOT EXISTS Student (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    groupName TEXT NOT NULL,
    asurite TEXT NOT NULL,
    finalComment TEXT,
    finalscore INTEGER,
    studentName TEXT NOT NULL,
    UNIQUE (asurite)
  )
`);

// REST API routes for GradingCriteria

// Get all grading criteria
app.get('/api/gradingCriteria', (req, res) => {
  db.all('SELECT * FROM GradingCriteria', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Create a new grading criteria
app.post('/api/gradingCriteria', (req, res) => {
  const { criteriaName, score, typeOfCriteria, gradingCriteriaGroupName } = req.body;
  const sql = 'INSERT INTO GradingCriteria (criteriaName, score, typeOfCriteria, gradingCriteriaGroupName) VALUES (?, ?, ?, ?)';
  const params = [criteriaName, score, typeOfCriteria, gradingCriteriaGroupName];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Grading criteria added successfully',
      data: { id: this.lastID, criteriaName, score, typeOfCriteria, gradingCriteriaGroupName },
    });
  });
});

// REST API routes for Student

// Get all students
app.get('/api/students', (req, res) => {
  db.all('SELECT * FROM Student', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Create a new student
app.post('/api/students', (req, res) => {
  const { groupName, asurite, finalComment, finalscore, studentName } = req.body;
  const sql = 'INSERT INTO Student (groupName, asurite, finalComment, finalscore, studentName) VALUES (?, ?, ?, ?, ?)';
  const params = [groupName, asurite, finalComment, finalscore, studentName];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Student added successfully',
      data: { id: this.lastID, groupName, asurite, finalComment, finalscore, studentName },
    });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
