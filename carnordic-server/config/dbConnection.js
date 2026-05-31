const mongoose = require("mongoose");

//Connection till mongodb
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log("DB CONNECTED!", conn.connection.host, conn.connection.name);
  } catch (error) {
    console.log("DB CONNECTION FAILED!", error);
    process.exit(1);
  }
};

module.exports = connectDB;
