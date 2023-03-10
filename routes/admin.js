const express = require('express');

const router = express.Router();

const adminControllers = require('../controllers/admin');

router.get('', adminControllers.getAdminPanel);
router.get('/add-product', adminControllers.getAddProduct);
router.post('/add-product', adminControllers.postAddProduct);
router.get('/products', adminControllers.getProducts);
router.get('/delete-product/:productId', adminControllers.getDeleteProduct);
router.get('/edit-product/:productId', adminControllers.getEditProduct);
router.post('/edit-product', adminControllers.postEditProduct);

module.exports = router;
