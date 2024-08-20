import mongoose from "mongoose";
import os from "os";
import process from "process";

export const countConnect = () => {
  const counter = mongoose.connections.length;
  console.log(`Number of connections: ${counter}`);
};

// check overload
const _SECOND = 5000;
export const checkOverload = () => {
  setInterval(() => {
    const counter = mongoose.connections.length;
    const numberCores = os.cpus().length;
    const memoryUsage = process.memoryUsage();

    const maxConnection = numberCores * 5;
    if (counter === 1) {
      console.warn(`Number of connections: ${counter}`);
      console.warn(`Number of cores: ${numberCores}`);
      console.warn(`Memory usage: ${JSON.stringify(memoryUsage)}`);
      console.warn(`Number of connections is overloading`);
    }
  }, _SECOND);
};
