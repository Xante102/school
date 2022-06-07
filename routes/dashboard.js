const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  if (req.session.isLoggedIn == true) {
    res.render("dashboard", {
      page_title: "Dashboard",
    });
    next();
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
