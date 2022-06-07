const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

// Get Route to display the Teachers List Screen
router.get("/list", (req, res, next) => {
  const sql = "SELECT * FROM teachers";
  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./teachers/teacher-list", {
          data: rows,
          page_title: "Teachers",
        });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Get Route to display the Teacher Create Screen
router.get("/create", (req, res, next) => {
  if (req.session.isLoggedIn == true) {
    res.render("./teachers/add-teacher", {
      page_title: "Create Teacher",
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Add Teacher Route
router.post("/add", (req, res) => {
  const sql = {
    title: req.body.title,
    f_name: req.body.fName,
    l_name: req.body.lName,
    email: req.body.email,
    phone_num: req.body.pNum,
  };

  if (req.session.isLoggedIn == true) {
    conn.query(`INSERT INTO teachers SET ?`, sql, (err, results) => {
      if (err) throw err;

      res.redirect("/teachers/list");
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Edit Teacher Route
router.get("/edit/:id", (req, res, next) => {
  const sql = "SELECT * FROM teachers WHERE id =" + req.params.id;

  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./teachers/edit-teacher", {
          page_title: "Edit Teacher",
          data: rows[0],
        });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Update Teacher Route
router.post("/update", (req, res, next) => {
  const sql =
    "UPDATE teachers SET f_name ='" +
    req.body.fName +
    "', l_name ='" +
    req.body.lName +
    "', title ='" +
    req.body.title +
    "', email ='" +
    req.body.email +
    "', phone_num ='" +
    req.body.pNum +
    "'WHERE id =" +
    req.body.id;

  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.redirect("/teachers/list");
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Delete Teacher Route
router.get("/delete/:id", (req, res, next) => {
  const sql = "DELETE FROM teachers WHERE id=" + req.params.id;

  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.redirect("/teachers/list");
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
