const express = require('express');

const router = express.Router();

const adminControllers = require('../controllers/admin');

router.get('', adminControllers.getAdminPanel);

module.exports = router;
