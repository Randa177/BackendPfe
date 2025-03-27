<<<<<<< HEAD
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const { connectToMongoDb } = require("./config/db");

require("dotenv").config();


const http = require('http');  //1
=======
var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const session = require("express-session"); //session
const { connectToMongoDb } = require("./config/db");
const cors = require("cors");

// gemini
const fetch = require('node-fetch');
global.fetch = fetch;
global.Headers = fetch.Headers;
global.Request = fetch.Request;
global.Response = fetch.Response;

require("dotenv").config();

const logMiddleware = require('./middlewares/logsMiddlewares.js'); //log

const http = require("http"); //1
>>>>>>> 0c4e130 (test)

var indexRouter = require("./routes/indexRouter");
var usersRouter = require("./routes/usersRouter");
var osRouter = require("./routes/osRouter");
<<<<<<< HEAD

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/os', osRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
=======
var ProgrammesDeVoyageRouter = require("./routes/ProgrammesDeVoyageRouter");
var GeminiRouter = require("./routes/GeminiRouter");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(logMiddleware)  //log

app.use(cors({
  origin:"http://localhost:3000",
  methods:"GET,POST,PUT,Delete",
}))

app.use(session({   //config session
  secret: "net secret pfe",
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: {secure: false},
    maxAge: 24*60*60,
  },  
}))

// Routers
app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/os", osRouter);
app.use("/programmedevoyages", ProgrammesDeVoyageRouter); // Correct route for ProgrammesDeVoyageRouter
app.use("/Gemini", GeminiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
>>>>>>> 0c4e130 (test)
  next(createError(404));
});

// error handler
<<<<<<< HEAD
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


const server = http.createServer(app);  //2

server.listen(process.env.port, () => {
    connectToMongoDb(),
    console.log('app is running on port 5000');
});
=======
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

const server = http.createServer(app); //2
server.listen(process.env.PORT || 5000, () => { // Ensure using correct port
  connectToMongoDb()
  console.log("App is running on port 5000");
});
>>>>>>> 0c4e130 (test)
