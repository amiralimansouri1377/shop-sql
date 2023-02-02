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

exports.getAddToCart = (req, res, next) => {
  let quantity = 1;
  const productId = req.params.productId;

  req.user
    .getCart()
    .then(cart => {
      cart
        .getProducts({ where: { id: productId } })
        .then(products => {
          if (products.length) {
            const product = products[0];
            quantity = product.cartItem.quantity + 1;
          }

          return Product.findByPk(productId);
        })
        .then(product => {
          return cart.addProduct(product, {
            through: {
              quantity,
              cost: quantity * product.price,
            },
          });
        })
        .then(cart => {
          res.redirect('/');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
