const express = require('express');

const router = express.Router();

const userControllers = require('../controllers/user');

router.get('/', userControllers.getIndex);
router.get('/products', userControllers.getProducts);
router.get('/products/:productId', userControllers.getProduct);

module.exports = router;
