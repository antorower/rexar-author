import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) return;
  console.log("There is not open database connection. Please wait...");
  try {
    await mongoose.connect(process.env.DB_URL, {});
    console.log("Connected to database!");
  } catch (error) {
    console.error("Error connecting to database: ", error);
  }
};

export default dbConnect;
