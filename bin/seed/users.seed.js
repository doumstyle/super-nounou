require("dotenv").config();
require("../../config/dbConfig"); // fetch the db connection
const { SchemaTypeOptions } = require("mongoose");
const UserModel = require("../../models/users.model.js"); // fetch the model to validate our user document before insertion (in database)
const { getMaxListeners } = require("../../app");

const users = [
  {
    firstName: "Lynda ",
    lastName: "Dupond",
    role: "babysitter",
    age: 22,
    password: "lyndaDupond",
    email: "lynda.dupond@gmail.com",
    cellphone: "0612233445",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427168/84_zstpqh.jpg",
    experience: 2,
    resume: "I love children, i used to take care of my brothers and sisters",
    availability: "afterSchool",
  },
  {
    firstName: " Sophie ",
    lastName: "Durand",
    role: "babysitter",
    age: 30,
    password: "sophieDurand",
    email: "sophie.durand@gmail.com",
    cellphone: "0656677889",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427166/52_yifjrn.jpg",
    experience: 6,
    resume: "I am a mum of 3 kids, i consider all children as my own children",
    availability: "fullTime",
  },
  {
    firstName: "Marie-Noel",
    lastName: "France",
    role: "babysitter",
    age: 45,
    password: "marienoelFrance",
    email: "marienoel.france@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427165/62_bu6hcb.jpg",
    experience: 10,
    resume:
      " i am graduated from babyschool i enjoy taking care of all children",
    availability: "fullTime",
  },
  {
    firstName: "Jeanette",
    lastName: "Moss",
    role: "babysitter",
    age: 28,
    password: "jeanetteMoss",
    email: "jeanetteMoss@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427165/89_gnjo3l.jpg",
    experience: 3,
    resume: " A person’s a person, no matter how small. Dr. Seuss",
    availability: "evening",
  },
  {
    firstName: "Amanda",
    lastName: "Halliday",
    role: "babysitter",
    age: 22,
    password: "amandaHalliday",
    email: "amanda.halliday@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/c_thumb,w_200,g_face/v1642427166/79_jtjsri.jpg",
    experience: 2,
    resume:
      "Since 2 i am taking care of 2 chidren for helping them homework, i am studing beside",
    availability: "afterSchool",
  },
  {
    firstName: "Mary ",
    lastName: "Saulsbury",
    role: "babysitter",
    age: 28,
    password: "marySaulsbury",
    email: "mary.Saulsbury@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/c_thumb,w_200,g_face/v1642427166/85_ualbng.jpg",
    experience: 5,
    resume: "Let me love you a little more before your not little anymore.",
    availability: "partTime",
  },
  {
    firstName: "Anna",
    lastName: "Brown",
    role: "babysitter",
    age: 37,
    password: "annaBrown",
    email: "anna.Brown@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/c_thumb,w_200,g_face/v1642427166/3_bhcn52.jpg",
    experience: 10,
    resume: "The best thing in the world is seeing smiling face on your kids.",
    availability: "fullTime",
  },
  {
    firstName: "Rosemary",
    lastName: "Chapman",
    role: "babysitter",
    age: 37,
    password: "rosemaryChapman",
    email: "rosemary.Chapman@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/c_thumb,w_200,g_face/v1642427165/86_evzxio.jpg",
    experience: 25,
    resume:
      "The greatest gift I can give to your children is my time, my love, and my attention.",
    availability: "fullTime",
  },
  {
    firstName: "Patricia",
    lastName: "Skinner",
    role: "babysitter",
    age: 37,
    password: "PatriciaSkinner",
    email: "patricia.skinner@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/c_thumb,w_200,g_face/v1642427165/83_hxonua.jpg",
    experience: 10,
    resume: "The best thing in the world is seeing smiling face on your kids.",
    availability: "fullTime",
  },
  {
    firstName: "Shawna",
    lastName: "Wash",
    role: "babysitter",
    age: 49,
    password: "shawnaWash",
    email: "shawna.Wash@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/c_thumb,w_200,g_face/v1642427165/14_spm7jb.jpg",
    experience: 11,
    resume:
      "Children need at least one person in their life that thinks the sun rises and sets on them, who delights in their existence, and loves them unconditionally",
    availability: "fullTime",
  },
  {
    firstName: "Joyce",
    lastName: "Oliva",
    role: "babysitter",
    age: 21,
    password: "JoyceOliva",
    email: "joyce.Oliva@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642504747/71_za8sjd.jpg",
    experience: 2,
    resume: "A child is an uncut diamond.” – Austin O’Malley",
    availability: "afterSchool",
  },
  {
    firstName: "Kellie",
    lastName: "Moore",
    role: "babysitter",
    age: 20,
    password: "kellieMoore",
    email: "kellie.Moore@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642504726/87_mnyn3q.jpg",
    experience: 5,
    resume:
      "Children aren’t coloring books. You don’t get to fill them with your favorite colors.",
    availability: "afterSchool",
  },
  {
    firstName: "Maureen",
    lastName: "Harris",
    role: "babysitter",
    age: 20,
    password: "MaureenHarris",
    email: "maureenHarris@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642504698/93_cj0uzf.jpg",
    experience: 5,
    resume:
      "Play gives children a chance to practice what they are learning.” – Mr. Rogers",
    availability: "afterSchool",
  },
  {
    firstName: "Darlene",
    lastName: "Croskey",
    role: "babysitter",
    age: 30,
    password: "darleneCroskey",
    email: "darleneCroskey@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1642504400/59_nqpcjj.jpg",
    experience: 9,
    resume:
      "Give children toys that are powered by their imagination, not by batteries.” – H. Jackson Brown",
    availability: "partTime",
  },
  {
    firstName: "Michelle",
    lastName: "Clifford",
    role: "babysitter",
    age: 18,
    password: "michelleClifford",
    email: "michelleClifford@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642504383/91_am6jyi.jpg",
    experience: 1,
    resume:
      "Give children toys that are powered by their imagination, not by batteries.” – H. Jackson Brown",
    availability: "evening",
  },
  {
    firstName: "Amy",
    lastName: "Price",
    role: "babysitter",
    age: 18,
    password: "amyPrice",
    email: "amyPrice@gmail.com",
    cellphone: "0691234567",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/w_1000,ar_1:1,c_fill,g_auto,e_art:hokusai/v1642504295/48_disrwp.jpg",
    experience: 1,
    resume:
      "Children are the true connoisseurs, what’s precious to them has no price, only value.” – Bel Kaufman",
    availability: "evening",
  },

  {
    firstName: "Caroline",
    lastName: "Smith",
    role: "family",
    age: 35,
    password: "carolineSmith",
    email: "caroline.smith@gmail.com",
    cellphone: "0712233445",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427161/images-4_rcjqon.jpg",
    numberOfKids: 1,
    kidsAge: [5],
    description:
      "Pierre is full of energy, he likes reading and playing football",
    availability: "afterSchool",
  },
  {
    firstName: "Sarah",
    lastName: "Robert",
    role: "family",
    age: 40,
    password: "sarahRobert",
    email: "sarah.robert@gmail.com",
    cellphone: "07122334454",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427163/images-8_ryvlkl.jpg",
    numberOfKids: 2,
    kidsAge: [5, 7],
    description:
      "Clara and Peter loves playing together. Clara play piano and Peter play tennis",
    availability: "afterSchool",
  },
  {
    firstName: "Jennifer",
    lastName: "Stone",
    role: "family",
    age: 34,
    password: "jenniferStone",
    email: "jennifer.stone@gmail.com",
    cellphone: "0712233777",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427165/images-1_gvcrwy.jpg",
    numberOfKids: 1,
    kidsAge: [1],
    description: "Arthur is a lovely baby who sleep all the time",
    availability: "fullTime",
  },
  {
    firstName: "Lisa",
    lastName: "Dunston",
    role: "family",
    age: 34,
    password: "lisaDunston",
    email: "lisaDunston@gmail.com",
    cellphone: "0712233777",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/v1642427161/images-7_yfvljo.jpg",
    numberOfKids: 2,
    kidsAge: [7, 4],
    description: "",
    availability: "afterSchool",
  },
  {
    firstName: "Sharon",
    lastName: "Finch",
    role: "family",
    age: 34,
    password: "sharonFinch",
    email: "sharonFinch@gmail.com",
    cellphone: "0712233777",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1642427161/images-5_tie3dm.jpg",
    numberOfKids: 2,
    kidsAge: [9, 12],
    description: "Arthur is a lovely baby who sleep all the time",
    availability: "evening",
  },
  {
    firstName: "Debra",
    lastName: "McKay",
    role: "family",
    age: 34,
    password: "debraMcKay",
    email: "debraMcKay@gmail.com",
    cellphone: "0712233777",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1642427163/images_pytpca.jpg",
    numberOfKids: 3,
    kidsAge: [10, 13, 8],
    description: "Arthur is a lovely baby who sleep all the time",
    availability: "afterSchool",
  },
  {
    firstName: "Evelyn",
    lastName: "Deluca",
    role: "family",
    age: 34,
    password: "evelynDeluca",
    email: "evelynDeluca@gmail.com",
    cellphone: "0712233777",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1642427164/images-2_x3coht.jpg",
    numberOfKids: 3,
    kidsAge: [1, 5, 7],
    description: "Arthur is a lovely baby who sleep all the time",
    availability: "fullTime",
  },
  {
    firstName: "Faye",
    lastName: "Dail",
    role: "family",
    age: 34,
    password: "fayeDail",
    email: "fayeDail@gmail.com",
    cellphone: "0712233777",
    picture:
      "https://res.cloudinary.com/dgblvjmrn/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1642427164/images-3_rkvcoc.jpg",
    numberOfKids: 2,
    kidsAge: [1, 3],
    description: "Arthur is a lovely baby who sleep all the time",
    availability: "fullTime",
  }
];

(async function insertUsers() {
  try {
    await UserModel.deleteMany(); // empty the tags db collection
    const inserted = await UserModel.insertMany(users); // insert docs in db
    console.log(
      `seed users done : ${inserted.length} documents inserted !`
    );
    process.exit();
  } catch (err) {
    console.error(err);
  }
})();
