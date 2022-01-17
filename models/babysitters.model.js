const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const babysittersSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    cellphone: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    resume: {
        type: String,
    },
    availability: {
        type: [String],
        enum: ['fullTime', 'partTime', 'evening', 'afterSchool'],
    },
    ratings: String,
    position: {
        type: "Point",
        coordinates: [40, 5],
    }
});

module.exports = model('Babysitter', babysittersSchema);