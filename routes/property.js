const express = require('express');
const router = express.Router();
const { createProperty, getProperties, getSellerProperties, updateProperty, deleteProperty } = require('../controllers/propertyController');

router.post('/', createProperty);
router.get('/', getProperties);
router.get('/seller/:userId', getSellerProperties);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

module.exports = router;
