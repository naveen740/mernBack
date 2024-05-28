const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    place: { type: String, required: true },
    area: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    nearby: { type: String },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Property', propertySchema);
