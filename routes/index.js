var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var pool = mysql.createPool({
  connectionLimit: 100000,
  host : 'easylearning.guru',
  user :  'kcc_student',
  password : 'Kccitm.edu.in1',
  database : 'kccStudent'
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login');
});

router.get('/register', function(req, res, next) {
  res.render('register');
});

router.post('/login', function(req, res, next) {
  var r = req.body.rel;
  var user =req.body.user;
  var psw = req.body.pass;
  console.log(r);
  console.log(psw);
  console.log(user);
if(r =="BF" && psw=="1234"){
  res.render('index',{title:user});
}
if(r=="GF"){
  pool.getConnection(function (err,connection){
    connection.query("SELECT * FROM GFBF WHERE NAMES = ? AND PASS = ?", [user, psw], function(err, rows, fields){
       if(err) throw err;
       else console.log(rows);
       var row = JSON.stringify(rows);
       res.render('index2',{title:user});
    });
 });
}
});

router.post('/reg', function(req, res, next) {
  var o = "GF";
  var x = req.body.user;
  var y =req.body.email;
  var z =req.body.phone;
  var p =req.body.pass;
  pool.getConnection(function (err,connection){
    connection.query("INSERT INTO GFBF (NAMES, EMAIL ,TEL , REL,  PASS) VALUES ('"+x+"', '"+y+"', '"+z+"','"+o+"','"+p+"')",function(err,rows){
       connection.release();
       if(err) throw err;
       console.log(rows.length);
    });
 });  
  res.render('register');
});

module.exports = router;
