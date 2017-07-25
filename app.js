const express = require('express');
const app = express();

const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think about whos tomb it is" });
});

app.listen(PORT, () => {
  console.log('APP LISTENING ON PORT', PORT);
});
