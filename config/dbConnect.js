const mongoose = require("mongoose");

//Connecting to MongoDB using Mongoose
const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("connected to Data Base");
};

module.exports = { connectDB };
