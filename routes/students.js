const express = require("express");
const router = express.Router();
const conn = require("../lib/db");

// Get Route to display the Students List Screen
router.get("/list", (req, res, next) => {
  const sql =
    "SELECT st.id, st.f_name, st.l_name, st.fees_paid, st.dob, st.gender, st.course_id, cs.course_name" +
    " FROM students st, courses cs" +
    " WHERE st.course_id = cs.id";
  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./students/student-list", {
          data: rows,
          page_title: "Students",
        });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Get Route to display the Student Aggregate Screen
router.get("/aggregate/:id", (req, res, next) => {
  const sql =
    "SELECT st.f_name, st.l_name, MIN(st.fees_paid) AS fees_paid , st.dob, st.gender, st.course_id, COUNT(cs.course_name) AS course_count" +
    " FROM students st, courses cs" +
    " WHERE st.course_id = cs.id" +
    " AND st.id =" +
    req.params.id +
    " GROUP BY st.f_name, st.l_name";
  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./students/student-aggregate", {
          data: rows,
          page_title: "Students",
        });
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Get Route to display the Student Create Screen
router.get("/create", (req, res, next) => {
  if (req.session.isLoggedIn == true) {
    res.render("./students/add-student", {
      page_title: "Create Student",
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Add Student Route
router.post("/add", (req, res) => {
  const sql = {
    course_id: req.body.crsID,
    f_name: req.body.fName,
    l_name: req.body.lName,
    fees_paid: req.body.fPaid,
    dob: req.body.dob,
    gender: req.body.gender,
  };
  if (req.session.isLoggedIn == true) {
    conn.query(`INSERT INTO students SET ?`, sql, (err, results) => {
      if (err) throw err;

      res.redirect("/students/list");
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Edit Student Route
router.get("/edit/:id", (req, res, next) => {
  const sql = "SELECT * FROM students WHERE id =" + req.params.id;
  if (req.session.isLoggedIn == true) {
    conn.query(sql, (err, rows) => {
      if (err) {
        //
      } else {
        res.render("./students/edit-student", {
          page_title: "Edit Student",
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
    "UPDATE students SET f_name ='" +
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
        res.redirect("/students/list");
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

// Delete Student Route
router.get("/delete/:id", (req, res, next) => {
  let varSQL = "DELETE FROM students WHERE id=" + req.params.id;
  if (req.session.isLoggedIn == true) {
    conn.query(varSQL, (err, rows) => {
      if (err) {
        //
      } else {
        res.redirect("/students/list");
      }
    });
  } else {
    res.redirect("/auth/login");
  }
});

module.exports = router;
