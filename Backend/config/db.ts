import mongoose from "mongoose";


const ConnecteDb = async (): Promise<void> => {
  try {
    const MongoUrI = process.env.MONGO_URI;
    if (!MongoUrI) {
      throw new Error("MONGO_URI is not defined in .env");
    }
    await mongoose.connect(MongoUrI as string);

    console.log("Database connected successfully");
  } catch (error) {
    console.error("Connection Failed:", error);
    process.exit(1);
  }
};

export default ConnecteDb;
