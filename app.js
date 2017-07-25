const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.set('view engine', 'pug');

app.use((req, res, next) => {
  req.message = 'This message made it!';
  next();
})

app.use((req, res, next) => {
  console.log('HELLO');
  const err = new Error('Oh noes!');
  err.status = 500;
  next(err);
})

app.get('/', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.render('index', { name });
  } else {
    res.redirect('/hello');
  }
});

app.get('/cards', (req, res) => {
  res.render('card', { prompt: "Who is buried in Grant's tomb?", hint: "Think about whos tomb it is" });
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/')
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
})

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
})

app.listen(PORT, () => {
  console.log('APP LISTENING ON PORT', PORT);
});
