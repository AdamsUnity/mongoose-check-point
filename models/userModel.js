const mongoose = require("mongoose");

// Create a person schema
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: [true, "user name is required"],
  },
  age: {
    type: Number,
    required: true,
    trim: true,
  },
  favouriteFoods: { type: [String], required: true },
});

// Create a Person model using the schema

const person = mongoose.model("person", personSchema);

module.exports = person;
