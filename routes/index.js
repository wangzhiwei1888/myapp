var express = require('express');
var router = express.Router();
var UserModel = require('./user.model').UserModel;

var crypto = require('crypto');
function encrypt(str){
  return crypto.createHash('md5').update(str).digest('hex');
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '周报系统' });
});

router.get('/logout', function(req, res, next) {

  req.session.user = null;
  res.send({'status':'success'});

});

router.post('/login', function(req, res, next) {

  console.log(req.body);
  var user = {
    telphone:req.body.telphone,
    password:encrypt(req.body.password)
  }

  UserModel.findOne(user,function(err,user){
    if(!err && !!user){

      req.session.user = user;
      res.send(user);

    } else {

    }
  })

});


module.exports = router;
