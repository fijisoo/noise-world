import mongoose from "mongoose";

export async function connectToMongoDB(dbname: string) {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    await mongoose.disconnect();
    return await mongoose.connect(
      `${MONGODB_URI}/${dbname}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as any
    );
  } catch (error) {
    console.error("Error while trying to connect to DB:", error);
  }
}
