const express = require('express');
const PORT = process.env.PORT || 3004;
const app = express();
const db = require('./db');
const init = require('./public/index.js');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/api/department', (req, res) => {
  const query = 'SELECT * from department';
  db.query(query, (err, departments) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'server error' });
    }
    res.json(departments);
  });
});

app.get('/api/role', (req, res) => {
  db.query('select * from role', function (err, role) {
    res.json(role);
  });
});

app.get('/api/employee_tracker', (req, res) => {
  db.query('select * from employee_tracker', function (err, employee_tracker) {
    console.log(employee_tracker);
  });
});

app.get('/init', (req, res) => {
  init(); 
  res.send('Prompts started.');
});

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  init();
});
