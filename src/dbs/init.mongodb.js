"use strict";
import mongoose from "mongoose";
import config from "../configs/mongodb.config.js";

const connectionString = `mongodb://${config.db.host}:${config.db.port}/${config.db.name}`;

class Database {
  instance = null;

  constructor() {
    this.connect();
  }

  connect(type = "mongodb") {
    mongoose
      .connect(connectionString)
      .then(() => {
        console.log("Database connection successful:::", config.db.name);
      })
      .catch((error) => {
        console.error("Database connection error", error);
      });
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new Database();
    }
    return this.instance;
  }
}

export const instanceDb = Database.getInstance();
