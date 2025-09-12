const mongoose = require("mongoose");

// MongoDb Connection

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("connected to database");
    });
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (err) {
    console.log(err);
  }
  mongoose.connection.on("connected", () => {
    console.log("connected to database");
  });
  await mongoose.connect(process.env.MONGODB_URI);
};

module.exports = connectDB;
