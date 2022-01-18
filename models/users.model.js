const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const usersSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["babysitter", "family"]
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    telephone: {
        type: Number,
        validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10-digit number!'
        }
    },
    picture: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        //required: true,
    },
    resume: {
        type: String,
    },

    description: String,

    numberOfKids: {
        type: Number,
        //required: true,
    },
    kidsAge: {
        type: Number,
        //required: true
    },

    availability: {
        type: [String],
        enum: ['fullTime', 'partTime', 'evening', 'afterSchool'],
    },

    //ratings: String    
});

module.exports = model('User', usersSchema);