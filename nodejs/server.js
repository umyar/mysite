const express = require('express');
// const cors = require('cors');
const parser = require('body-parser');

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(204).json({});
  }
  next();
});

app.post('/user-credentials', function(req, res){
  console.log(req);
  let request = req.body;

  if (request.email === '1@gmail.com' && request.phone === '1') {
    res.json({email: request.email, phone: request.phone})
  } else {
    res.json({status: 'fail'})
  }
});

app.get('/test', function(req, res){
  res.type('text/plain');
  res.send('Test string from 9000 port');
});

app.listen(9000, () => console.log('Hello from backend!'));
