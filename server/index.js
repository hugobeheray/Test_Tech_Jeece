import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config({ path: "./config/.env" });
import { checkUser } from "../middleware/auth.middleware.js";
import { requireAuth } from "../middleware/auth.middleware.js";
import "../config/db.js";
import userRoutes from "../routes/user.routes.js";
import articleRoutes from "../routes/article.routes.js";
import passwordReset from "../routes/passwordReset.js";
import genreRoutes from "../routes/genre.routes.js";
import cors from "cors";

const app = express();

const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["sessionId", "Content-Type"],
  exposedHeaders: ["sessionId"],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.json({ message: "Hello from server!" });
});

//jwt
app.get("*", checkUser);
app.get("/jwtid", requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

//routes
app.use("/api/user", userRoutes);
app.use("/api/article", articleRoutes);
app.use("/api/password-reset", passwordReset);
app.use("/api/genre", genreRoutes);

//server
app.listen(process.env.PORT, () => {
  console.log(`Server listening on ${process.env.PORT}`);
});
