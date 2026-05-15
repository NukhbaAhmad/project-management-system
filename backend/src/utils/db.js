const mongoose = require("mongoose");
const { envConfig } = require("#config");

const connectDb = () => {
  const db = mongoose.connect(envConfig.db.url);
  return db;
};
const closeDb = async () => {
  if (mongoose.connection.readyState === 1) {
    await mongoose.connection.close();
    console.log("Db connection closed.");
  }
};

module.exports = { closeDb, connectDb };
