const Product = require('../models/product');

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('user/index', {
        pageTitle: 'Home',
        path: '/',
        products,
      });
    })
    .catch(err => console.log(err));
};
