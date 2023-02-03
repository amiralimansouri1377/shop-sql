const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');

const sequelize = require('./utils/database');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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

User.hasMany(Product, { constraints: true, onDelete: 'CASCADE' });
Product.belongsTo(User);

User.hasOne(Cart, { constraints: true, onDelete: 'CASCADE' });
Cart.belongsTo(User);

Product.belongsToMany(Cart, { through: CartItem });
Cart.belongsToMany(Product, { through: CartItem });

User.hasMany(Order, { constraints: true, onDelete: 'CASCADE' });
Order.belongsTo(User);

Product.belongsToMany(Order, { through: OrderItem });
Order.belongsToMany(Product, { through: OrderItem });

sequelize
  // .sync()
  .sync({ force: true })
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
    user
      .getCart()
      .then(cart => {
        if (!cart) {
          return user.createCart();
        }
        return cart;
      })
      .then(cart => {
        app.listen(3000);
      });
  })
  .catch(err => console.log(err));
