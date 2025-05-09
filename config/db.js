const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || "mongodb+srv://admin:rahasia123@customerappcluster.b69n8sj.mongodb.net/?retryWrites=true&w=majority&appName=customerAppCluster");
        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDB;