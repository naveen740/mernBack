const express = require('express');
const {
    addProperty,
    getProperties,
    getPropertyById,
    updateProperty,
    deleteProperty,
    getSellerProperties
} = require('../controllers/propertyController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.route('/').get(getProperties).post(protect, addProperty);
router.route('/:id').get(getPropertyById).put(protect, updateProperty).delete(protect, deleteProperty);
router.route('/seller/:sellerId').get(protect, getSellerProperties);

module.exports = router;
