const Property = require('../models/Property');

exports.addProperty = async (req, res) => {
    const { place, area, bedrooms, bathrooms, nearby } = req.body;
    const seller = req.user._id;

    try {
        const property = await Property.create({
            place,
            area,
            bedrooms,
            bathrooms,
            nearby,
            seller,
        });

        res.status(201).json(property);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getProperties = async (req, res) => {
    try {
        const properties = await Property.find({});
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getPropertyById = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (property) {
            res.json(property);
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProperty = async (req, res) => {
    const { place, area, bedrooms, bathrooms, nearby } = req.body;

    try {
        const property = await Property.findById(req.params.id);

        if (property) {
            property.place = place;
            property.area = area;
            property.bedrooms = bedrooms;
            property.bathrooms = bathrooms;
            property.nearby = nearby;

            const updatedProperty = await property.save();
            res.json(updatedProperty);
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (property) {
            await property.remove();
            res.json({ message: 'Property removed' });
        } else {
            res.status(404).json({ message: 'Property not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getSellerProperties = async (req, res) => {
    try {
        const properties = await Property.find({ seller: req.user._id });
        res.json(properties);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
