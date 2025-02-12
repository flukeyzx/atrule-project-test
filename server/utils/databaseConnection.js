import mongoose from "mongoose";

const databaseConnection = async () => {
  try {
    await mongoose
      .connect(process.env.MONGODB_URI)
      .then(() => {
        console.log("Database Connection Successfull.");
      })
      .catch((error) => {
        console.log("Database Connection Failed.", error.message);
        process.exit(1);
      });
  } catch (error) {
    console.log("Database Connection Failed.", error.message);
    process.exit(1);
  }
};

export default databaseConnection;
