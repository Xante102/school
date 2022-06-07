const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

// Get Route to display the Courses List Screen
router.get("/list", (req, res, next) => {
  const sql = "SELECT * FROM courses";
  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./courses/course-list", {
          data: rows,
          page_title: "Courses",
        });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Get Route to display the Courses Create Screen
router.get("/create", (req, res, next) => {
  res.render("./courses/add-course", {
    page_title: "Create Course",
  });
});

// Add Course Route

router.post("/add", (req, res) => {
  if (req.session.isLoggedIn == true) {
    const sql = {
      course_name: req.body.crsName,
    };

    conn.query(`INSERT INTO courses SET ?`, sql, (err, results) => {
      if (err) throw err;

      res.redirect("/courses/list");
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Edit Course Route
router.get("/edit/:id", (req, res, next) => {
  if (req.session.isLoggedIn == true) {
    const sql = "SELECT * FROM courses WHERE id =" + req.params.id;

    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./courses/edit-course", {
          page_title: "Edit Course",
          data: rows[0],
        });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Update Course Route
router.post("/update", (req, res, next) => {
  const sql =
    "UPDATE courses SET course_name ='" +
    req.body.crsName +
    "'WHERE id =" +
    req.body.id;
  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.redirect("/courses/list");
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Delete Course Route
router.get("/delete/:id", (req, res, next) => {
  const sql = "DELETE FROM courses WHERE id=" + req.params.id;
  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.redirect("/courses/list");
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
