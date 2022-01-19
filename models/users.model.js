const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const usersSchema = new Schema({
    firstName: String,
  
    lastName: String,

    age: Number,

    role: {
        type: String,
        enum: ["babysitter", "family"]
    },
    password: String,
    
    email: {
		type: String,
		unique: true,
		validate: (email) => {
			return Boolean(
				email.match(
					/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
				)
			);
		},
	},
    cellphone: {
        type: Number,
        /*validate: {
            validator: function(v) {
                return /d{10}/.test(v);
            },
            message: '{VALUE} is not a valid 10-digit number!'
        }*/
    },

    address: String, 

    latitude: Number,
    
    longitude: Number,

    picture: String,
       
    experience: Number,
  
    resume: String,
    
    description: String,

    numberOfKids: Number,
   
    kidsAge: Number,
    

    availability: {
        type: [String],
        enum: ['fullTime', 'partTime', 'evening', 'afterSchool'],
    },

    //ratings: String    
});

module.exports = model('User', usersSchema);