var express = require('express');
var cors = require('cors');
var parser = require('body-parser')

var app = express();
app.set('port', process.env.PORT || 9000);

app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

// const corsOptions = {
//   "origin": "*",
//   "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
//   "preflightContinue": false,
//   "optionsSuccessStatus": 204
// }

// app.use(cors(corsOptions))

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(204).json({});
  }
  next();
});

app.post('/login', function(req, res){
  console.log(req.body)
  var request = req.body;

  if (request.email === 'umiarka@gmail.com' && request.password.length > 4) {
    res.json({status: 'ok', token: '1e4fg3333fcmnf45511wqeeeecg'})
  } else {
    res.json({status: 'fail'})
  }
});

app.get('/about', function(req, res){
  res.type('text/plain');
  res.send('About Route');
});
// пользовательская страница 404
app.use(function(req, res, next){
  res.type('text/plain');
  res.status(404);
  res.send('404 — Не найдено');
});

// пользовательская страница 500
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.send('500 — Ошибка сервера');
});

app.listen(app.get('port'), function(){
  console.log( 'Express запущен на http://localhost:' +
      app.get('port') + '; нажмите Ctrl+C для завершения.' );
});
