const express = require('express');
const morgan = require('morgan');
const app = express();
const path = require('path');
const port = 4000;

app.listen(port, () => {
   console.log(`🖥️ 📡 Servidor iniciado http://localhost:${port}`);
});

app.use(morgan('dev')); // tiny, short, common, dev, combined

app.set('view engine', 'hbs');

app.set('views', path.join(__dirname, 'views'));

const Router = require('./routes/rutas');

app.use('/', Router);