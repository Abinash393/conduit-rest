const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require("mongoose")

const userApiRoute = require("./api/user")
const articleApiRoute = require("./api/article")

require("dotenv").config()

mongoose.connect(
  process.env.MONGO,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },
  err => {
    console.log(err ? err : "MongoDB Connected");
  }
);

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/v1/user', userApiRoute);
app.use('/api/v1/article', articleApiRoute);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  console.error(err)
  res.status(err.status || 500).json({success: false, msg: "Something went wrong"})
});

module.exports = app;
