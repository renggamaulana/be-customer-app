const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    number: Number,
    location: String,
    date: Date,
    loginHour: String,
    name: String,
    age: Number,
    gender: String,
    email: String,
    noTelp: String,
    brandDevice: String,
    digitalInterest: String,
    locationType: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', customerSchema);

