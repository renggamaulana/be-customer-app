const Customer = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
    console.log("GET /api/customers called");

    // Ambil query parameter untuk pagination dan filtering
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    try {
        const customers = await Customer.find()
            .skip(skip)
            .limit(limit)
            .lean();  // lean untuk hasil lebih ringan

        // Hitung umur dari tahun lahir
        const currentYear = new Date().getFullYear();
        const formattedCustomers = customers.map(customer => ({
        ...customer,
            age: currentYear - customer.age  // 'age' di sini adalah tahun lahir
        }));

        const total = await Customer.countDocuments();

        res.status(200).json({
            data: formattedCustomers,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({ message: error.message });
    }
};


exports.getGenderSummary = async (req, res) => {
    console.log("GET /api/customers/gender called");
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
    console.log("GET /api/customers/location called");
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


exports.getLocationTypeSummary = async (req, res) => {
    console.log("GET /api/customers/location-type called");
    try {
        const summary = await Customer.aggregate([
            {
                $group: {
                    _id: '$locationType',
                    count: { $sum: 1 }
                }
            }
        ]);
        res.status(200).json(summary);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}