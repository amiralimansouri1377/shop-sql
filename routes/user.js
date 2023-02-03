const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user');

router.get('/', userControllers.getIndex);
router.get('/products', userControllers.getProducts);
router.get('/products/:productId', userControllers.getProduct);
router.get('/add-cart/:productId', userControllers.getAddToCart);
router.get('/cart', userControllers.getCart);

module.exports = router;
