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
    edit: false,
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

exports.getEditProduct = (req, res, next) => {
  const edit = req.query.edit;

  Product.findByPk(req.params.productId)
    .then(product => {
      res.render('admin/add-product', {
        pageTitle: 'Admin | Edit Product',
        path: '/admin/add-product',
        edit,
        product,
      });
    })
    .catch(err => console.log(err));
};

exports.postEditProduct = (req, res, next) => {
  const productId = req.body.productId;

  const newTitle = req.body.title;
  const newImageUrl = req.body.imageUrl;
  const newPrice = req.body.price;
  const newDescription = req.body.description;

  Product.findByPk(productId)
    .then(product => {
      product.title = newTitle;
      product.price = newPrice;
      product.imageUrl = newImageUrl;
      product.description = newDescription;

      return product.save();
    })
    .then(product => {
      res.redirect('/admin/products');
    })
    .catch(err => console.log(err));
};
