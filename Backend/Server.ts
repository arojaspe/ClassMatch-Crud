import express, { Application } from "express";
import db from "./Connection";
import * as Rout from "./Routes";
import cors from "cors";
import cookieParser from "cookie-parser";

class Server {
  private app: Application;
  private port: string;
  private apiPaths = {
    path: "/api/",
  };

  constructor() {
    this.app = express();
    this.port = process.env.PORT || "5000";
    this.dbConnect();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      cors({
        credentials: true,
        origin: "https://classmatch-crud.onrender.com", // Asegúrate de configurar el CORS para React
      })
    );
    this.app.use(cookieParser());
    this.app.use(express.json());
    this.app.use(express.static("Public"));
  }

  routes() {
    this.app.use(this.apiPaths.path, Rout.default);
  }

  async dbConnect() {
    try {
      await db.authenticate();
      console.log("Database Online");
    } catch (error) {
      console.error("Error connecting to the database:", error);
    }
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}

const server = new Server();
server.listen();
