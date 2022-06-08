const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

//Get Log In View
router.get("/login", (req, res, next) => {
  res.render("login",{
    page_title: "Login"
  });
});

//Authenticates Admin
router.post("/login", async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  conn.query(
    "SELECT * FROM admin WHERE email = ? AND password = ?",
    [email, password],
    (error, rows, fields) => {
      if (!error && rows.length > 0) {
        req.session.isLoggedIn = true;
        req.session.admin_email = rows[0].email;
        res.redirect("/dashboard");
        return;
      } else {
        req.flash("error", "Incorrect Login Credentials");
        res.redirect("/login");
        return;
      }
    }
  );
});

// Logs Out Admin

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/auth/login");
});

module.exports = router;
