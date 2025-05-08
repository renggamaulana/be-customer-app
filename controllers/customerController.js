const Customer = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
    try {
        const customer = await Customer.find();
        res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getGenderSummary = async (req, res) => {
    try {
        const summary = await Customer.aggregate([
            {
                $group: {
                    _id: '$gender',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

exports.getLocationSummary = async (req, res) => {
    try {
        const summary = await Customer.aggregate([
            {
                $group: {
                    _id: '$location',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}