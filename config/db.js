import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({ path: "./config/.env" });
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.passwordDB +
      "@cluster0.ecf8q.mongodb.net/testTech",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("connected"))
  .catch((err) => console.log("Failed to connnect to DB", err));

export default mongoose;
