import mongoose from "mongoose";

mongoose.connect("mongodb+srv://gandalfzzing:O2pXtXYx56p76xFI@cluster0.mwjhp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");

const database = mongoose.connection;

database.on("error", (err) => {
  console.log("Database Error!", err);
});

database.once("open", () => {
  console.log("DB Connected");
});
