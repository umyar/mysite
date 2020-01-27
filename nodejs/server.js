const express = require('express');
// const cors = require('cors');
const parser = require('body-parser');

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://topux.dev');
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

app.post('/user-request', function(req, res) {
  // console.log(req);
  // let request = req.body;

  const { name, email, phone, comment } = req.body;

  if (name && (email || phone)) {
    console.log('name: ', name, 'email: ', email, 'phone: ', phone, 'comment: ', comment);
    res.json({ status: 'ok', message: `Заявка отправлена успешно! Спасибо, ${name}!` });
  } else {
    res.json({
      status: 'fail',
      message:
        'Извините, но что-то пошло не так. Пожалуйста, напишите об этом нам на topux.dev@gmail.com',
    });
  }
});

app.get('/test', function(req, res) {
  res.type('text/plain');
  res.send('Я люблю тебя ❤️');
});

app.listen(9000, () => console.log('Hello from backend!'));
