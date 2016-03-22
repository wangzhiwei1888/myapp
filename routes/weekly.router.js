var express = require('express');
var router = express.Router();
var weeklyModel = require('./weekly.model').weeklyModel;
var middleware = require('../middleware');
var crypto = require('crypto');
function encrypt(str){
    return crypto.createHash('md5').update(str).digest('hex');
}

router.get('/weeklys',function(req,res){

    var count = req.query.count;
    var curtime = parseInt(new Date().getTime());
    var endTime = curtime - (3600*1000*24)*(count-1);
    var startTime = curtime - (3600*1000*24)*count;

    console.log(startTime,endTime);
    console.log(new Date(startTime));
    console.log(new Date(endTime));
    //console.log(new Date().getDate());

    var query = {
        userId:req.query.userId+"",
        time:{"$gt":new Date(startTime),"$lt":new Date(endTime)}
    }
    weeklyModel.find(query,function(err,weeklys){
        if(!err){
            res.send(weeklys);
        } else {
            res.statusCode == 500;
            console.log("Internal error(%d):%s",res.statusCode,err.message);

            res.send({error:'Server error'});
        }
    })
})

router.post('/weekly',function(req,res){

    console.log('req body' + req.body);
    var weekly = new weeklyModel({
        userId:req.body.userId,
        projectName:req.body.projectName,
        task:req.body.task,
        progress:req.body.progress
    })

    weekly.save(function(err){

        if(!err){

            res.send({status:'OK'});

        } else{

            res.statusCode = 500;
            res.send({err:err+""});

        }
    })
})

//
//router.get('/user/:id',function(req,res){
//    return UserModel.findById(req.params.id,function(err,user){
//        if(!user){
//            res.statusCode == 400;
//            return res.send({error:"Not found"});
//        }
//        if(!err){
//            return res.send({status:"OK",user:user});
//        } else {
//            res.statusCode == 500;
//            console.log("Internal error(%d):%s",res.statusCode,err.message);
//            return res.send({error:'Server error'});
//        }
//    })
//})
//
//router.delete('/user/:id',function(req,res){
//    return UserModel.findById(req.params.id,function(err,user){
//        if(!user){
//            res.statusCode == 400;
//            return res.send({error:"Not found"});
//        }
//        if(!err){
//            return user.remove(function(err){
//                if(!err){
//                    console.log("User removed");
//                    return res.send({status:'OK'});
//                }else{
//                    res.statusCode == 500;
//                    console.log("Internal error(%d):%s",res.statusCode,err.message);
//                    return res.send({error:'Server error'});
//                }
//            })
//        } else {
//            res.statusCode == 500;
//            console.log("Internal error(%d):%s",res.statusCode,err.message);
//            return res.send({error:'Server error'});
//        }
//    })
//})
//
//router.put('/user/:id',function(req,res){
//
//    return UserModel.findById(req.params.id,function(err,user){
//
//        if(!user){
//            res.statusCode == 400;
//            return res.send({error:"Not found"});
//        }
//        user.username = req.body.username;
//        user.telphone = req.body.telphone;
//        user.password = encrypt(req.body.password);
//
//        return user.save(function(err){
//            console.log(err);
//            if(!err){
//
//                console.log("User updated");
//                return res.send({status:'OK',user:user});
//            }else{
//
//                if(err.name == "ValidationError"){
//                    res.statusCode = 400;
//                    res.send({error:'Validation error'});
//                }else{
//                    res.statusCode = 500;
//                    res.send({error:"server error"});
//                }
//                console.log("Internal error(%d): %s",res.statusCode,err.message);
//            }
//
//        })
//
//    })
//})

module.exports = router;
