const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();
const init = require('./public/index.js');


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

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
