require("dotenv").config();
require("../../config/dbConfig"); // fetch the db connection
const { SchemaTypeOptions } = require("mongoose");
const BabysitterModel = require("../../models/babysitters.model"); // fetch the model to validate our user document before insertion (in database)
const { getMaxListeners } = require("../../app");

const babysitters = [
    {
      firstName: "Lynda ",
      lastName: "Dupond",
      age:22,
      password: "lyndaDupond" ,
      email: "lynda.dupond@gmail.com",
      cellphone: "0612233445",
      picture: "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427168/84_zstpqh.jpg" ,
      experience:2,
      resume: "I love children, i used to take care of my brothers and sisters",
      availability: "afterSchool" 
    },

    {
        firstName: " Sophie ",
        lastName: "Durand",
        age:30,
        password: "sophieDurand" ,
        email: "sophie.durand@gmail.com",
        cellphone: "0656677889",
        picture: "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427166/52_yifjrn.jpg" ,
        experience:6,
        resume: "I am a mum of 3 kids, i consider all children as my own children",
        availability: "fullTime" 
    },

    {
      firstName: "Marie-Noel",
      lastName: "France",
      age:45,
      password: "marienoelFrance" ,
      email: "marienoel.france@gmail.com",
      cellphone: "0691234567",
      picture: "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427165/62_bu6hcb.jpg",
      experience:10,
      resume: " i am graduated from babyschool i enjoy taking care of all children",
      availability: "fullTime"
    }
  
  ];

  (async function insertBabysitters() {
    try {
      await BabysitterModel.deleteMany(); // empty the tags db collection
      const inserted = await BabysitterModel.insertMany(babysitters); // insert docs in db
      console.log(`seed babysitters done : ${inserted.length} documents inserted !`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  })();

