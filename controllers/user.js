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

exports.getProduct = (req, res, next) => {
  Product.findByPk(req.params.productId)
    .then(product => {
      res.render('user/details', {
        path: '/products',
        product,
      });
    })
    .catch(err => console.log(err));
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('user/products', {
        pageTitle: 'Products',
        path: '/products',
        products,
      });
    })
    .catch(err => console.log(err));
};
