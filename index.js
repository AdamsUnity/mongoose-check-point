const mongoose = require("mongoose");
const { connectDB } = require("./config/dbConnect");
const express = require("express");
const app = express();
const { arrayOfPersons } = require("./data/data");
const person = require("./models/userModel");
require("dotenv").config();
const port = process.env.PORT || 5000;

// middlewares
app.use(express.json());

// Function to save a single record
const createAndSavePerson = () => {
  const newPerson = new person({
    name: "Ndaddy",
    age: 43,
    favouriteFoods: ["Egusi", "pamded-yam"],
  });

  console.log("saved new person");
  return newPerson.save();
};

// create Many people
const createManyPeople = (arrayOfPersons) => {
  return person.create(arrayOfPersons);
};

// Function to find people by name
const findPeopleByName = (personName) => {
  return person.find({ name: personName });
};

// Find people by favourite food
const findPeopleByFood = (food) => {
  return person.findOne({ favouriteFoods: { $in: [food] } });
};

// Function to find people by id
const findPeopleById = (personID) => {
  return person.find({ _id: personID });
};

// find person update the favourite food then save
const findEditSave = (personID) => {
  return person.findById(personID).then((person) => {
    person.favouriteFoods.push("Hamburger");
    console.log("added new favourite food");
    return person.save();
  });
};

// Function to perform new updates using findOneAndUpdate
const findAndUpdate = (personName) => {
  return person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true }
  );
};

// Function to delete one person by _id
const removeById = (personId) => {
  return person.findByIdAndDelete(personId);
};

// Function to delete many people by name
const removeManyPeople = () => {
  return person.deleteMany({ name: "Mary" });
};

// Function to find people who like burritos
const chainQueryHelpers = () => {
  return person
    .find({ favoriteFoods: "Burritos" })
    .sort({ name: 1 })
    .limit(2)
    .select("-age")
    .exec();
};

// Startup app
const startApp = async () => {
  await connectDB();
  app.listen(port, () => console.log(`Listening at ${port}`));
};

startApp();
