const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

// Get Route to display the Subjects List Screen
router.get("/list", (req, res, next) => {
  const sql = "SELECT * FROM subjects";

  conn.query(sql, (err, rows) => {
    if (err) {
      //
    } else {
      res.render("./subjects/subject-list", {
        data: rows,
        page_title: "Subjects",
      });
    }
  });
});

// Get Route to display the Subjects Create Screen
router.get("/create", (req, res, next) => {
  res.render("./subjects/add-subject", {
    page_title: "Create Subject",
  });
});

// Add Subject Route
router.post("/add", (req, res) => {
  const sql = {
    sub_name: req.body.subName,
  };

  conn.query(`INSERT INTO subjects SET ?`, sql, (err, results) => {
    if (err) throw err;

    res.redirect("/subjects/list");
  });
});

// Edit Subject Route
router.get("/edit/:id", (req, res, next) => {
  const sql = "SELECT * FROM subjects WHERE id =" + req.params.id;

  conn.query(sql, (err, rows) => {
    if (err) {
      //
    } else {
      res.render("./subjects/edit-subject", {
        page_title: "Edit Subject",
        data: rows[0],
      });
    }
  });
});

// Update Subject Route
router.post("/update", (req, res, next) => {
  const sql =
    "UPDATE subjects SET sub_name ='" +
    req.body.subName +
    "'WHERE id =" +
    req.body.id;

  conn.query(sql, (err, rows) => {
    if (err) {
      //
    } else {
      res.redirect("/subjects/list");
    }
  });
});

// Delete Subject Route
router.get("/delete/:id", (req, res, next) => {
  const sql = "DELETE FROM subjects WHERE id=" + req.params.id;

  conn.query(sql, (err, rows) => {
    if (err) {
      //
    } else {
      res.redirect("/subjects/list");
    }
  });
});

module.exports = router;
