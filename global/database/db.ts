import mongoose from 'mongoose';
// const config = require("../../config")
import config from "../../config"

async function connectDB() {
  try {
    if(config.mongourl){
      await mongoose.connect(config.mongourl);
      console.log('Connected to MongoDB');
    }
  } catch (err) {
    console.error('Error connecting to MongoDB:', err);
  }
}

export default connectDB;
