require("dotenv").config();
require("../../config/dbConfig");
const { SchemaTypeOptions } = require("mongoose");
const FamilyModel = require("../../models/families.model") ;


const families = [
    {
        firstName: "Caroline",
        lastName: "Smith",
        age:35,
        password: "carolineSmith" ,
        email: "caroline.smith@gmail.com",
        cellphone: "0712233445",
        picture: "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427161/images-4_rcjqon.jpg",
        numberOfKids:1,
        kidsAge:5,
        description: "Pierre is full of energy, he likes reading and playing football",
        availability: "afterSchool" 
      },

      {
        firstName: "Sarah",
        lastName: "Robert",
        age:40,
        password: "sarahRobert" ,
        email: "sarah.robert@gmail.com",
        cellphone: "07122334454",
        picture: "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427163/images-8_ryvlkl.jpg",
        numberOfKids:2,
        kidsAge:5,
        description: "Clara and Peter loves playing together. Clara play piano and Peter play tennis",
        availability: "afterSchool" 
      }, 

      {
        firstName: "Jennifer",
        lastName: "Stone",
        age:34,
        password: "jenniferStone" ,
        email: "jennifer.stone@gmail.com",
        cellphone: "0712233777",
        picture: "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427165/images-1_gvcrwy.jpg",
        numberOfKids:1,
        kidsAge:1,
        description: "Arthur is a lovely baby who sleep all the time",
        availability: "fullTime" 
      }
];

(async function insertFamilies() {
    try {
      await FamilyModel.deleteMany(); // empty the tags db collection
      const inserted = await FamilyModel.insertMany(families); // insert docs in db
      console.log(`seed families done : ${inserted.length} documents inserted !`);
      process.exit();
    } catch (err) {
      console.error(err);
    }
  })();
