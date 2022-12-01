const express = require("express");
const cors = require('cors');
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

const db = require("./src/utils/database/db");

const indexRoutes = require("./src/api/index/index.routes");

db.connectDb();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

const PORT = 8080;
const server = express();

server.use(cors({
    origin: "*",
    credentials: true
}))

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

server.use("/", indexRoutes);
// server.use("/users", userRouter);
server.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

server.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || "Unexpected error");
});

server.listen(PORT, () => {
  console.log(`Server running in http://localhost:${PORT}`);
});
