var express = require('express');
var router = express.Router();
var conn = require('../lib/dbConnections');
var bcrypt = require('bcrypt')

//renders longin view
router.get('/login', function(req, res, next) {
    res.render('../views/login',);
});

//authenticates user 
router.post('/user/login', async (req, res, next) =>{
    var email = req.body.usr_email;
    var password = req.body.pswrd;

    conn.query('SELECT * FROM users WHERE user_email = ?', [email], function(error, rows, fields){ //santitizes and cleanses your code
        if (rows[0].user_pswd) {
            bcrypt.compare(req.body.pswrd, rows[0].user_pswd, function(err, result) {
            //  console.log('>>>>>> ', password)
            //  console.log('>>>>>> ', rows[0].user_pswd)
             if(result) {
                req.session.loggedin = true;
                req.session.first_Nm = rows[0].user_fnm;
                req.session.last_Nm = rows[0].user_lnm;
                req.session.u_eMail = rows[0].user_email;
                res.redirect('/');
               return 
             }
             else {
                req.flash('error', "Incorrect Login Credentials");
                res.redirect('/login');
                return
             }
            
    });   
}
})
})

//to log out user

router.get('/logout', function(req, res){
    // req.flash('success', "Enter your Login Credentials"); // logically not applicable after the user logs in
    res.redirect('/login');
    req.session.destroy();
})
