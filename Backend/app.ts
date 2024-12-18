import dotenv from "dotenv";
import Server from "./Server";
import Cors from "cors";
import express from "express";

dotenv.config();

const app = express();

const corsOptions = {
  origin: "http://localhost:",
};

app.use(Cors(corsOptions));

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

const serv = new Server();
serv.listen();
