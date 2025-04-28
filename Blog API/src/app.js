const express = require("express");
const blogRoutes = require("./routes/blogRoutes");
const connectDB = require("./config/dbConfig");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

connectDB();

app.use("/blogs", blogRoutes);

app.use(errorHandler);

module.exports = app;
