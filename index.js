const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join('public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/admin', adminRoutes);

app.listen(3000);
