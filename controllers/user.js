const Cart = require('../models/cart');
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

exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      res.render('user/cart', {
        pageTitle: 'Cart',
        path: '/cart',
        products,
      });
    })
    .catch(err => console.log(err));
};

exports.getDeleteCart = (req, res, next) => {
  const productId = req.params.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: productId } });
    })
    .then(([product]) => {
      return product.cartItem.destroy();
    })
    .then(() => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getAddOrder = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts();
    })
    .then(products => {
      req.user
        .createOrder()
        .then(order => {
          products.forEach(product => {
            order.cost += product.cartItem.cost;
          });
          return order.save();
        })
        .then(order => {
          return order.addProducts(
            products.map(product => {
              product.orderItem = {
                quantity: product.cartItem.quantity,
                cost: product.cartItem.cost,
              };
              return product;
            })
          );
        })
        .then(order => {
          res.redirect('/');
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};
