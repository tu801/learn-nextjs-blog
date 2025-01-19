import mongoose from "mongoose";

let initialize: boolean = false;

export const connect = async () => {
  if (initialize) {
    console.log("MongoDB already connected!");
    return;
  }

  if (process.env.MONGODB_URI === undefined) {
    console.log("Invalid Config");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "nextjs-blog",
    });
    console.log("Connected to MongoDB");
    initialize = true;
  } catch (error) {
    console.error("Error connection to MongoDB", error);
  }
};
