const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const sequelize = require('./utils/database');

const User = require('./models/user');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.static(path.join('public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  User.findByPk(1)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(userRoutes);

sequelize
  .sync()
  // .sync({ force: true })
  .then(() => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({
        fullName: 'Amirali Mansouri',
        email: 'mansouri.amirali98@gmail.com',
      });
    }
    return user;
  })
  .then(user => {
    app.listen(3000);
  })
  .catch(err => console.log(err));
