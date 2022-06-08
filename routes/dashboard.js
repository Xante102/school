
const express = require('express')
const router = express.Router()
const conn = require('../lib/db')


router.get('/', (req, res) => {
  
	const query = 'SELECT * FROM students'
	const query2 = `SELECT SUM(fees_paid) AS total_fees_paid,
                      COUNT(id) AS total_students, 
           AVG(fees_paid) AS average_fees,
           MIN(fees_paid) AS lowest_fee,
          MAX(fees_paid) AS highest_fee FROM students`
        
        

            if (req.session.isLoggedIn == true) {

	conn.query(query, (err, rows) => {
		if (err) throw err;

		conn.query(query2, (err, aggregateRows) => {
			if (err) throw err;

 			res.render('dashboard', { page_title: 'Dashboard', data: rows, aggregate: aggregateRows[0] });
});
	});
    } else {
    res.redirect("/auth/login");
  }
});


module.exports = router;