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

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('admin/products', {
        pageTitle: 'Admin | Products',
        path: '/admin/products',
        products,
      });
    })
    .catch(err => console.log(err));
};

exports.getDeleteProduct = (req, res, next) => {
  console.log(req.params);
  Product.findByPk(req.params.productId)
    .then(product => {
      return product.destroy();
    })
    .then(product => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
