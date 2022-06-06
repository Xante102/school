const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.render('dashboard', {
        page_title: "Dashboard"
    });
    next();
});

module.exports = router;