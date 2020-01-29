const express = require('express');
const parser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: false }));

const transport = nodemailer.createTransport({
  service: 'Yandex',
  auth: {
    user: 'hello@topux.dev',
    pass: 'QLziMX43A',
  },
});

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
  const { name, email, phone, comment } = req.body;

  if (name && (email || phone)) {
    transport.sendMail({
      from: 'hello@topux.dev',
      to: 'umiarka@gmail.com',
      subject: 'Заявка с topux.dev',
      text: `Имя: ${name}, Email: ${email}, Телефон: ${phone}, Комментарий: ${comment}`,
      html:
        `<!DOCTYPE html><html lang="ru"><head> <meta charset="UTF-8"> <title>Заявка</title>` +
        `</head><body> <h1 style="font-size: 20px">Заявка с topux.dev</h1>` +
        `<p><b>Имя:</b> ${name}</p><p><b>Email:</b> ${email}</p>` +
        `<p><b>Телефон:</b> <a href="tel:${phone}">${phone}</a></p><p><b>Комментарий:</b> ${comment}</p></body></html>`,
    });

    res.json({ status: 'ok', message: `Заявка отправлена успешно! Спасибо, ${name}!` });
  } else {
    res.json({
      status: 'fail',
      message:
        'Извините, но что-то пошло не так. Пожалуйста, напишите об этом нам на hello@topux.dev',
    });
  }
});

app.get('/test', function(req, res) {
  res.type('text/plain');
  res.send('Я люблю тебя ❤️');
});

app.listen(9000, () => console.log('Backend started on 9000 port!'));
