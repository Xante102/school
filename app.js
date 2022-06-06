const port = process.env.PORT || 8080;

// Base Variables for Express
const path = require("path");
const express = require("express");
const flash = require("express-flash");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();

const conn = require("./lib/db");

// --------------------------------------------------- R O U T I N G    S E C T I O N ---------------------------------------------------
// const indexRoute = require("./routes/index");
// const authRoute = require("./routes/auth");
// const teachersRoute = require("./routes/teachers");
const subjectsRoute = require("./routes/subjects");
const coursesRoute = require("./routes/courses");
const teachersRoute = require("./routes/teachers");
const dashboardRoute = require("./routes/dashboard");
// --------------------------------------------------------------------------------------------------------------------------------------

// Setup View Engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// Finish Setup View Engine

//Setup BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Setup Session
app.use(express.static(path.join(__dirname, 'public/style.css')));
app.use(cookieParser());
app.use(
  session({
    secret: "akd#$%BSBPutS0m3thing",
    saveUninitialized: true,
    resave: false,
    cookie: { maxAge: 120000 },
  })
);
app.use(flash());
// End Session Setup

// Routing Middleware
app.use("/teachers", teachersRoute);
app.use("/subjects", subjectsRoute);
app.use("/courses", coursesRoute);
// app.use("/teachers", teachersRoute);
app.use('/dashboard', dashboardRoute);
// app.use('/auth', authRoute);
// app.use("/", indexRoute);
// End Routing Middleware

app.listen(port, () => console.log(`Listening on port ${port}..`));
