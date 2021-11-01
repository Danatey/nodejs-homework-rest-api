const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const PUBLIC_AVATARS = process.env.PUBLIC_AVATARS;

const usersRouter = require("./routes/users/users");
const contactsRouter = require("./routes/contacts/contacts");

const { HttpCode } = require("./config/HttpCode");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(express.static(PUBLIC_AVATARS));
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((_req, res) => {
  res.status(HttpCode.NOT_FOUND).json({ message: "Not found" });
});

app.use((err, _req, res, _next) => {
  const statusCode = err.status || HttpCode.INTERNAL_SERVER_ERROR;
  res.status(statusCode).json({
    status: statusCode === HttpCode.INTERNAL_SERVER_ERROR ? "fail" : "error",
    code: statusCode,
    message: err.message,
  });
});

module.exports = app;
