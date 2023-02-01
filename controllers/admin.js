const Product = require('../models/product');

exports.getAdminPanel = (req, res, next) => {
  res.render('admin/admin-panel', {
    pageTitle: 'Admin Panel',
    path: '/admin',
  });
};

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    pageTitle: 'Admin | Add Product',
    path: '/admin/add-product',
  });
};

exports.postAddProduct = (req, res, next) => {
  const body = req.body;
  Product.create({ ...body })
    .then(product => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
